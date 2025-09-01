require('dotenv').config();

const uuid = require('uuid');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const ForgotPassword = require('../models/forgotPassword');

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.Email_API_KEY;

const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User does not exist' });

    const id = uuid.v4();
    await ForgotPassword.create({ id,userId:user._id, active: true, expiresby: new Date(Date.now() + 3600000) });

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    await apiInstance.sendTransacEmail({
      sender: { email: 'poornimaaragala@gmail.com', name: 'PlayTrust' },
      to: [{ email }],
      subject: 'Reset your password',
      htmlContent: `<p>Click here to reset your password: <a href="http://localhost:3000/password/resetpassword/${id}">Reset Password</a></p>`,
    });

    res.status(202).json({ message: 'Reset link sent to email', success: true });
  } catch (error) {
    console.error(error);
    return res.json({ message: error.message || error, success: false });
  }
};

const resetpassword = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await ForgotPassword.findOne({ id });

    if (!request || !request.active || request.expiresby < new Date()) {
      return res.status(404).send('Link is invalid or expired');
    }

    request.active = false;
    await request.save();

    res.status(200).send(`
      <html>
        <form action="/password/updatepassword/${id}" method="POST">
          <label>Enter New Password:</label>
          <input type="password" name="newpassword" required />
          <button type="submit">Reset Password</button>
        </form>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
};

const updatepassword = async (req, res) => {
  try {
    const { newpassword } = req.body;
    const { id } = req.params;

    const resetRequest = await ForgotPassword.findOne({ id });
    if (!resetRequest) return res.status(404).json({ error: 'Reset request not found' });

    const user = await User.findById(resetRequest.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    await user.save();

    resetRequest.active = false;
    await resetRequest.save();

    res.status(201).json({ message: 'Password successfully updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Password update failed' });
  }
};

module.exports = {
  forgotpassword,
  updatepassword,
  resetpassword
};

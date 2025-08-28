require('dotenv').config();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const User=require('./models/user');

mongoose.connect(process.env.MongoDB_URL)
.then(() => console.log("MongoDB connected for seeding..."))
.catch(err => console.error("DB connection error:", err));

async function createAdmin(){
  try {
    const existingAdmin=await User.findOne({role:'admin'});
    if(existingAdmin){
      console.log('Admin already exists');
      process.exit();
    }
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const admin=new User({
      name:'Super Admin',
      email:process.env.ADMIN_EMAIL,
      password:hashedPassword,
      role:'admin'
    })
    await admin.save();
    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
}
createAdmin();

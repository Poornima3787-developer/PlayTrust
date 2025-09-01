const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  active: {
    type: Boolean,
    default: true
  },
  expiresby: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 3600000)
  }

}, { timestamps: true });

module.exports = mongoose.model("ForgotPassword", forgotPasswordSchema);

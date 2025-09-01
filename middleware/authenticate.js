require('dotenv').config();

const User=require('../models/user');
const jwt=require('jsonwebtoken');

const authenticate=(req,res,next)=>{
  try {
    const token=req.header('Authorization');
    if(!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
const adminAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('role');
    if(!user) {
      return res.status(404).json({success:false, message:"User not found" });
    }
    if(user.role!=='admin') {
      return res.status(403).json({success: false,message:"Access denied: Admins only" });
    }
    req.user = user; 
    next();
  }catch(error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports={authenticate,adminAuth};
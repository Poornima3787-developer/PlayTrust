require('dotenv').config();

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

const adminAuth=(req,res,next)=>{
  if(req.user.role!=='admin'){
    return res.status(403).json({success: false, message: "Access denied: Admins only"})
  }
  next();
}

module.exports={authenticate,adminAuth};
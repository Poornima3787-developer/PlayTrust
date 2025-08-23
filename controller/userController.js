require('dotenv').config();

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const User=require('../models/user');

const generteToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1h'})
}

exports.signup=async (req,res)=>{
  try{
  const {name,email,password}=req.body;
  const existingUser=await User.findOne({email})
  if(existingUser){
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword=await bcrypt.hash(password,10);
  const newUser=new User({
    name,
    email,
    password:hashedPassword
  });
  await newUser.save();
  res.status(201).json({ message: "User registered successfully!" });
}catch(error){
  console.error(error);
  res.status(500).json({ message: "Signup error" });
}
}

exports.login=async (req,res)=>{
  try{
  const {email,password}=req.body;
  const user=await User.findOne({email});
  if(!user) {
      return res.status(400).json({ message: "Invalid email or password" });
   }
  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
  }
  const token=generteToken(user._id);
  res.status(200).json({message: "Login successful",token});
  }catch(error){
   console.error(error);
   res.status(500).json({ message: "Login error" });
  }
}
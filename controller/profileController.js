const Coach = require('../models/coach');
const user = require('../models/user');
const User=require('../models/user');

/*exports.updateProfile=async (req,res)=>{
  try {
  const {name, sport, experience, location}=req.body;
  const id=req.user.id;
  const updateUser=await User.findByIdAndUpdate(
    id,
    { name, sport, experience, location },
    {new:true}
  )
  res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error){
   res.status(500).json({ error: "Error updating profile" });
  }
}*/

exports.getProfile=async (req,res)=>{
  try {
    const coaches = await Coach.find();
    res.json({success:true,coaches});
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
}

exports.getSingleProfile=async(req,res)=>{
  try {
    const {id,name,email,role}=req.user;
    res.json({id,name,email,role});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
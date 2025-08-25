const User=require('../models/user');

exports.updateProfile=async (req,res)=>{
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
}

exports.getProfile=async (req,res)=>{
  try {
    const user=await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
}
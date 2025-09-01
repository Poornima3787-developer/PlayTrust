const Coach = require('../models/coach');
const Parent=require('../models/parent');
const School=require('../models/school');
const User=require('../models/user');
const {uploadToS3}=require('../service/s3Service');

exports.getSingleProfile=async(req,res)=>{
  try {
    const {id }=req.user;

    const user=await User.findById(id).select("name email role");
    if(!user){
      return res.status(404).json({message:"User not found"})
    }

    let profile=null;
    if(user.role==='coach'){
      profile=await Coach.findOne({userId:id});
    }else if(user.role==='parent'){
      profile=await Parent.findOne({userId:id});
    }else if(user.role==='school'){
      profile=await School.findOne({userId:id});
    }
    res.json({id,name:user.name,email:user.email,role:user.role,profile});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

exports.updateProfile=async (req,res)=>{
  try {
    const {id}=req.user;
    const bodyData=req.body;
    
    let updateDoc = { $set: { ...bodyData ,verificationStatus: "Pending"}};

     if (req.files?.profilePic) {
      const profileFile = req.files.profilePic[0];
      const fileKey = `profile/${id}_${Date.now()}_${profileFile.originalname}`;
      const imageUrl = await uploadToS3(profileFile.buffer, fileKey);
      updateDoc.$set.profilePic = imageUrl;
    }

   if (req.files?.certifications) {
      const certUrls = [];
      for (const cert of req.files.certifications) {
        const fileKey = `certifications/${id}_${Date.now()}_${cert.originalname}`;
        const certUrl = await uploadToS3(cert.buffer, fileKey);
        certUrls.push(certUrl);
      }
      updateDoc.$push = { certifications: { $each: certUrls } };
    }

    const user=await User.findById(id).select('role');
    if (!user) return res.status(404).json({ message: "User not found" });

    let updatedProfile;
    if(user.role==="coach") {
      updatedProfile = await Coach.findOneAndUpdate({userId:id},updateDoc,{new:true,runValidators:true,upsert:true});
    }else if(user.role==="parent") {
      updatedProfile = await Parent.findOneAndUpdate({userId:id},updateDoc,{new:true,runValidators:true,upsert:true});
    } else if (user.role==="school") {
      updatedProfile = await School.findOneAndUpdate({userId:id},updateDoc,{new:true,runValidators:true,upsert:true});
    }

    if (bodyData.name) user.name = bodyData.name;
    if (bodyData.email) user.email = bodyData.email;
    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      updatedProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating profile" });
  }
}

exports.getAllCoaches=async (req,res)=>{
  try {
    const {q}=req.query;
    let filter={};
    if(q){
      filter={
        $or:[
          { experience:{$regex:q,$options:"i"}},
          { location:{$regex:q,$options:"i"}},
          { sport:{ $regex: q,$options:"i"} } 
        ]
      }
    }
    const coaches=await Coach.find(filter);
    res.json({success:true,coaches});
  } catch (error) {
    res.status(500).json({ error: "Error fetching coaches" });
  }
}
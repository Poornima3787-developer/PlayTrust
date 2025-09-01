const Parent=require('../models/parent');
const Coach=require('../models/coach');
const School=require('../models/school');
const User=require('../models/user')
const {uploadToS3}=require('../service/s3Service');

exports.registerParent=async (req,res)=>{
  try {
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({ success: false, message: "User not found" });

    user.role='parent';
    await user.save();

    const existing = await Parent.findOne({ userId: user._id });
    if(existing) {
      return res.status(400).json({ success: false, message: "Parent profile already exists" });
    }

    const parent=await Parent.create({
      userId:user._id,
      name:req.body.name,
      childName:req.body.childName,
      childAge:req.body.childAge,
      location:req.body.location,
      preferredSports:req.body.preferredSports,
    });

    res.status(201).json({success:true,parent});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

exports.registerCoach=async (req,res)=>{
  try {
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({ success: false, message: "User not found" });

    user.role = 'coach';
    await user.save();

    const {name,sport,phoneNumber,experience,location} = req.body;
    const userId=user._id;

    const existing=await Coach.findOne({userId});
    if(existing) {
      return res.status(400).json({success:false,message:"Coach profile already exists"});
    }
   
    let profilePicUrl=null;

    if(req.files?.profilePic?.length > 0) {
    const file = req.files.profilePic[0];
    profilePicUrl = await uploadToS3(file.buffer,`coaches/${userId}/profile-${Date.now()}-${file.originalname}`);
   }

   let certificationUrls = [];

   if(req.files?.certifications?.length > 0) {
    certificationUrls = await Promise.all(req.files.certifications.map(file =>
      uploadToS3(file.buffer, `coaches/${userId}/cert-${Date.now()}-${file.originalname}`))
    );
   } 
   
    const coach=await Coach.create({
      userId,
      name,
      sport,
      phoneNumber,
      experience,
      location,
      profilePic:profilePicUrl,
      certifications:certificationUrls,
      verificationStatus: "Pending"
    });

    res.status(201).json({success:true,coach});
  } catch (error) {
    res.status(500).json({success:false,error:error.message});
  }
};

exports.registerSchool=async (req,res)=>{
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.role = 'school';
    await user.save();

    const {schoolName,address,contactNumber }=req.body;
    const userId=user._id;

    const existing=await School.findOne({userId});
    if(existing) {
      return res.status(400).json({success:false,message:"School profile already exists"});
    }

    const school=await School.create({
      userId,
      schoolName,
      address,
      contactNumber,
    });

    res.status(201).json({success:true,school});
  } catch (error) {
    res.status(500).json({success: false,error:error.message});
  }
};
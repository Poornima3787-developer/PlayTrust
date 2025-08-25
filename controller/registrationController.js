const Parent=require('../models/parent');
const Coach=require('../models/coach');
const School=require('../models/school');

exports.registerParent=async (req,res)=>{
  try {
    const {name,childName,childAge,location,preferredSports}=req.body;
    const userId=req.user.id;
    
    const existing=await Parent.findOne({userId});
    if(existing){
      return res.status(400).json({success:false,message:'Parent profile already exists'});
    }

    const parent=await Parent.create({
      userId,
      name,
      childName,
      childAge,
      location,
      preferredSports,
    })
    res.status(201).json({success:true,parent});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

exports.registerCoach=async (req,res)=>{
  try {
    const {name,sport,phoneNumber,experience,location,certifications,documents } = req.body;
    const userId=req.user.id;

    const existing=await Coach.findOne({userId});
    if(existing) {
      return res.status(400).json({success:false,message:"Coach profile already exists"});
    }

    const coach=await Coach.create({
      userId,
      name,
      sport,
      phoneNumber,
      experience,
      location,
      certifications,
      documents,
      verificationStatus: "Pending"
    });

    res.status(201).json({success:true,coach});
  } catch (error) {
    res.status(500).json({success:false,error:error.message});
  }
};

exports.registerSchool=async (req,res)=>{
  try {
    const {schoolName,address,contactNumber }=req.body;
    const userId=req.user.id;

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
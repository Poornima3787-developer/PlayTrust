const mongoose=require('mongoose');
const Coach =require('../models/coach');

exports.getPendingCoaches=async (req,res)=>{
  try {
    const coaches=await Coach.find({verificationStatus:'Pending'});
    res.json({success:true,coaches});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

exports.approveCoach=async(req,res)=>{
  try {
    const { coachId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(coachId)) {
      return res.status(400).json({ success: false, message: "Invalid coachId" });
    }

    const coach = await Coach.findById(coachId);
    if (!coach) {
      return res.status(404).json({ success: false, message: "Coach not found" });
    }

    if (coach.verificationStatus === "Approved") {
      return res.status(400).json({ success: false, message: "Coach already approved" });
    }

    coach.verificationStatus = "Approved";
    await coach.save();

    res.json({ success: true, message: "Coach approved successfully", coach });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

exports.rejectCoach=async(req,res)=>{
  try {
    const {coachId}=req.params;
    const coach=await Coach.findByIdAndUpdate(
      coachId,
      {verificationStatus:"Rejected"},
      {new:true}
    );
    if (!coach) {
  return res.status(404).json({ success: false, message: "Coach not found" });
}

    res.json({success:true,coach});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
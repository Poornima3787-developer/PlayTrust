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
    const {coachId}=req.params;
    const coach=await Coach.findByIdAndUpdate(
      coachId,
      {verificationStatus:'Approved'},
      {new:true}
    );
    res.json({success:true,coach});
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
    res.json({success:true,coach});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
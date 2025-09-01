const mongoose=require('mongoose');

const coachSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
    index:true
  },
  name:{
    type:String,
    required: [true, "Coach name is required"],
  },
  sport:{
    type:String,
    required: [true, "Sport is required"],
  },
  phoneNumber:{
    type:String,
    required: [true, "Phone number is required"],
  },
  experience:{
    type:Number,
    required:true
  },
  location:{
    type:String,
    required: [true, "Location is required"],
  },
  profilePic: {
  type: String,
  required: true
},
  certifications:[String],
  verificationStatus:{
    type:String,
    enum:["Pending", "Approved", "Rejected"],
    default:'Pending'
  },
}, { timestamps: true });

module.exports=mongoose.model('Coach',coachSchema);
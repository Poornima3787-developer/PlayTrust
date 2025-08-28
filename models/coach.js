const mongoose=require('mongoose');

const coachSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  name:{
    type:String,
    required:true
  },
  sport:{
    type:String,
    required:true
  },
  phoneNumber:{
    type:String,
    required:true
  },
  experience:{
    type:Number,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  profilePic: {
  type: String,
  required: true
},
  certification:String,
  verificationStatus:{
    type:String,
    enum:["Pending", "Approved", "Rejected"],
    default:'Pending'
  },
  documents:[String]
}, { timestamps: true });

module.exports=mongoose.model('Coach',coachSchema);
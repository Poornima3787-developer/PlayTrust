const mongoose=require('mongoose');

const schoolSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  schoolName:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  contactNumber:{
    type:String,
    required:true
  }
}, { timestamps: true });

module.exports=mongoose.model('School',schoolSchema);
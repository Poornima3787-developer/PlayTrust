const mongoose=require('mongoose');

const schoolSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
    index:true
  },
  schoolName:{
    type:String,
    required: [true, "School name is required"],
  },
  address:{
    type:String,
    required: [true, "Address is required"],
  },
  contactNumber:{
    type:String,
    required: [true, "Contact number is required"],
  }
}, { timestamps: true });

module.exports=mongoose.model('School',schoolSchema);
const mongoose=require('mongoose');

const parentSchema=new mongoose.Schema({
  userId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'User',
   required:true,
   index:true
  },
  name:{
    type:String,
    required: [true, "Parent name is required"],
  },
  childName:{
    type:String,
    required: [true, "Child name is required"],
  },
  childAge:{
    type:Number,
    required: [true, "Child age is required"],
  },
  location:{
    type:String,
    required: [true, "Location is required"],
  },
  preferredSports:[String]
},{timestamps:true});

module.exports=mongoose.model('Parent',parentSchema);
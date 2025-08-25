const mongoose=require('mongoose');

const parentSchema=new mongoose.Schema({
  userId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'User',
   required:true
  },
  name:{
    type:String,
    required:true
  },
  childName:{
    type:String,
    required:true
  },
  childAge:{
    type:Number,
    required:true
  },
  location:{
    type:String,
    required:true,
  },
  preferredSports:[String]
},{timestamps:true});

module.exports=mongoose.model('Parent',parentSchema);
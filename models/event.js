const mongoose=require('mongoose');

const eventSchema=new mongoose.Schema({
  eventName:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    required:true 
  },
  menu:{
    type:String,
    required:true
  },
  eventImage:{
    type:String,
    default: "https://cdn-icons-png.flaticon.com/512/833/833314.png" 
  }
},{timestamps:true});

module.exports=mongoose.model('Event',eventSchema);
const mongoose=require('mongoose');

const eventSchema=new mongoose.Schema({
  eventName:{
    type:String,
    required: [true, "Event name is required"],
  },
  date:{
    type:Date,
    required: [true, "Event date is required"], 
  },
  menu:{
    type:String,
    required: [true, "Menu is required"],
  },
  eventImage:{
    type:String,
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
    index:true
  }
},{timestamps:true});

module.exports=mongoose.model('Event',eventSchema);
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Name is required'],
    trim:true
  },
  email:{
    type:String,
    required:[true,'Email is required'],
    unique:true,
  },
  password:{
    type:String,
    required:[true,'Please fill the password'],
    minlength:[6,'Password must be at least 6 characters']
  },
  role: { 
    type: String, 
    enum: ["parent", "coach", "school", "admin"], 
    required: true 
  }
},{timestamps:true});

module.exports=mongoose.model('User',userSchema);
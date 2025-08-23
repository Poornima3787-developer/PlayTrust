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
  role:{
    type:String,
    enum:['user','coach','admin'],
    default:'user'
  },
  sport:{
    type:String,
    default:'other'
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  criminalCheck:{
    type:Boolean,
    default:fasle
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
},{timestamps:true});

module.exports=mongoose.model('User',userSchema);
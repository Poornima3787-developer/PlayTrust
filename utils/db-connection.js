require('dotenv').config();
const mongoose=require('mongoose');

const connectDB=async() =>{
  try {
    const connect=await mongoose.connect(process.env.MongoDB_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports=connectDB;
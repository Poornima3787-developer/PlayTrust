require('dotenv').config();

const express=require('express');
const cors=require('cors');
const path=require('path');
const connectDB=require('./utils/db-connection');

const app=express();

app.use(express.json());
app.use(cors());

const User=require('./models/user');

const userRouter=require('./routes/userRouter');

app.use('/user',userRouter);

app.use(express.static(path.join(__dirname,'public')));

app.get('/login',(req,res)=>{
   res.sendFile(path.join(__dirname,'view','login.html'))
})

app.get('/',(req,res)=>{
  res.send('Welcome to PlayTrust API');
})

connectDB().then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log('Server is running on port')
  })
})
require('dotenv').config();

const express=require('express');
const cors=require('cors');
const path=require('path');
const connectDB=require('./utils/db-connection');

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const User=require('./models/user');
const Parent=require('./models/parent');
const Coach=require('./models/coach');
const School=require('./models/school');

const userRouter=require('./routes/userRouter');
const registrationRouter=require('./routes/registrationRouter');
const adminRouter=require('./routes/admin');
const profileRouter=require('./routes/profileRouter');
const eventRouter=require('./routes/eventRoutes');

app.use('/user',userRouter);
app.use('/register',registrationRouter);
app.use('/admin',adminRouter);
app.use('/profile',profileRouter);
app.use('/event',eventRouter);

app.use(express.static(path.join(__dirname,'public')));

app.get('/login',(req,res)=>{
   res.sendFile(path.join(__dirname,'view','login.html'))
})
app.get('/signup',(req,res)=>{
   res.sendFile(path.join(__dirname,'view','signup.html'))
})
app.get('/admin',(req,res)=>{
   res.sendFile(path.join(__dirname,'view','admin.html'))
});
app.get('/register',(req,res)=>{
   res.sendFile(path.join(__dirname,'view','register.html'))
})
app.get('/dashboard',(req,res)=>{
   res.sendFile(path.join(__dirname,'view','dashboard.html'))
})

app.get('/',(req,res)=>{
  res.send('Welcome to PlayTrust API');
})

connectDB().then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log('Server is running on port')
  })
})
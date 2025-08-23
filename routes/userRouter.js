const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
const authenticate=require('../middleware/authenticate');

router.post('/login',userController.login);
router.post('/signup',userController.signup);

module.exports=router;


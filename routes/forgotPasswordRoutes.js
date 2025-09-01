const express=require('express');
const router=express.Router();
const forgotPasswordController=require('../controller/forgotPasswordController');

router.post('/forgotpassword',forgotPasswordController.forgotpassword);
router.post('/updatepassword/:id',forgotPasswordController.updatepassword);
router.get('/resetpassword/:id',forgotPasswordController.resetpassword); 

module.exports=router;
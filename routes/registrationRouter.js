const express=require('express');
const router=express.Router();
const upload=require('../service/upload');
const registrationController=require('../controller/registrationController');
const {authenticate}=require('../middleware/authenticate');

router.post('/parent',authenticate,registrationController.registerParent);
router.post('/coach',authenticate,upload.fields([{name:"profilePic",maxCount:1},{name:"certifications",maxCount:5}]),registrationController.registerCoach);
router.post('/school',authenticate,registrationController.registerSchool);

module.exports=router;
const express=require('express');
const router=express.Router();
const registrationController=require('../controller/registrationController');
const {authenticate}=require('../middleware/authenticate');

router.post('/parent',authenticate,registrationController.registerParent);
router.post('/coach',authenticate,registrationController.registerCoach);
router.post('/school',authenticate,registrationController.registerSchool);

module.exports=router;
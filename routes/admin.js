const express=require('express');
const router=express.Router();
const adminController=require('../controller/adminController');
const {authenticate,adminAuth}=require('../middleware/authenticate')

router.get('/coaches/pending',authenticate,adminAuth,adminController.getPendingCoaches);
router.put('/coaches/approve/:coachId',authenticate,adminAuth,adminController.approveCoach);
router.put('/coaches/reject/:coachId',authenticate,adminAuth,adminController.rejectCoach);

module.exports=router;
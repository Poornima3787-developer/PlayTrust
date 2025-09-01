const express=require('express');
const router=express.Router();
const upload=require('../service/upload');
const eventController=require('../controller/eventController');
const {authenticate}=require('../middleware/authenticate')

router.post('/',upload.single("eventImage"),authenticate,eventController.uploadEvent);
router.get('/myevents',authenticate,eventController.getMyEvents);
router.put('/:id',upload.single("eventImage"),authenticate,eventController.updateEvent)
router.delete('/:id',authenticate,eventController.deleteEvent);

router.get('/',authenticate,eventController.getEvent);

module.exports=router;
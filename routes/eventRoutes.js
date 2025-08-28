const express=require('express');
const router=express.Router();
const eventController=require('../controller/eventController');

router.post('/',eventController.uploadEvent);
router.get('/',eventController.getEvent);
router.delete('/:id',eventController.deleteEvent);

module.exports=router;
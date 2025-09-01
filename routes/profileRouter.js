const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');
const {authenticate} = require('../middleware/authenticate');
const upload=require('../service/upload')

router.put('/update', authenticate, upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "certifications", maxCount: 5 } 
  ]),profileController.updateProfile);
router.get('/coaches',authenticate, profileController.getAllCoaches);
router.get('/me',authenticate,profileController.getSingleProfile);

module.exports = router;

const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');
const {authenticate} = require('../middleware/authenticate');

//router.put('/update', authenticate,profileController.updateProfile);
router.get('/coaches',authenticate, profileController.getProfile);
router.get('/me',authenticate,profileController.getSingleProfile);

module.exports = router;

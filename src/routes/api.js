const express = require('express');
const userControllers = require("../controller/userControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Registration API
router.post('/registration', userControllers.register);
router.post('/ProfileUpdate',authMiddleware,userControllers.updateUserProfile);

router.post('/login',userControllers.login);
router.get('/UserProfile',authMiddleware,userControllers.ProfileDetails);
router.get('/allUser',userControllers.getAllUsers);

// delete user
router.post('/DeleteUser/:id',authMiddleware,userControllers.DeleteUser);
module.exports = router;  // CommonJS ব্যবহার করুন

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  register, login, getMe, updateProfile, changePassword,
  addAddress, updateAddress, deleteAddress
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.post('/addresses', protect, addAddress);
router.put('/addresses/:id', protect, updateAddress);
router.delete('/addresses/:id', protect, deleteAddress);

module.exports = router;

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { asyncHandler, AppError } = require('../middleware/errorMiddleware');
const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ success: true, user });
}));

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, phone },
    { new: true, runValidators: true }
  );
  res.json({ success: true, user });
}));

// @desc    Add new address (max 2)
// @route   POST /api/users/address
// @access  Private
router.post('/address', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw new AppError('User not found', 404);

  if (user.addresses.length >= 2) {
    throw new AppError('Maximum 2 addresses allowed. Delete one to add new.', 400);
  }

  const { name, phone, street, city, state, pincode } = req.body;
  if (!name || !phone || !street || !city || !state || !pincode) {
    throw new AppError('All address fields are required', 400);
  }

  user.addresses.push({ name, phone, street, city, state, pincode });
  await user.save();

  res.json({ success: true, message: 'Address saved', addresses: user.addresses });
}));

// @desc    Edit existing address
// @route   PUT /api/users/address/:index
// @access  Private
router.put('/address/:index', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw new AppError('User not found', 404);

  const index = parseInt(req.params.index);
  if (index < 0 || index >= user.addresses.length) {
    throw new AppError('Address not found', 404);
  }

  const { name, phone, street, city, state, pincode } = req.body;
  if (!name || !phone || !street || !city || !state || !pincode) {
    throw new AppError('All address fields are required', 400);
  }

  user.addresses[index] = { name, phone, street, city, state, pincode };
  await user.save();

  res.json({ success: true, message: 'Address updated', addresses: user.addresses });
}));

// @desc    Delete address
// @route   DELETE /api/users/address/:index
// @access  Private
router.delete('/address/:index', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw new AppError('User not found', 404);

  const index = parseInt(req.params.index);
  if (index < 0 || index >= user.addresses.length) {
    throw new AppError('Address not found', 404);
  }

  user.addresses.splice(index, 1);
  await user.save();

  res.json({ success: true, message: 'Address deleted', addresses: user.addresses });
}));

module.exports = router;
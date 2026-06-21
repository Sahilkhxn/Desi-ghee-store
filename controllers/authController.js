const User = require('../models/User');
const { generateToken } = require('../middleware/authMiddleware');
// Check if JWT_SECRET exists
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is not set in .env file!');
  process.exit(1);
}
const { asyncHandler, AppError } = require('../middleware/errorMiddleware');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    throw new AppError('Please provide name, email and password', 400);
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError('Email already registered', 400);
  }

  const user = await User.create({ name, email, password, phone });
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    }
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  if (!user.isActive) {
    throw new AppError('Your account has been deactivated', 401);
  }

  const token = generateToken(user._id);

  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    }
  });
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ success: true, user });
});

// @desc    Update profile
// @route   PUT /api/auth/update-profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, phone },
    { new: true, runValidators: true }
  );
  res.json({ success: true, message: 'Profile updated', user });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.comparePassword(currentPassword))) {
    throw new AppError('Current password is incorrect', 400);
  }

  user.password = newPassword;
  await user.save();

  const token = generateToken(user._id);
  res.json({ success: true, message: 'Password changed successfully', token });
});

// @desc    Add address
// @route   POST /api/auth/addresses
// @access  Private
const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  if (req.body.isDefault) {
    user.addresses.forEach(addr => addr.isDefault = false);
  }

  user.addresses.push(req.body);
  await user.save();

  res.status(201).json({ success: true, message: 'Address added', addresses: user.addresses });
});

// @desc    Update address
// @route   PUT /api/auth/addresses/:id
// @access  Private
const updateAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const addrIndex = user.addresses.findIndex(a => a._id.toString() === req.params.id);
  
  if (addrIndex === -1) throw new AppError('Address not found', 404);

  if (req.body.isDefault) {
    user.addresses.forEach(addr => addr.isDefault = false);
  }

  user.addresses[addrIndex] = { ...user.addresses[addrIndex].toObject(), ...req.body };
  await user.save();

  res.json({ success: true, message: 'Address updated', addresses: user.addresses });
});

// @desc    Delete address
// @route   DELETE /api/auth/addresses/:id
// @access  Private
const deleteAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  user.addresses = user.addresses.filter(a => a._id.toString() !== req.params.id);
  await user.save();
  res.json({ success: true, message: 'Address deleted', addresses: user.addresses });
});

module.exports = { register, login, getMe, updateProfile, changePassword, addAddress, updateAddress, deleteAddress };

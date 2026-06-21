const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Admin dashboard analytics
// @route   GET /api/admin/dashboard
// @access  Admin
const getDashboard = asyncHandler(async (req, res) => {
  const [totalUsers, totalProducts, totalOrders, orders] = await Promise.all([
    User.countDocuments({ role: 'user' }),
    Product.countDocuments({ isActive: true }),
    Order.countDocuments(),
    Order.find({ 'paymentInfo.status': 'paid' })
  ]);

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalPrice, 0);

  // Sales by month (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const monthlySales = await Order.aggregate([
    { $match: { 'paymentInfo.status': 'paid', createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
        revenue: { $sum: '$totalPrice' },
        orders: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ]);

  // Recent orders
  const recentOrders = await Order.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .limit(10);

  // Order status distribution
  const statusDist = await Order.aggregate([
    { $group: { _id: '$orderStatus', count: { $sum: 1 } } }
  ]);

  res.json({
    success: true,
    stats: { totalUsers, totalProducts, totalOrders, totalRevenue },
    monthlySales,
    recentOrders,
    statusDist
  });
});

// @desc    Get all users (Admin)
// @route   GET /api/admin/users
// @access  Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, search } = req.query;
  const query = search ? { name: { $regex: search, $options: 'i' } } : {};

  const total = await User.countDocuments(query);
  const users = await User.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));

  res.json({ success: true, total, users });
});

// @desc    Toggle user status (Admin)
// @route   PUT /api/admin/users/:id/toggle
// @access  Admin
const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  user.isActive = !user.isActive;
  await user.save();
  res.json({ success: true, message: `User ${user.isActive ? 'activated' : 'deactivated'}`, user });
});

// @desc    Get sales report
// @route   GET /api/admin/reports/sales
// @access  Admin
const getSalesReport = asyncHandler(async (req, res) => {
  const { from, to } = req.query;
  const matchQuery = { 'paymentInfo.status': 'paid' };
  if (from && to) matchQuery.createdAt = { $gte: new Date(from), $lte: new Date(to) };

  const report = await Order.aggregate([
    { $match: matchQuery },
    { $unwind: '$orderItems' },
    {
      $group: {
        _id: '$orderItems.product',
        productName: { $first: '$orderItems.name' },
        totalQuantity: { $sum: '$orderItems.quantity' },
        totalRevenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.quantity'] } }
      }
    },
    { $sort: { totalRevenue: -1 } }
  ]);

  res.json({ success: true, report });
});

module.exports = { getDashboard, getAllUsers, toggleUserStatus, getSalesReport };

const Order = require('../models/Order');
const Product = require('../models/Product');
const { asyncHandler, AppError } = require('../middleware/errorMiddleware');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress } = req.body;

  if (!orderItems || orderItems.length === 0) {
    throw new AppError('No order items provided', 400);
  }

  // Calculate prices and verify stock
  let itemsPrice = 0;
  const verifiedItems = [];

  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) throw new AppError(`Product ${item.product} not found`, 404);
    if (product.stock < item.quantity) throw new AppError(`Insufficient stock for ${product.name}`, 400);

    const price = product.discountedPrice || product.price;
    itemsPrice += price * item.quantity;
    verifiedItems.push({
      product: product._id,
      name: product.name,
      image: product.images[0]?.url || '',
      price,
      quantity: item.quantity,
      weight: product.weight
    });
  }

  const shippingPrice = itemsPrice >= 500 ? 0 : 60; // Free shipping above ₹500
  const taxPrice = Math.round(itemsPrice * 0.05); // 5% GST
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

 
const isCod = req.body.paymentMethod === 'cod';

const order = await Order.create({
  user: req.user.id,
  orderItems: verifiedItems,
  shippingAddress,
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
  paymentMethod: req.body.paymentMethod || 'cod',
  paymentInfo: { status: isCod ? 'cod_pending' : 'pending' },
  orderStatus: isCod ? 'confirmed' : 'placed'
});

  res.status(201).json({ success: true, message: 'Order created', order });
});

// @desc    Get user's orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) throw new AppError('Order not found', 404);

  // Only owner or admin can view
  if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new AppError('Not authorized to view this order', 403);
  }

  res.json({ success: true, order });
});

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const query = status ? { orderStatus: status } : {};

  const total = await Order.countDocuments(query);
  const orders = await Order.find(query)
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({ success: true, total, orders });
});

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) throw new AppError('Order not found', 404);

  order.orderStatus = status;
  if (status === 'delivered') order.deliveredAt = new Date();
  await order.save();

  res.json({ success: true, message: 'Order status updated', order });
});

module.exports = { createOrder, getMyOrders, getOrder, getAllOrders, updateOrderStatus };

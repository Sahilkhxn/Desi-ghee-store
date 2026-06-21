const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const { asyncHandler, AppError } = require('../middleware/errorMiddleware');

// Initialize Razorpay only if keys exist
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
}

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
// @access  Private
const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);
  if (!order) throw new AppError('Order not found', 404);
  if (order.user.toString() !== req.user.id) throw new AppError('Not authorized', 403);

  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(order.totalPrice * 100), // Razorpay expects paise
    currency: 'INR',
    receipt: order.orderNumber,
    notes: {
      orderId: order._id.toString(),
      userId: req.user.id
    }
  });

  // Save Razorpay order ID to our order
  order.paymentInfo.razorpayOrderId = razorpayOrder.id;
  await order.save();

  res.json({
    success: true,
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    keyId: process.env.RAZORPAY_KEY_ID
  });
});

// @desc    Verify Razorpay payment signature
// @route   POST /api/payments/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  // Verify signature
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    throw new AppError('Payment verification failed - Invalid signature', 400);
  }

  // Update order payment status
  const order = await Order.findById(orderId);
  if (!order) throw new AppError('Order not found', 404);

  order.paymentInfo = {
    razorpayOrderId: razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
    razorpaySignature: razorpay_signature,
    status: 'paid'
  };
  order.orderStatus = 'confirmed';
  await order.save();

  res.json({
    success: true,
    message: 'Payment verified successfully',
    order
  });
});

// @desc    Get payment details
// @route   GET /api/payments/:paymentId
// @access  Private
const getPaymentDetails = asyncHandler(async (req, res) => {
  const payment = await razorpay.payments.fetch(req.params.paymentId);
  res.json({ success: true, payment });
});

module.exports = { createRazorpayOrder, verifyPayment, getPaymentDetails };

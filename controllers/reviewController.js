const Review = require('../models/Review');
const Order = require('../models/Order');
const { asyncHandler, AppError } = require('../middleware/errorMiddleware');

// @desc    Get product reviews
// @route   GET /api/reviews/product/:productId
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });
  res.json({ success: true, reviews });
});

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { product, rating, title, comment } = req.body;

  // Check if user already reviewed
  const existing = await Review.findOne({ user: req.user.id, product });
  if (existing) throw new AppError('You have already reviewed this product', 400);

  // Check verified purchase
  const order = await Order.findOne({
    user: req.user.id,
    'orderItems.product': product,
    'paymentInfo.status': 'paid'
  });

  const review = await Review.create({
    user: req.user.id,
    product,
    rating,
    title,
    comment,
    isVerifiedPurchase: !!order
  });

  await review.populate('user', 'name');
  res.status(201).json({ success: true, message: 'Review submitted', review });
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) throw new AppError('Review not found', 404);

  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new AppError('Not authorized', 403);
  }

  await review.deleteOne();
  res.json({ success: true, message: 'Review deleted' });
});

module.exports = { getProductReviews, createReview, deleteReview };

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getProductReviews, createReview, deleteReview } = require('../controllers/reviewController');

router.get('/product/:productId', getProductReviews);
router.post('/', protect, createReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;

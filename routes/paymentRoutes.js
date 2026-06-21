const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createRazorpayOrder, verifyPayment, getPaymentDetails } = require('../controllers/paymentController');

router.post('/create-order', protect, createRazorpayOrder);
router.post('/verify', protect, verifyPayment);
router.get('/:paymentId', protect, getPaymentDetails);

module.exports = router;

const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are required' });
  }
  // In production: send email via nodemailer or save to DB
  console.log('📧 Contact Form Submission:', { name, email, phone, message });
  res.json({ success: true, message: 'Thank you! We will contact you soon.' });
});

module.exports = { submitContact };

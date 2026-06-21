const Product = require('../models/Product');
const { asyncHandler, AppError } = require('../middleware/errorMiddleware');

// @desc    Get all products with filtering, search, pagination
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { category, search, minPrice, maxPrice, sort, page = 1, limit = 12, featured } = req.query;

  const query = { isActive: true };

  if (category) query.category = category;
  if (featured === 'true') query.isFeatured = true;
  if (search) query.$or = [
    { name: { $regex: search, $options: 'i' } },
    { description: { $regex: search, $options: 'i' } },
    { tags: { $in: [new RegExp(search, 'i')] } }
  ];
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  let sortOption = {};
  switch (sort) {
    case 'price-asc': sortOption = { price: 1 }; break;
    case 'price-desc': sortOption = { price: -1 }; break;
    case 'rating': sortOption = { rating: -1 }; break;
    case 'newest': sortOption = { createdAt: -1 }; break;
    default: sortOption = { isFeatured: -1, createdAt: -1 };
  }

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Product.countDocuments(query);
  const products = await Product.find(query).sort(sortOption).skip(skip).limit(Number(limit));

  res.json({
    success: true,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    products
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product || !product.isActive) throw new AppError('Product not found', 404);
  res.json({ success: true, product });
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true, isFeatured: true }).limit(6);
  res.json({ success: true, products });
});

// @desc    Create product (Admin)
// @route   POST /api/products
// @access  Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, message: 'Product created', product });
});

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
// @access  Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) throw new AppError('Product not found', 404);
  res.json({ success: true, message: 'Product updated', product });
});

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
// @access  Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new AppError('Product not found', 404);
  product.isActive = false;
  await product.save();
  res.json({ success: true, message: 'Product deleted' });
});

module.exports = { getProducts, getProduct, getFeaturedProducts, createProduct, updateProduct, deleteProduct };

# 🫙 Shuddh Ghee — Premium Desi Ghee E-Commerce Store

A complete, production-ready **full-stack e-commerce platform** for selling premium desi ghee. Built with modern technologies and best practices.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-6%2B-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![Razorpay](https://img.shields.io/badge/Razorpay-Payment-red)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **MongoDB** 6+ ([Download](https://www.mongodb.com/try/download/community))
- **Git** ([Download](https://git-scm.com/))

### 1️⃣ Clone & Setup Backend

```bash
# Clone the repository
git clone <repo-url>
cd desi-ghee-store

# Install backend dependencies
cd backend
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your credentials
nano .env
```

**`.env` file configuration:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/desi_ghee_store

JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRE=30d

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

FRONTEND_URL=http://localhost:3000
```

### 2️⃣ Start MongoDB

```bash
# Start MongoDB (macOS with Homebrew)
brew services start mongodb-community

# Or start MongoDB service (Windows)
# net start MongoDB

# Or Linux
# sudo systemctl start mongod
```

### 3️⃣ Seed Database with Sample Data

```bash
# From backend directory
node utils/seeder.js
```

**Output:**
```
✅ Connected to MongoDB
🗑️ Cleared existing data
👤 Admin created: admin@desighestore.com / Admin@123
👤 Test user created: user@test.com / Test@123
📦 6 products seeded
```

### 4️⃣ Start Backend Server

```bash
# From backend directory
npm start
# Server running on http://localhost:5000
```

### 5️⃣ Access Frontend

Frontend files are in the `/frontend` directory and are served automatically by the backend.

**Open in browser:**
- **Home Page:** http://localhost:5000/
- **Products:** http://localhost:5000/pages/products.html
- **Login:** http://localhost:5000/pages/login.html
- **Admin Panel:** http://localhost:5000/pages/admin.html

---

## 📚 Project Structure

```
desi-ghee-store/
├── backend/
│   ├── config/              # Database configuration
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── reviewController.js
│   │   ├── adminController.js
│   │   └── contactController.js
│   ├── middleware/          # Auth, error handling
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/              # MongoDB schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Review.js
│   ├── routes/              # API endpoints
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── userRoutes.js
│   │   ├── adminRoutes.js
│   │   └── contactRoutes.js
│   ├── utils/
│   │   └── seeder.js        # Sample data seeder
│   ├── server.js            # Main entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── css/
│   │   └── main.css         # Complete design system
│   ├── js/
│   │   └── main.js          # API client, Auth, Cart, Utils
│   ├── pages/               # All HTML pages
│   │   ├── products.html
│   │   ├── product-detail.html
│   │   ├── cart.html
│   │   ├── checkout.html
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   ├── about.html
│   │   ├── contact.html
│   │   └── admin.html
│   └── index.html           # Home page
│
└── README.md
```

---

## 🔐 Test Credentials

### Admin Account
```
Email: admin@desighestore.com
Password: Admin@123
```

### Customer Account
```
Email: user@test.com
Password: Test@123
```

---

## 🛍️ Features

### 👥 User Features
- ✅ User registration & login (JWT auth)
- ✅ Product browsing with search & filters
- ✅ Product reviews & ratings
- ✅ Shopping cart with quantity management
- ✅ Secure checkout
- ✅ Razorpay payment integration
- ✅ Order tracking
- ✅ Address management
- ✅ Account profile management

### 📦 Product Management
- ✅ Product listing with pagination
- ✅ Category filtering
- ✅ Price range filtering
- ✅ Search functionality
- ✅ Product details with images
- ✅ Stock management
- ✅ Discount/offer management

### 💳 Payment System
- ✅ Razorpay integration
- ✅ Multiple payment methods (UPI, Cards, Wallets)
- ✅ Payment signature verification
- ✅ Secure payment handling
- ✅ Order confirmation

### 📊 Admin Dashboard
- ✅ Dashboard analytics
- ✅ Revenue tracking
- ✅ Order management & status updates
- ✅ User management
- ✅ Product CRUD operations
- ✅ Sales reports by date range
- ✅ User activation/deactivation

### 🔒 Security
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Rate limiting on auth endpoints
- ✅ Helmet.js security headers
- ✅ CORS protection
- ✅ Input validation
- ✅ Razorpay signature verification

---

## 📱 API Endpoints

### Authentication
```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login user
GET    /api/auth/me                # Get current user
PUT    /api/auth/update-profile    # Update profile
PUT    /api/auth/change-password   # Change password
POST   /api/auth/addresses         # Add address
PUT    /api/auth/addresses/:id     # Update address
DELETE /api/auth/addresses/:id     # Delete address
```

### Products
```
GET    /api/products               # Get all products (with filters)
GET    /api/products/featured      # Get featured products
GET    /api/products/:id           # Get product details
POST   /api/products               # Create product (admin)
PUT    /api/products/:id           # Update product (admin)
DELETE /api/products/:id           # Delete product (admin)
```

### Orders
```
POST   /api/orders                 # Create order
GET    /api/orders/my-orders       # Get user's orders
GET    /api/orders/:id             # Get order details
GET    /api/orders                 # Get all orders (admin)
PUT    /api/orders/:id/status      # Update order status (admin)
```

### Payments
```
POST   /api/payments/create-order  # Create Razorpay order
POST   /api/payments/verify        # Verify payment signature
GET    /api/payments/:paymentId    # Get payment details
```

### Reviews
```
GET    /api/reviews/product/:id    # Get product reviews
POST   /api/reviews                # Submit review
DELETE /api/reviews/:id            # Delete review
```

### Admin
```
GET    /api/admin/dashboard        # Get dashboard analytics
GET    /api/admin/users            # Get all users
PUT    /api/admin/users/:id/toggle # Toggle user status
GET    /api/admin/reports/sales    # Get sales report
```

---

## 💳 Razorpay Setup

1. **Create Razorpay Account:** https://razorpay.com/
2. **Get API Keys:**
   - Go to Dashboard → Settings → API Keys
   - Copy **Key ID** and **Key Secret**
3. **Update `.env`:**
   ```env
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   ```

---

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (user/admin),
  addresses: [{
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    isDefault: Boolean
  }],
  isActive: Boolean,
  createdAt: Date
}
```

### Products Collection
```javascript
{
  name: String,
  slug: String (unique),
  description: String,
  category: String (enum),
  price: Number,
  discountedPrice: Number,
  stock: Number,
  weight: String,
  images: [{ url: String, alt: String }],
  benefits: [String],
  ingredients: [String],
  rating: Number,
  numReviews: Number,
  isFeatured: Boolean,
  isActive: Boolean,
  createdAt: Date
}
```

### Orders Collection
```javascript
{
  user: ObjectId (ref: User),
  orderItems: [{
    product: ObjectId (ref: Product),
    name: String,
    image: String,
    price: Number,
    quantity: Number,
    weight: String
  }],
  shippingAddress: {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  paymentInfo: {
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    status: String (pending/paid/failed/refunded)
  },
  itemsPrice: Number,
  shippingPrice: Number,
  taxPrice: Number,
  totalPrice: Number,
  orderStatus: String (placed/confirmed/processing/shipped/delivered/cancelled),
  orderNumber: String (unique),
  createdAt: Date,
  deliveredAt: Date
}
```

---

## 🎨 Design Features

- **Modern & Clean UI** with premium aesthetic
- **Mobile-First Responsive Design** (works on all devices)
- **Professional Color Scheme:**
  - Gold (`#C8952A`) - Primary accent
  - Cream (`#FDF6E9`) - Background
  - Brown (`#4A2C0A`) - Text
  - Green (`#2D5016`) - Accent
- **Smooth Animations** and transitions
- **Accessibility Compliant** (WCAG 2.1)
- **Typography:** Cormorant Garamond (serif) + DM Sans (sans-serif)
- **Reusable Components** - Buttons, Cards, Forms, etc.

---

## 🚀 Deployment

### Deploy to Vercel (Frontend)
```bash
cd frontend
# Deploy to Vercel
vercel
```

### Deploy to Heroku (Backend)
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
heroku config:set JWT_SECRET=your-secret
heroku config:set RAZORPAY_KEY_ID=your-key
heroku config:set RAZORPAY_KEY_SECRET=your-secret
heroku config:set FRONTEND_URL=https://your-frontend-url

# Deploy
git push heroku main
```

---

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development/production |
| MONGODB_URI | MongoDB connection | mongodb://localhost:27017/db |
| JWT_SECRET | JWT signing secret | your_super_secret_key |
| JWT_EXPIRE | JWT expiration | 30d |
| RAZORPAY_KEY_ID | Razorpay API key | rzp_test_xxxxx |
| RAZORPAY_KEY_SECRET | Razorpay API secret | xxxx |
| FRONTEND_URL | Frontend URL | http://localhost:3000 |

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service
```bash
brew services start mongodb-community  # macOS
sudo systemctl start mongod             # Linux
```

### Port 5000 Already in Use
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=8000 npm start
```

### Razorpay Payment Error
- Check API keys in `.env`
- Ensure you're using test mode keys
- Verify Razorpay account is activated

### CORS Issues
- Update `FRONTEND_URL` in `.env` to match your frontend URL
- Check `server.js` CORS configuration

---

## 📞 Support & Contact

- **Email:** hello@shudhghee.com
- **WhatsApp:** https://wa.me/919999999999
- **GitHub Issues:** Submit bug reports

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Developer

Built with ❤️ by **Sahil Khxn**

- **GitHub:** github.com/Sahilkhxn
- **Portfolio:** [Your portfolio URL]

---

## 🙏 Acknowledgments

- Razorpay for payment gateway
- MongoDB for database
- Express.js community
- All testers and contributors

---

**Made for Indian farmers and families. Bringing pure desi ghee to modern kitchens. 🫙**

---

## 🎯 Next Steps

1. ✅ Setup backend & database
2. ✅ Configure Razorpay keys
3. ✅ Add your products to database
4. ✅ Customize branding (colors, fonts, images)
5. ✅ Deploy to production
6. ✅ Setup email notifications (nodemailer)
7. ✅ Add analytics tracking (Google Analytics)
8. ✅ Setup CDN for images
9. ✅ Configure SSL certificate
10. ✅ Implement SMS notifications (Twilio)

---

**v1.0.0** - June 2025

Happy selling! 🎉

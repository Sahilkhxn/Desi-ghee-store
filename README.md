🫙 Desi Ghee Store

A full-stack e-commerce platform for selling premium desi ghee, built with Node.js, Express, and MongoDB. Includes user authentication, product management, order processing, payments, and an admin dashboard.

Show Image
Show Image
Show Image
Show Image


✨ Features


🔐 User Authentication — JWT-based login & registration
🛍️ Product Management — browse, search, and filter desi ghee products
🛒 Cart & Checkout — smooth shopping experience with COD support
💳 Payments — secure online payment integration
📦 Order Management — order tracking and status updates
⭐ Reviews & Ratings — customer feedback on products
🧑‍💼 Admin Panel — manage products, orders, and users
📧 Email Notifications — automated order/status emails via Nodemailer
📄 PDF Invoices — auto-generated invoices for orders
🔌 Real-time Updates — Socket.io powered live order alerts



🛠️ Tech Stack

LayerTechnologyBackendNode.js, Express.jsDatabaseMongoDB, MongooseAuthJWT, bcryptRealtimeSocket.ioEmailNodemailerPDFPDF generation utility


📂 Project Structure

desi-ghee-store/
├── config/          # Database & app configuration
├── controllers/      # Route logic / business logic
├── middleware/        # Auth, error handling, etc.
├── models/            # Mongoose schemas
├── routes/            # API route definitions
├── utils/              # Helper functions & seeders
├── server.js           # Application entry point
├── package.json
└── .gitignore


🚀 Getting Started

Prerequisites


Node.js (v18 or higher)
MongoDB (local or Atlas)


Installation

bash# Clone the repository
git clone https://github.com/Sahilkhxn/Desi-ghee-store.git
cd Desi-ghee-store

# Install dependencies
npm install

Environment Variables

Create a .env file in the root directory with the following:

envPORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d

EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password

# Add any payment gateway keys here


⚠️ Never commit your .env file — it's already included in .gitignore.



Run the Server

bash# Development mode (with nodemon)
npm run dev

# Production mode
npm start

Server will start at http://localhost:5000


📡 API Overview

ModuleDescription/api/authRegister, login, profile management/api/productsCRUD operations for products/api/ordersPlace and manage orders/api/reviewsProduct reviews & ratings/api/adminAdmin-only dashboard routes/api/paymentsPayment processing


🤝 Contributing

Contributions, issues, and feature requests are welcome!


Fork the repo
Create your feature branch (git checkout -b feature/your-feature)
Commit your changes (git commit -m 'Add some feature')
Push to the branch (git push origin feature/your-feature)
Open a Pull Request



📄 License

This project is licensed under the MIT License.


👨‍💻 Author

Sahil Khan
GitHub: @Sahilkhxn


⭐ If you find this project useful, consider giving it a star!
# Ecommerce Project Structure

## Frontend
client/src/pages
client/src/components
client/src/api

## Backend
server/src/routes
server/src/models
server/src/controllers

## Main Files
App.jsx
Navbar.jsx
Products.jsx
ProductDetails.jsx
ProductCard.jsx
Admin.jsx
server.js

e-commerce-app/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   ├── productApi.js
│   │   │   ├── authApi.js
│   │   │   └── reviewApi.js
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── ChatBot.jsx
│   │   │   ├── WishlistButton.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Success.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Admin.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Wishlist.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── CartContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   │
│   │   ├── utils/
│   │   │   ├── formatPrice.js
│   │   │   ├── searchProducts.js
│   │   │   └── toast.js
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── productController.js
│   │   │   ├── authController.js
│   │   │   ├── uploadController.js
│   │   │   └── reviewController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   │
│   │   ├── routes/
│   │   │   ├── productRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── uploadRoutes.js
│   │   │   └── authRoutes.js
│   │   │
│   │   ├── utils/
│   │   │   ├── cloudinary.js
│   │   │   └── generateToken.js
│   │   │
│   │   └── seeder/
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
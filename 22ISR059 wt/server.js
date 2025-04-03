const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/farmerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  quantity: Number,
  imageUrl: String
});

const Product = mongoose.model('Product', productSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Route to handle form submission
app.post('/upload-product', upload.single('productImage'), (req, res) => {
  const { productName, productDescription, productCategory, productPrice, productQuantity } = req.body;

  const newProduct = new Product({
    name: productName,
    description: productDescription,
    category: productCategory,
    price: productPrice,
    quantity: productQuantity,
    imageUrl: `/uploads/${req.file.filename}`
  });

  newProduct.save()
    .then(() => res.json({ message: 'Product uploaded successfully!' }))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Serve static files like the HTML, CSS, JS files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware to handle form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/farmerDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Product Schema definition
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: String,
  location: String
});

// Product Model
const Product = mongoose.model('Product', productSchema);

// Serve the form HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Route to handle form submission and save data to MongoDB
app.post('/upload-product', async (req, res) => {
  try {
    const newProduct = new Product({
      productName: req.body.productName,
      quantity: req.body.quantity,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location
    });

    await newProduct.save();
    res.send('Product uploaded successfully!');
  } catch (err) {
    console.error('Error uploading product:', err);
    res.status(500).send('Error uploading product.');
  }
});

// 404 route (optional)
app.use((req, res) => {
  res.status(404).send('404: Page Not Found');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

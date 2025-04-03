const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/farmerDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  quantity: Number,
  price: Number,
  category: String,
  description: String,
  location: String
});

const Product = mongoose.model('Product', productSchema);

app.get('/upload-product', (req, res) => {
  res.send(`
    <form action="/upload-product" method="POST">
      <div class="form-group">
        <label for="productName">Product Name</label>
        <input type="text" class="form-control" id="productName" name="productName" placeholder="Enter Product Name" required>
      </div>
      <div class="form-group">
        <label for="quantity">Quantity (in kg)</label>
        <input type="number" class="form-control" id="quantity" name="quantity" placeholder="Enter Quantity">
      </div>
      <div class="form-group">
        <label for="price">Price per kg</label>
        <input type="number" class="form-control" id="price" name="price" placeholder="Enter Price">
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <select class="form-control" id="category" name="category">
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="grains">Grains</option>
          <option value="dairy">Dairy</option>
          <option value="poultry">Poultry</option>
        </select>
      </div>
      <div class="form-group">
        <label for="description">Product Description</label>
        <textarea class="form-control" id="description" name="description" placeholder="Enter Product Description"></textarea>
      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <input type="text" class="form-control" id="location" name="location" placeholder="Enter Your Location">
      </div>
      <button type="submit" class="btn btn-primary">Upload Product</button>
    </form>
  `);
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

const express = require('express');
const multer = require('multer');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5001; // Changed to another port number

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// MongoDB connection setup
const url = 'mongodb://127.0.0.1:27017'; // Use IPv4 address
const client = new MongoClient(url);
const dbName = 'farmerProducts'; // Change to your database name
let db;

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(dbName);
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

connectDB();

// Route to handle product uploads
app.post('/upload-product', upload.single('productImage'), async (req, res) => {
    try {
        const product = {
            name: req.body.productName,
            description: req.body.productDescription,
            category: req.body.productCategory,
            price: parseFloat(req.body.productPrice),
            quantity: parseInt(req.body.productQuantity, 10),
            image: req.file ? req.file.buffer : null, // Store the image buffer
            createdAt: new Date()
        };

        // Store product in MongoDB
        const result = await db.collection('products').insertOne(product);
        res.status(201).json({ message: 'Product uploaded successfully!', id: result.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload product' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

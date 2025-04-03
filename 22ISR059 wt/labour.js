
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/farmers', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the Farmer schema
const farmerSchema = new mongoose.Schema({
  first_name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zip_code: String,
  crop_type: String,
  farm_size: Number,
  livestock: String,
  farming_experience: Number,
});

const Farmer = mongoose.model('Farmer', farmerSchema);

// POST route to handle form submission
app.post('/submit_farmer', async (req, res) => {
  try {
    const farmerData = new Farmer(req.body);
    await farmerData.save();
    res.status(201).json({ message: 'Farmer data saved successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to save data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

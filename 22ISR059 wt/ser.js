const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// MongoDB connection URI
const uri = 'YOUR_MONGODB_CONNECTION_STRING';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());

app.get('/cart', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('shopping');
    const cart = database.collection('cart');
    const items = await cart.find().toArray();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.post('/cart', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('shopping');
    const cart = database.collection('cart');
    const item = req.body;
    await cart.insertOne(item);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.delete('/cart/:id', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('shopping');
    const cart = database.collection('cart');
    const result = await cart.deleteOne({ _id: new MongoClient.ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

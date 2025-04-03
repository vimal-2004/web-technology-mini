app.post('/checkout', (req, res) => {
    const cart = req.body.cart; // Assuming you're sending cart as a JSON object
    db.collection('orders').insertOne({ cart, date: new Date() }, (err, result) => {
        if (err) {
            return res.status(500).send('Error saving to database');
        }
        res.send('Order saved successfully');
    });
});

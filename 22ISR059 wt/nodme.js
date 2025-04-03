var http = require("http");
 var toy = require("./toy");
 function handleRequest(req, res) {
 res.writeHead(200, {'Content-Type': 'text/html'});
 const prices = [19.99, 29.99, 14.99];
 const total = toyOps.calculateTotalPrice(prices);
 res.end(`<h1>Welcome to the Toy Store</h1><p>Total Price: $${total}</p>`);
 }
 http.createServer(handleRequest).listen(8000);
 console.log("Server running on http://localhost:8000/");
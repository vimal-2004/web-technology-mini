exports.calculateTotalPrice = function(prices) {
    return prices.reduce((total, price) => total + price, 0);
    };
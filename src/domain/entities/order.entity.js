class Order {
    constructor(id, productId, description, price, quantity, discount, total) {
        this.id = id;
        this.productId = productId;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.discount = discount;
        this.total = total;
    }
}

module.exports = Order;
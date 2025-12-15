const Order = require('../../domain/entities/order.entity');

class OrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async getAllOrders() {
    return this.orderRepository.getAll();
  }

  async getOrderById(id) {
    return this.orderRepository.getById(id);
  }

  async createOrder(orderData) {
    const basePrice = orderData.price * orderData.quantity;
    const discountAmount = basePrice * (orderData.discount / 100);
    const total = basePrice - discountAmount;
    const orderEntity = new Order(
      null,
      orderData.productId,
      orderData.description,
      orderData.price,
      orderData.quantity,
      orderData.discount,
      total
    );
    const createdOrder = await this.orderRepository.create(orderEntity);
    return createdOrder;
  }

  async updateOrder(id, orderData) {
    const basePrice = orderData.price * orderData.quantity;
    const discountAmount = basePrice * (orderData.discount / 100 || 0);
    const total = basePrice - discountAmount;
    const orderEntity = new Order(
      id,
      orderData.productId,
      orderData.description,
      orderData.price,
      orderData.quantity,
      orderData.discount,
      total
    );
    const updatedOrder = await this.orderRepository.update(id, orderEntity);
    return updatedOrder;
  }

  async deleteOrder(id) {
    return this.orderRepository.delete(id);
  }
}
module.exports = OrderService;

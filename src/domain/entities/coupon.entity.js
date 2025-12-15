class Coupon {
  constructor(id, code, discountType, value, expirationDate, minOrderAmount, isActive) {
    this.id = id;
    this.code = code;
    this.discountType = discountType;
    this.value = value;
    this.expirationDate = expirationDate;
    this.minOrderAmount = minOrderAmount;
    this.isActive = isActive;
  }
}

module.exports = Coupon;
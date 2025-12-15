const Coupon = require('../../domain/entities/coupon.entity');

class CouponService {
  constructor(couponRepository) {
    this.couponRepository = couponRepository;
  }

  async getAllCoupons() {
    return this.couponRepository.getAll();
  }

  async getCouponById(id) {
    return this.couponRepository.getById(id);
  }

  async getCouponByCode(code) {
    return this.couponRepository.getByCode(code.toUpperCase());
  }

  async createCoupon(couponData) {
    const code = couponData.code.toUpperCase().trim();
    const minOrderAmount = couponData.minOrderAmount || 0;
    const isActive = couponData.isActive !== undefined ? couponData.isActive : true;
    const couponEntity = new Coupon(
      null, 
      code,
      couponData.discountType,
      couponData.value,
      new Date(couponData.expirationDate),
      minOrderAmount,
      isActive
    );

    const createdCoupon = await this.couponRepository.create(couponEntity);
    return createdCoupon;
  }

  async updateCoupon(id, couponData) {
    const code = couponData.code ? couponData.code.toUpperCase().trim() : undefined;
    
    const couponEntity = new Coupon(
      id,
      code, 
      couponData.discountType,
      couponData.value,
      couponData.expirationDate ? new Date(couponData.expirationDate) : undefined,
      couponData.minOrderAmount,
      couponData.isActive
    );

    const updatedCoupon = await this.couponRepository.update(id, couponEntity);
    return updatedCoupon;
  }

  async deleteCoupon(id) {
    return this.couponRepository.delete(id);
  }
}

module.exports = CouponService;
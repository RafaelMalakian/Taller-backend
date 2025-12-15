const CouponRepository = require('../../../../domain/repositories/coupon.repository.interface');
const CouponModel = require('./models/coupon.model');
const Coupon = require('../../../../domain/entities/coupon.entity');

class CouponMongoRepository extends CouponRepository {

  async getAll() {
    const coupons = await CouponModel.find();
    return coupons.map(c => new Coupon(
      c._id.toString(),
      c.code,
      c.discountType,
      c.value,
      c.expirationDate,
      c.minOrderAmount,
      c.isActive
    ));
  }

  async getById(id) {
    const coupon = await CouponModel.findById(id);
    if (!coupon) return null;
    return new Coupon(
      coupon._id.toString(),
      coupon.code,
      coupon.discountType,
      coupon.value,
      coupon.expirationDate,
      coupon.minOrderAmount,
      coupon.isActive
    );
  }

  async getByCode(code) {
    const coupon = await CouponModel.findOne({ code: code });
    if (!coupon) return null;
    return new Coupon(
      coupon._id.toString(),
      coupon.code,
      coupon.discountType,
      coupon.value,
      coupon.expirationDate,
      coupon.minOrderAmount,
      coupon.isActive
    );
  }

  async create(couponEntity) {
    const newCoupon = new CouponModel({
      code: couponEntity.code,
      discountType: couponEntity.discountType,
      value: couponEntity.value,
      expirationDate: couponEntity.expirationDate,
      minOrderAmount: couponEntity.minOrderAmount,
      isActive: couponEntity.isActive
    });

    const savedCoupon = await newCoupon.save();

    return new Coupon(
      savedCoupon._id.toString(),
      savedCoupon.code,
      savedCoupon.discountType,
      savedCoupon.value,
      savedCoupon.expirationDate,
      savedCoupon.minOrderAmount,
      savedCoupon.isActive
    );
  }

  async update(id, couponEntity) {
    const updatedCoupon = await CouponModel.findByIdAndUpdate(
      id,
      {
        code: couponEntity.code,
        discountType: couponEntity.discountType,
        value: couponEntity.value,
        expirationDate: couponEntity.expirationDate,
        minOrderAmount: couponEntity.minOrderAmount,
        isActive: couponEntity.isActive
      },
      { new: true }
    );

    if (!updatedCoupon) return null;

    return new Coupon(
      updatedCoupon._id.toString(),
      updatedCoupon.code,
      updatedCoupon.discountType,
      updatedCoupon.value,
      updatedCoupon.expirationDate,
      updatedCoupon.minOrderAmount,
      updatedCoupon.isActive
    );
  }

  async delete(id) {
    await CouponModel.findByIdAndDelete(id);
  }
}

module.exports = CouponMongoRepository;
const { Router } = require('express');
const CouponController = require('../controller/coupon.controller');
const CouponService = require('../../application/use-cases/coupon.service');
const CouponMongoRepository = require('../../infrastructure/repositories/database/mongo/coupon.mongo.repository');

const couponRepository = new CouponMongoRepository();
const couponService = new CouponService(couponRepository);
const couponController = new CouponController(couponService);

const router = Router();

router.get('/', couponController.getAll);
router.get('/code/:code', couponController.getByCode);
router.get('/:id', couponController.getById);
router.post('/', couponController.create);
router.put('/:id', couponController.update);
router.delete('/:id', couponController.delete);

module.exports = router;
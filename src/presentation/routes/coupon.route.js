const { Router } = require('express');
const CouponController = require('../controller/coupon.controller');
const CouponService = require('../../application/use-cases/coupon.service');
const CouponMongoRepository = require('../../infrastructure/repositories/database/mongo/coupon.mongo.repository');

const couponRepository = new CouponMongoRepository();
const couponService = new CouponService(couponRepository);
const couponController = new CouponController(couponService);

const router = Router();

/**
 * @swagger
 * /coupons:
 *   get:
 *    summary: Retrieve a list of coupons
 *    tags: [Coupons]
 *    responses:
 *      200:
 *        description: A list of coupons.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Coupon'
 */
router.get('/', couponController.getAll);

/**
 * @swagger
 * /coupons/code/{code}:
 *   get:
 *    summary: Retrieve a single coupon by Code
 *    tags: [Coupons]
 *    parameters:
 *      - in: path
 *        name: code
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: A single coupon found.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Coupon'
 *      404:
 *        description: Coupon not valid or found
 */
router.get('/code/:code', couponController.getByCode);

/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *    summary: Retrieve a single coupon by ID
 *    tags: [Coupons]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: A single coupon.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Coupon'
 *      404:
 *        description: Coupon not found
 */
router.get('/:id', couponController.getById);

/**
 * @swagger
 * /coupons:
 *   post:
 *      summary: Create a new coupon
 *      tags: [Coupons]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CouponInput'
 *      responses:
 *        201:
 *          description: The created coupon.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Coupon'
 *        400:
 *          description: Bad request (e.g., Code already exists)
 */
router.post('/', couponController.create);

/**
 * @swagger
 * /coupons/{id}:
 *   put:
 *    summary: Update a coupon
 *    tags: [Coupons]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CouponInput'
 *      responses:
 *        200:
 *          description: The updated coupon.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Coupon'
 *        404:
 *          description: Coupon not found
 */
router.put('/:id', couponController.update);

/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *      summary: Delete a coupon
 *      tags: [Coupons]
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        204:
 *          description: No content
 *        404:
 *          description: Coupon not found
 */
router.delete('/:id', couponController.delete);

module.exports = router;
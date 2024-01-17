const Router = require('express');
const ordersRouter = new Router();
const authMiddleware = require('../middlewares/auth');
const checkRole = require('../middlewares/role');
const { body } = require('express-validator');
const { createOrder, updateOrder } = require('../controllers/orders');

ordersRouter.post('/order', authMiddleware, [
  body('name').notEmpty().withMessage('Owner\'s name is required'),
  body('phone')
    .matches(/^\+380-\d{2}-\d{2}-\d{2}-\d{3}$/)
    .withMessage('Enter the correct phone number in the format +380-XX-XX-XX-XXX'),
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('nickname').notEmpty().withMessage('Nickname is required'),
  body('arrivalDate').notEmpty().withMessage('Arrival date is required'),
  body('departureDate').notEmpty().withMessage('Departure date is required'),
], createOrder);

ordersRouter.put('/update/order', authMiddleware, checkRole('admin'), updateOrder);

module.exports = ordersRouter;

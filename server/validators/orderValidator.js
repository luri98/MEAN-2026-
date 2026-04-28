import { body } from 'express-validator'

export const createOrderValidator = [
  body('shippingAddress.phone')
    .notEmpty()
    .withMessage('Phone is required')
    .isString()
    .withMessage('Phone must be a string'),

  body('shippingAddress.address')
    .notEmpty()
    .withMessage('Address is required')
    .isString()
    .withMessage('Address must be a string'),

  body('shippingAddress.city')
    .notEmpty()
    .withMessage('City is required')
    .isString()
    .withMessage('City must be a string'),

  body('shippingAddress.postalCode')
    .notEmpty()
    .withMessage('Postal code is required')
    .isString()
    .withMessage('Postal code must be a string'),

  body('shippingAddress.country')
    .notEmpty()
    .withMessage('Country is required')
    .isString()
    .withMessage('Country must be a string'),

  body('paymentMethod')
    .optional()
    .isIn(['cash', 'card'])
    .withMessage('Payment method must be cash or card')
]

export const updateOrderStatusValidator = [
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['pending', 'paid', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Invalid order status')
]
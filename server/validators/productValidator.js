import { body } from 'express-validator'

export const productValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 1 })
    .withMessage('Name must be at least 1 character'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a positive integer'),

  body('image')
    .optional()
    .isString()
    .withMessage('Image must be a string'),

  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Category must be a valid MongoDB ID'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be true or false')
]
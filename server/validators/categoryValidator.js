import { body } from 'express-validator'

export const categoryValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 1 })
    .withMessage('Name must be at least 1 characters'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
]
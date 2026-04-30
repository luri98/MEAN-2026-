import { body } from 'express-validator'
import User from '../models/User.js'

export const loginValidator = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isString()
        .withMessage('Email must be a string')
        .bail()
        .isEmail()
        .withMessage('Email must be valid')
        .bail()
        .custom(async email => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new Error('Email does not exist')
            }

            return true
        }),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .bail()
        .isString()
        .withMessage('Password must be a string')
]

export const registerValidator = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .bail()
        .isString()
        .withMessage('Name must be a string')
        .bail()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters'),

    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isString()
        .withMessage('Email must be a string')
        .bail()
        .isEmail()
        .withMessage('Email must be valid')
        .bail()
        .custom(async email => {
            const user = await User.findOne({ email })

            if (user) {
                throw new Error('Email already exists')
            }

            return true
        }),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .bail()
        .isString()
        .withMessage('Password must be a string')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
]
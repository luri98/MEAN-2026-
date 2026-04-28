import { body } from 'express-validator'
import User from '../models/User.js'

export const storeUserValidator = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters'),

    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isString()
        .withMessage('Email must be a string')
        .isEmail()
        .withMessage('Email must be valid')
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
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),

    body('role')
        .optional()
        .isString()
        .withMessage('Role must be a string')
        .isIn(['admin', 'user'])
        .withMessage('Role must be either admin or user')
]

export const updateUserValidator = [
    body('name')
        .notEmpty()
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters'),

    body('email')
        .notEmpty()
        .isString()
        .withMessage('Email must be a string')
        .isEmail()
        .withMessage('Email must be valid')
        .custom(async (email, { req }) => {
            const user = await User.findOne({ email })

            if (user && user._id.toString() !== req.params.id) {
                throw new Error('Email already exists')
            }

            return true
        }),

    body('password')
        .optional()
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),

    body('role')
        .optional()
        .isString()
        .withMessage('Role must be a string')
        .isIn(['admin', 'user'])
        .withMessage('Role must be either admin or user')
]
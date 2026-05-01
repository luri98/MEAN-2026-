import { body } from 'express-validator'
import User from '../models/User.js'

export const loginValidator = [
    body('email')
        .notEmpty()
        .withMessage('Email je obavezan')
        .bail()
        .isString()
        .withMessage('Email mora biti tekst')
        .bail()
        .isEmail()
        .withMessage('Email mora biti ispravan')
        .bail()
        .custom(async email => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new Error('Email ne postoji')
            }

            return true
        }),

    body('password')
        .notEmpty()
        .withMessage('Lozinka je obavezna')
        .bail()
        .isString()
        .withMessage('Lozinka mora biti tekst')
]

export const registerValidator = [
    body('name')
        .notEmpty()
        .withMessage('Ime je obavezno')
        .bail()
        .isString()
        .withMessage('Ime mora biti tekst')
        .bail()
        .isLength({ min: 2 })
        .withMessage('Ime mora imati najmanje 2 karaktera'),

    body('email')
        .notEmpty()
        .withMessage('Email je obavezan')
        .bail()
        .isString()
        .withMessage('Email mora biti tekst')
        .bail()
        .isEmail()
        .withMessage('Email mora biti ispravan')
        .bail()
        .custom(async email => {
            const user = await User.findOne({ email })

            if (user) {
                throw new Error('Email već postoji')
            }

            return true
        }),

    body('password')
        .notEmpty()
        .withMessage('Lozinka je obavezna')
        .bail()
        .isString()
        .withMessage('Lozinka mora biti tekst')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Lozinka mora imati najmanje 6 karaktera')
]
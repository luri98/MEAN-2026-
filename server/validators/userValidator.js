import { body } from 'express-validator'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

export const storeUserValidator = [
    body('name')
        .notEmpty()
        .withMessage('Ime je obavezno')
        .isString()
        .withMessage('Ime mora biti string')
        .isLength({ min: 2 })
        .withMessage('Ime mora imati najmanje 2 karaktera'),

    body('email')
        .notEmpty()
        .withMessage('Email je obavezan')
        .isString()
        .withMessage('Email mora biti string')
        .isEmail()
        .withMessage('Email mora biti validan')
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
        .isString()
        .withMessage('Lozinka mora biti string')
        .isLength({ min: 6 })
        .withMessage('Lozinka mora imati najmanje 6 karaktera'),

    body('role')
        .optional()
        .isString()
        .withMessage('Uloga mora biti string')
        .isIn(['admin', 'user'])
        .withMessage('Uloga mora biti admin ili user')
]

export const updateUserValidator = [
    body('name')
        .notEmpty()
        .withMessage('Ime je obavezno')
        .isString()
        .withMessage('Ime mora biti string')
        .isLength({ min: 2 })
        .withMessage('Ime mora imati najmanje 2 karaktera'),

    body('email')
        .notEmpty()
        .withMessage('Email je obavezan')
        .isString()
        .withMessage('Email mora biti string')
        .isEmail()
        .withMessage('Email mora biti validan')
        .custom(async (email, { req }) => {
            const user = await User.findOne({ email })

            if (user && user._id.toString() !== req.params.id) {
                throw new Error('Email već postoji')
            }

            return true
        }),

    body('password')
        .optional()
        .isString()
        .withMessage('Lozinka mora biti string')
        .isLength({ min: 6 })
        .withMessage('Lozinka mora imati najmanje 6 karaktera'),

    body('role')
        .optional()
        .isString()
        .withMessage('Uloga mora biti string')
        .isIn(['admin', 'user'])
        .withMessage('Uloga mora biti admin ili user')
]

export const updateUserPasswordValidator = [
    // 1. Check current password exists and matches hash
    body('password')
        .notEmpty()
        .withMessage('Trenutna lozinka je obavezna')
        .isString()
        .withMessage('Trenutna lozinka mora biti string')
        .custom(async (password, { req }) => {
            const user = await User.findById(req.user.id) // from auth middleware

            if (!user) {
                throw new Error('Korisnik nije pronađen')
            }

            const matches = await bcrypt.compare(password, user.password)

            if (!matches) {
                throw new Error('Trenutna lozinka nije tačna')
            }

            return true
        }),

    // 2. Validate new password strength
    body('newPassword')
        .notEmpty()
        .withMessage('Nova lozinka je obavezna')
        .isString()
        .withMessage('Nova lozinka mora biti string')
        .isLength({ min: 6 })
        .withMessage('Nova lozinka mora imati najmanje 6 karaktera')
        .custom((newPassword, { req }) => {
            if (newPassword === req.body.password) {
                throw new Error('Nova lozinka mora biti različita od trenutne lozinke')
            }

            return true
        }),

    // 3. Check confirmNewPassword matches newPassword
    body('confirmNewPassword')
        .notEmpty()
        .withMessage('Potvrdite novu lozinku')
        .isString()
        .withMessage('Potvrda lozinke mora biti string')
        .custom((confirmNewPassword, { req }) => {
            if (confirmNewPassword !== req.body.newPassword) {
                throw new Error('Lozinke se ne poklapaju')
            }

            return true
        })
]
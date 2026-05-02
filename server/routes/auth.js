import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

import { validate } from '../middleware/validate.js'
import { login, register, forgottenPassword, resetPassword } from '../controllers/authController.js'
import { loginValidator, registerValidator, forgottenPasswordValidator, resetPasswordValidator} from '../validators/authValidator.js'

const router = express.Router()

router.post('/register', registerValidator, validate, register)
router.post('/login', loginValidator, validate, login)

router.post('/forgotten-password', forgottenPasswordValidator, validate, forgottenPassword);
router.post('/reset-password/:token', resetPasswordValidator, validate, resetPassword);

export default router
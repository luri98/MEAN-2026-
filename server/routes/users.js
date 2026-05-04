import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

import { authMiddleware } from '../middleware/authMiddleware.js'

import { validate } from '../middleware/validate.js'
import { index, store, show, update, updatePassword, destroy } from '../controllers/usersController.js'
import { storeUserValidator, updateUserValidator, updateUserPasswordValidator } from '../validators/userValidator.js'


const router = express.Router()
router.use(authMiddleware)

router.get('/', index)
router.post('/', storeUserValidator, validate, store)
router.get('/:id', show)
router.put('/:id', updateUserValidator, validate, update)
router.patch('/password', updateUserPasswordValidator, validate, updatePassword)
router.delete('/:id', destroy)

export default router
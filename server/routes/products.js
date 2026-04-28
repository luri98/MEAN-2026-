import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { adminMiddleware } from '../middleware/adminMiddleware.js'
import { validate } from '../middleware/validate.js'
import { index, store, show, update, destroy } from '../controllers/productsController.js'
import { productValidator } from '../validators/productValidator.js'

const router = express.Router()

router.get('/', index)
router.post('/', [authMiddleware, adminMiddleware], productValidator, validate, store)
router.get('/:id', [authMiddleware, adminMiddleware], show)
router.put('/:id', [authMiddleware, adminMiddleware], productValidator, validate, update)
router.delete('/:id', [authMiddleware, adminMiddleware], destroy)

export default router
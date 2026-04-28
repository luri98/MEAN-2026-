import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validate.js'
import { show, addItem, updateItem, removeItem, clear } from '../controllers/cartController.js'
import { addCartItemValidator, updateCartItemValidator } from '../validators/cartValidator.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/', show)
router.post('/items', addCartItemValidator, validate, addItem)
router.patch('/items/:productId', updateCartItemValidator, validate, updateItem)
router.delete('/items/:productId', removeItem)
router.delete('/', clear)

export default router
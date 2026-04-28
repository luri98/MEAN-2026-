import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { adminMiddleware } from '../middleware/adminMiddleware.js'
import { validate } from '../middleware/validate.js'
import { index, store, myOrders, show, updateStatus, destroy } from '../controllers/ordersController.js'
import { createOrderValidator, updateOrderStatusValidator } from '../validators/orderValidator.js'

const router = express.Router()

router.post('/', authMiddleware, createOrderValidator, validate, store)
router.get('/my-orders', authMiddleware, myOrders)
router.get('/', authMiddleware, adminMiddleware, index)
router.get('/:id', authMiddleware, show)
router.patch('/:id/status', authMiddleware, adminMiddleware, updateOrderStatusValidator, validate, updateStatus)
router.delete('/:id', authMiddleware, adminMiddleware, destroy)

export default router
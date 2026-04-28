import express from 'express'
import authRoutes from './auth.js'
import userRoutes from './users.js'
import categoryRoutes from './categories.js'
import productRoutes from './products.js'
import cartRoutes from './cart.js'
import orderRoutes from './orders.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/categories', categoryRoutes)
router.use('/products', productRoutes)
router.use('/cart', cartRoutes)
router.use('/orders', orderRoutes)


export default router
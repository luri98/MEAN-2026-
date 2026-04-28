import Order from '../models/Order.js'
import Cart from '../models/Cart.js'
import Product from '../models/Product.js'

export const store = async (req, res) => {
    const paymentMethod = req.body.paymentMethod || 'cash'
    const shippingAddress = {
        ...req.body.shippingAddress,
        name: req.user.name
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')

    if (!cart || cart.items.length === 0) {
        return res.status(400).json({
            message: 'Cart is empty'
        })
    }

    let totalPrice = 0
    const orderItems = []

    for (const item of cart.items) {
        const product = item.product

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        if (!product.isActive) {
            return res.status(400).json({
                message: `${product.name} is not active`
            })
        }

        if (product.stock < item.quantity) {
            return res.status(400).json({
                message: `Not enough stock for ${product.name}`
            })
        }

        totalPrice += product.price * item.quantity

        orderItems.push({
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            image: product.image
        })
    }

    for (const item of cart.items) {
        await Product.findByIdAndUpdate(item.product._id, {
            $inc: {
                stock: -item.quantity
            }
        })
    }

    const order = await Order.create({
        user: req.user._id,
        items: orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice
    })

    cart.items = []
    await cart.save()

    res.status(201).json(order)
}

export const myOrders = async (req, res) => {
    const page = Math.max(Number(req.query.page) || 1, 1)
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100)
    const skip = (page - 1) * limit

    const total = await Order.countDocuments({ user: req.user._id })

    const orders = await Order.find({ user: req.user._id })
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

    res.json({
        data: orders,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
            hasNextPage: page * limit < total,
            hasPrevPage: page > 1
        }
    })
}

export const show = async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return res.status(404).json({
            message: 'Order not found'
        })
    }

    if (
        order.user.toString() !== req.user._id.toString() &&
        req.user.role !== 'admin'
    ) {
        return res.status(403).json({
            message: 'Access denied'
        })
    }

    res.json(order)
}

export const index = async (req, res) => {
    const page = Math.max(Number(req.query.page) || 1, 1)
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100)
    const skip = (page - 1) * limit

    const total = await Order.countDocuments()

    const orders = await Order.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

    res.json({
        data: orders,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
            hasNextPage: page * limit < total,
            hasPrevPage: page > 1
        }
    })
}

export const updateStatus = async (req, res) => {
    const { status } = req.body

    const order = await Order.findById(req.params.id)

    if (!order) {
        return res.status(404).json({
            message: 'Order not found'
        })
    }

    order.status = status

    await order.save()

    res.json(order)
}

export const destroy = async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id)

    if (!order) {
        return res.status(404).json({
            message: 'Order not found'
        })
    }

    res.json({
        message: 'Order deleted successfully'
    })
}
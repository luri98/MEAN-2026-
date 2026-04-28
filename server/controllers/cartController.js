import Cart from '../models/Cart.js'
import Product from '../models/Product.js'

export const show = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate('items.product')

  res.json(cart || {
    user: req.user._id,
    items: []
  })
}

export const addItem = async (req, res) => {
  const { productId, quantity = 1 } = req.body

  const product = await Product.findById(productId)

  if (!product) {
    return res.status(404).json({
      message: 'Product not found'
    })
  }

  if (!product.isActive) {
    return res.status(400).json({
      message: 'Product is not active'
    })
  }

  if (product.stock < quantity) {
    return res.status(400).json({
      message: 'Not enough stock'
    })
  }

  let cart = await Cart.findOne({ user: req.user._id })

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: []
    })
  }

  const existingItem = cart.items.find(item => {
    return item.product.toString() === productId
  })

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity

    if (product.stock < newQuantity) {
      return res.status(400).json({
        message: 'Not enough stock'
      })
    }

    existingItem.quantity = newQuantity
  } else {
    cart.items.push({
      product: productId,
      quantity
    })
  }

  await cart.save()

  const updatedCart = await Cart.findOne({ user: req.user._id })
    .populate('items.product')

  res.status(200).json(updatedCart)
}

export const updateItem = async (req, res) => {
  const { productId } = req.params
  const { quantity } = req.body

  if (!quantity || quantity < 1) {
    return res.status(400).json({
      message: 'Quantity must be at least 1'
    })
  }

  const product = await Product.findById(productId)

  if (!product) {
    return res.status(404).json({
      message: 'Product not found'
    })
  }

  if (product.stock < quantity) {
    return res.status(400).json({
      message: 'Not enough stock'
    })
  }

  const cart = await Cart.findOne({ user: req.user._id })

  if (!cart) {
    return res.status(404).json({
      message: 'Cart not found'
    })
  }

  const item = cart.items.find(item => {
    return item.product.toString() === productId
  })

  if (!item) {
    return res.status(404).json({
      message: 'Product not found in cart'
    })
  }

  item.quantity = quantity

  await cart.save()

  const updatedCart = await Cart.findOne({ user: req.user._id })
    .populate('items.product')

  res.json(updatedCart)
}

export const removeItem = async (req, res) => {
  const { productId } = req.params

  const cart = await Cart.findOne({ user: req.user._id })

  if (!cart) {
    return res.status(404).json({
      message: 'Cart not found'
    })
  }

  cart.items = cart.items.filter(item => {
    return item.product.toString() !== productId
  })

  await cart.save()

  const updatedCart = await Cart.findOne({ user: req.user._id })
    .populate('items.product')

  res.json(updatedCart)
}

export const clear = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })

  if (!cart) {
    return res.json({
      user: req.user._id,
      items: []
    })
  }

  cart.items = []

  await cart.save()

  res.json(cart)
}
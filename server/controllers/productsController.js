import Product from "../models/Product.js"

export const index = async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10

  const skip = (page - 1) * limit

  const total = await Product.countDocuments()

  const products = await Product.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })

  res.json({
    data: products,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  })
}


export const show = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.json(product)
    } catch (error) {
        res.status(400).json({
            message: 'Invalid product ID'
        })
    }
}

export const store = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.json(product)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const destroy = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)

  if (!product) {
    return res.status(404).json({
      message: 'Product not found'
    })
  }

  res.json({
    message: 'Product deleted successfully'
  })
}
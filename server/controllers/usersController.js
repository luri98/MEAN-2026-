import bcrypt from "bcryptjs"
import User from "../models/User.js"

export const index = async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1)
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100)
  const skip = (page - 1) * limit

  const total = await User.countDocuments()

  const users = await User.find()
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)

  res.json({
    data: users,
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
  try {
    const user = await User.findById(req.params.id).select('-password')

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    res.json(user)

  } catch (error) {
    res.status(400).json({
      message: 'Invalid user ID'
    })
  }
}

export const store = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    })

    const { password: _, ...userWithoutPassword } = user.toObject()

    res.status(201).json(userWithoutPassword)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    res.json(user)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export const destroy = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    res.json({
      message: 'User deleted successfully'
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}
import Category from "../models/Category.js"
import Product from "../models/Product.js"

export const index = async (req, res) => {
    const categories = await Category.find()
    res.json(categories)
}


export const show = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            })
        }

        res.json(category)
    } catch (error) {
        res.status(400).json({
            message: 'Invalid category ID'
        })
    }
}

export const store = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        res.status(201).json(category)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const update = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )

        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            })
        }

        res.json(category)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const destroy = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id)

  if (!category) {
    return res.status(404).json({
      message: 'Category not found'
    })
  }

  await Product.deleteMany({
    category: req.params.id
  })

  res.json({
    message: 'Category and related products deleted successfully'
  })
}

// export const destroy = async (req, res) => {
//     const productsCount = await Product.countDocuments({
//         category: req.params.id
//     })

//     if (productsCount > 0) {
//         return res.status(400).json({
//             message: 'Cannot delete category because it has products'
//         })
//     }

//     const category = await Category.findByIdAndDelete(req.params.id)

//     if (!category) {
//         return res.status(404).json({
//             message: 'Category not found'
//         })
//     }

//     res.json({
//         message: 'Category deleted successfully'
//     })
// }
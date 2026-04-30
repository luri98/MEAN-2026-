import Product from '../models/Product.js'
import Category from '../models/Category.js'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

export const dbSeed = async () => {
  await Product.deleteMany()

  const users = [
    {
      name: 'Admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('password', 10),
      role: 'admin',
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: await bcrypt.hash('password', 10),
      role: 'user',
    },
    {
      name: 'Ana Smith',
      email: 'ana@example.com',
      password: await bcrypt.hash('password', 10)
    },
  ]

  for (const user of users)
    await User.findOneAndUpdate({ email: user.email }, user, { upsert: true })

  const categories = [
    {
      name: 'Protein',
      description: 'Supplements to support muscle growth and recovery' 
    },
    {
      name: 'Kreatin',
      description: 'Supplements to enhance strength and performance'
    },
    {
      name: 'Pre Workout',
      description: 'Supplements to boost energy and focus before workouts'
    }
  ]

  const categoryDocs = []
  for (const category of categories){
    const doc = await Category.findOneAndUpdate({ name: category.name }, category, { upsert: true, returnDocument: 'after' })
    categoryDocs[doc.name] = doc.id
  }

  const products = [
    {
      name: 'Whey Protein Vanilla 1kg',
      description: 'High-quality whey protein with vanilla flavor',
      price: 29.99,
      stock: 50,
      image: '',
      category: categoryDocs['Protein'],
      isActive: true
    },
    {
      name: 'Whey Protein Chocolate 1kg',
      description: 'Chocolate flavored whey protein',
      price: 31.99,
      stock: 45,
      image: '',
      category: categoryDocs['Protein'],
      isActive: true
    },
    {
      name: 'Whey Protein Strawberry 1kg',
      description: 'Strawberry flavored whey protein',
      price: 30.99,
      stock: 40,
      image: '',
      category: categoryDocs['Protein'],
      isActive: true
    },
    {
      name: 'Isolate Protein Vanilla 900g',
      description: 'Fast absorbing whey isolate protein',
      price: 39.99,
      stock: 35,
      image: '',
      category: categoryDocs['Protein'],
      isActive: true
    },
    {
      name: 'Isolate Protein Chocolate 900g',
      description: 'Chocolate whey isolate protein',
      price: 41.99,
      stock: 30,
      image: '',
      category: categoryDocs['Protein'],
      isActive: true
    },
    {
      name: 'Mass Gainer Vanilla 3kg',
      description: 'High calorie mass gainer for muscle growth',
      price: 49.99,
      stock: 25,
      image: '',
      category: categoryDocs['Protein'],
      isActive: true
    },
    {
      name: 'Mass Gainer Chocolate 3kg',
      description: 'Chocolate mass gainer supplement',
      price: 51.99,
      stock: 22,
      image: '',
      category: categoryDocs['Protein'],
      isActive: true
    },
    {
      name: 'Casein Protein 1kg',
      description: 'Slow digesting night protein',
      price: 34.99,
      stock: 28,
      image: '',
      category: categoryDocs['Protein'],
      isActive: true
    },
    {
      name: 'Vegan Protein 750g',
      description: 'Plant-based protein powder',
      price: 32.99,
      stock: 33,
      image: '',
      category: categoryDocs['Protein'],
      isActive: true
    },
    {
      name: 'Protein Bar Chocolate',
      description: 'Protein snack bar with chocolate flavor',
      price: 2.99,
      stock: 100,
      image: '',
      category: categoryDocs['Protein'],
      isActive: true
    },
    {
      name: 'Creatine Monohydrate 300g',
      description: 'Pure creatine monohydrate powder',
      price: 19.99,
      stock: 60,
      image: '',
      category: categoryDocs['Kreatin'],
      isActive: true
    },
    {
      name: 'Creatine Monohydrate 500g',
      description: 'Pure creatine monohydrate powder 500g',
      price: 27.99,
      stock: 55,
      image: '',
      category: categoryDocs['Kreatin'],
      isActive: true
    },
    {
      name: 'Micronized Creatine 300g',
      description: 'Micronized creatine for better mixing',
      price: 24.99,
      stock: 48,
      image: '',
      category: categoryDocs['Kreatin'],
      isActive: true
    },
    {
      name: 'Creatine Capsules 120 caps',
      description: 'Creatine in capsule form',
      price: 21.99,
      stock: 42,
      image: '',
      category: categoryDocs['Kreatin'],
      isActive: true
    },
    {
      name: 'Creatine HCL 250g',
      description: 'Creatine hydrochloride supplement',
      price: 29.99,
      stock: 36,
      image: '',
      category: categoryDocs['Kreatin'],
      isActive: true
    },
    {
      name: 'Creatine Blend 400g',
      description: 'Advanced creatine formula blend',
      price: 34.99,
      stock: 32,
      image: '',
      category: categoryDocs['Kreatin'],
      isActive: true
    },
    {
      name: 'Creatine Lemon Flavor 300g',
      description: 'Flavored creatine powder',
      price: 22.99,
      stock: 44,
      image: '',
      category: categoryDocs['Kreatin'],
      isActive: true
    },
    {
      name: 'Creatine Orange Flavor 300g',
      description: 'Orange flavored creatine powder',
      price: 22.99,
      stock: 41,
      image: '',
      category: categoryDocs['Kreatin'],
      isActive: true
    },
    {
      name: 'Pre Workout Creatine Mix',
      description: 'Pre workout formula with creatine',
      price: 37.99,
      stock: 29,
      image: '',
      category: categoryDocs['Kreatin'],
      isActive: true
    },
    {
      name: 'Creatine Starter Pack',
      description: 'Beginner creatine supplement pack',
      price: 44.99,
      stock: 20,
      image: '',
      category: categoryDocs['Kreatin'],
      isActive: true
    }
  ]

  await Product.insertMany(products)

  return { number_of_users: users.length, number_of_categories: categories.length, number_of_products: products.length }
}
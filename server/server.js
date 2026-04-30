import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import routes from './routes/index.js'
import { dbSeed } from './seeders/globalSeeder.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

await connectDB()
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})

// DB Seeder //////////////////////////////////////////////
// try {
//   const { number_of_users, number_of_categories, number_of_products } = await dbSeed()
//   console.log(`${number_of_users} user${number_of_users !== 1 ? 's' : ''} seeded successfully`)
//   console.log(`${number_of_categories} category${number_of_categories !== 1 ? 'ies' : ''} seeded successfully`)
//   console.log(`${number_of_products} product${number_of_products !== 1 ? 's' : ''} seeded successfully`)
// } catch (error) {
//   console.error('Error seeding database:', error)
// }
/////////////////////////////////////////////////////////////////

app.use('/api', routes)

app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`
  })
})

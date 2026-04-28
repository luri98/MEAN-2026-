import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import routes from './routes/index.js'
import { seedProducts } from './seeders/productsSeeder.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

await connectDB()
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})

// Products Seeder //////////////////////////////////////////////
// try {
//     const count = await seedProducts()
//     console.log(`${count} products seeded successfully`)
// } catch (error) {
//     console.error('Error seeding products:', error)
// }
/////////////////////////////////////////////////////////////////

app.use('/api', routes)

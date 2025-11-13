import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import itemRoutes from './routes/item.routes.js'

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/items', itemRoutes)

app.get('/', (req, res) => res.send('Backend Running'))

app.listen(process.env.PORT, () => {
  console.log('Server running on port', process.env.PORT)
})

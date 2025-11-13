// import express from 'express'
// import dotenv from 'dotenv'
// import cors from 'cors'
// import { connectDB } from './config/db.js'
// import authRoutes from './routes/auth.routes.js'
// import itemRoutes from './routes/item.routes.js'

// dotenv.config()
// connectDB()

// const app = express()
// app.use(cors())
// app.use(express.json())

// app.use('/auth', authRoutes)
// app.use('/items', itemRoutes)

// app.get('/', (req, res) => res.send('Backend Running'))

// app.listen(process.env.PORT, () => {
//   console.log('Server running on port', process.env.PORT)
// })

import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import itemRoutes from './routes/item.routes.js'

dotenv.config()
connectDB()

const app = express()

const allowedOrigins = [
  'http://localhost:3000',
  'https://role-based-rjtech.vercel.app',
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      } else {
        return callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://role-based-rjtech.vercel.app'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

// -----------------------------------------

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/items', itemRoutes)

app.get('/', (req, res) => res.send('Backend Running'))

app.listen(process.env.PORT, () => {
  console.log('Server running on port', process.env.PORT)
})

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PORT } from './config/constants'
import authRoutes from './routes/auth'
import residentRoutes from './routes/residents'
import giftCardRoutes from './routes/giftCards'
import redeemRoutes from './routes/redeem'

dotenv.config()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/residents', residentRoutes)
app.use('/residents', redeemRoutes)
app.use('/gift-cards', giftCardRoutes)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`CasaPerks API running on port ${PORT}`)
})

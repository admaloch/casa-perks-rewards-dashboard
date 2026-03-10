import { Router } from 'express'
import { authenticateToken } from '../middleware/auth'
import rateLimiter from '../middleware/rateLimiter'
import { redeem } from '../controllers/redeemController'

const router = Router()

router.post('/:id/redeem', authenticateToken, rateLimiter, redeem)

export default router

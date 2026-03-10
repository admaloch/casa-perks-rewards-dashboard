import { Router } from 'express'
import { authenticateToken } from '../middleware/auth'
import { getAll } from '../controllers/giftCardsController'

const router = Router()

router.use(authenticateToken)

router.get('/', getAll)

export default router

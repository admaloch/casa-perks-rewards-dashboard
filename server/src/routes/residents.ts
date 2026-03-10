import { Router } from 'express'
import { authenticateToken } from '../middleware/auth'
import { getAll, getById, getTransactions } from '../controllers/residentsController'

const router = Router()

router.use(authenticateToken)

router.get('/', getAll)
router.get('/:id', getById)
router.get('/:id/transactions', getTransactions)

export default router

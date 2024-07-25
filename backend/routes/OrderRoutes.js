import express from 'express'
import { placeOrder, viewOrder } from '../controllers/OrderController.js'
import { verifyToken } from '../authMiddleware/verifyToken.js'

const router = express.Router()

router.get('/view', verifyToken, viewOrder)
router.post('/place', verifyToken, placeOrder)

export default router
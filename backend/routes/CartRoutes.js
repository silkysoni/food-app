import express from 'express'
import { addToCart, deleteItemFromCart, getCartItems } from '../controllers/CartController.js'
import { verifyToken } from '../authMiddleware/verifyToken.js'

const router = express.Router()
router.get('/display', verifyToken, getCartItems)
router.post('/add', verifyToken, addToCart)
router.delete('/delete/:id', verifyToken, deleteItemFromCart)

export default router
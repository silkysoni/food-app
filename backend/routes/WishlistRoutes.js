import express from 'express'
import { addItemToWishlist, getWishlist, removeItemFromWishlist } from '../controllers/WishlistController.js'
import { verifyToken } from '../authMiddleware/verifyToken.js'

const router = express.Router()

router.get('/', verifyToken, getWishlist)
router.post('/add', verifyToken, addItemToWishlist)
router.delete('/remove/:id', verifyToken, removeItemFromWishlist)

export default router 
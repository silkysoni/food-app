import express from 'express'
import { Register, Login, getUser, updateUser, updateUserPassword } from '../controllers/UserController.js'
import { verifyToken } from '../authMiddleware/verifyToken.js'

const router = express.Router()
router.get('/details', verifyToken, getUser)
router.post('/register', Register)
router.post('/login', Login)
router.patch('/update', verifyToken, updateUser)
router.patch('/update-password', verifyToken, updateUserPassword)


export default router
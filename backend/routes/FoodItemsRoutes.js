import express from 'express'
import { displayFoodItems } from '../controllers/FoodItemsController.js'

const router = express.Router()

router.get('/', displayFoodItems)

export default router
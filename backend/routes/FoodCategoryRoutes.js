import { displayFoodCategory } from "../controllers/FoodCategoryController.js";
import express from 'express'

const router = express.Router()

router.get('/', displayFoodCategory)

export default router
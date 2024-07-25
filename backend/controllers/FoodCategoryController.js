import FoodCategory from "../models/FoodCategoryModel.js";

export const displayFoodCategory = async (req, res) => {
    try {
        const items = await FoodCategory.find()
        if (items.length > 0) {
            res.status(200).json(items)
        }
        else {
            res.status(400).json({ message: "No category!" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
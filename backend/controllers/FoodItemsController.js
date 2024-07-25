import FoodItems from "../models/FoodItemsModel.js"

export const displayFoodItems = async (req, res) => {
    try {
        const items = await FoodItems.find()
        if (items.length > 0) {
            res.status(200).json(items)
        }
        else {
            res.status(400).json({ message: "No items!" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
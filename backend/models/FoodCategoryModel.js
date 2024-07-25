import mongoose from "mongoose";

const FoodCategorySchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: true
    }
})

const FoodCategory = mongoose.model('food_category', FoodCategorySchema)
export default FoodCategory
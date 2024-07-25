import mongoose from "mongoose";
import { Schema } from "mongoose";
import FoodItems from "./FoodItemsModel.js";

const WishlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'food_items'
        },

    }],
})
const Wishlist = mongoose.model('wishlist', WishlistSchema)
export default Wishlist
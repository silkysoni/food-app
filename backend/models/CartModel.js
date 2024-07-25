import mongoose from "mongoose";
import { Schema } from "mongoose";
import FoodItems from "./FoodItemsModel.js";

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [{
        _id: false,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'food_items'
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
},
    { timestamps: true })
const Cart = mongoose.model('cart', CartSchema)
export default Cart
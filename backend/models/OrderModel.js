import mongoose from "mongoose";
import FoodItems from "./FoodItemsModel.js";
import { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'food_items',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        }
    }, { timestamps: true }],
})

const Order = mongoose.model('order', orderSchema)
export default Order
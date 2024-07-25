import express from 'express'
import mongoose from 'mongoose';
import UserRoutes from './routes/UserRoutes.js'
import cors from 'cors'
import FoodItemsRoute from './routes/FoodItemsRoutes.js'
import FoodCategoryRoute from './routes/FoodCategoryRoutes.js'
import CartRoute from './routes/CartRoutes.js'
import OrderRoute from './routes/OrderRoutes.js'
import WishlistRoute from './routes/WishlistRoutes.js'
import dotenv from 'dotenv'

dotenv.config();
const app = express()
app.use(express.json())
app.use(cors())
app.use('/user', UserRoutes)
app.use('/fooditems', FoodItemsRoute)
app.use('/foodcategory', FoodCategoryRoute)
app.use('/cart', CartRoute)
app.use('/order', OrderRoute)
app.use('/wishlist', WishlistRoute)


const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
connection()

app.listen(5000, () => {
    console.log("port 5000");
})
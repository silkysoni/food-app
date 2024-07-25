import Cart from "../models/CartModel.js";
import FoodItems from "../models/FoodItemsModel.js";
import Wishlist from "../models/WishlistModel.js";

export const getCartItems = async (req, res) => {
    try {
        const userId = req.user.userId;
        const cartItems = await Cart.findOne({ userId }).populate('items.id').exec()
        if (cartItems) {
            res.status(200).json(cartItems)
        }
        else {
            res.status(400).json("No cart Items")
        }
    } catch (error) {

    }
}

export const addToCart = async (req, res) => {
    const { id, quantity } = req.body;
    const userId = req.user.userId;

    try {
        let userExist = await Cart.findOne({ userId })
        if (!userExist) {
            let cart = new Cart({
                userId: userId,
                items: [{ id, quantity }]
            });
            const savedCart = await cart.save();
            const populatedCart = await savedCart.populate('items.id');
            return res.status(200).json(populatedCart);
        } else {
            userExist.items = userExist.items.filter(item => item !== null);
            const existingProduct = userExist.items.find(p => p.id.toString() === id.toString());
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                userExist.items.push({ id, quantity });
            }

            const updatedCart = await userExist.save();
            const populatedCart = await updatedCart.populate('items.id');
            res.status(200).json(populatedCart);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
};

export const deleteItemFromCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const id = req.params.id
        const userCart = await Cart.findOne({ userId })
        userCart.items = userCart.items.filter(item => item.id.toString() !== id);

        const updatedCart = await userCart.save();

        res.status(200).json(updatedCart);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}
import Wishlist from "../models/WishlistModel.js";
import FoodItems from "../models/FoodItemsModel.js";

export const getWishlist = async (req, res) => {
    try {
        const userId = req.user.userId
        const wishlist = await Wishlist.findOne({ userId }).populate('items.id')
        if (wishlist) {
            res.status(200).json(wishlist)
        }
        else {
            res.status(404).json("Empty Wishlist!")
        }

    } catch (error) {
        console.log("error ", error);
    }
}

export const addItemToWishlist = async (req, res) => {
    try {

        const id = req.body.id
        const userId = req.user.userId
        const userExist = await Wishlist.findOne({ userId })
        if (!userExist) {
            let wishlist = new Wishlist({
                userId: userId,
                items: [{ id }]
            });
            const savedWishlist = await wishlist.save();
            const populatedWishlist = await savedWishlist.populate('items.id');
            return res.status(200).json(populatedWishlist);
        }
        else {
            userExist.items.push({ id });
            await userExist.save();
            const populatedWishlist = await Wishlist.findById(userExist._id).populate('items');
            return res.status(200).json(populatedWishlist);
        }
    } catch (error) {
        res.send(error.message)
    }
}

export const removeItemFromWishlist = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.userId
        const wishlist = await Wishlist.findOne({ userId })
        wishlist.items = wishlist.items.filter(item => item.id.toString() !== id);
        const updatedWishlist = await wishlist.save();
        res.status(200).json(updatedWishlist);
    } catch (error) {
        console.log("error in removing from wishlist ", error);
        res.status(500).json(error.message)
    }
}

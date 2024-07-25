import Cart from "../models/CartModel.js";
import Order from "../models/OrderModel.js";

export const viewOrder = async (req, res) => {
    try {
        const userId = req.user.userId
        const orders = await Order.findOne({ userId }).populate('items.id')
        if (orders) {
            orders.items.sort((a, b) => b.date - a.date);
            res.status(200).json(orders)
        }
        else {
            res.status(400).json("No orders!")
        }
    } catch (error) {
        console.log(error);
    }
}

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.userId
        const items = req.body.items
        const userOrderExist = await Order.findOne({ userId })
        if (!userOrderExist) {
            let order = new Order({
                userId: userId,
                items: items
            })
            const savedOrder = await order.save();
            const populatedOrder = await savedOrder.populate('items.id');
            res.status(200).json(populatedOrder);
        }
        else {
            items.forEach(item => {
                userOrderExist.items.push(item);
            });
            const updatedOrder = await userOrderExist.save();
            const populatedOrder = await updatedOrder.populate('items.id');
            res.status(200).json(populatedOrder);
        }
        const userCart = await Cart.deleteOne({ userId })
    } catch (error) {
        console.log(error);
    }
}
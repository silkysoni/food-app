import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { showToast } from "./toastSlice";

const initialState = {
    cart: [],
    totalPrice: 0,
    status: 'idle'
}

function fetchCart() {
    const AuthStr = localStorage.getItem("jwtToken");
    if (AuthStr) {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:5000/cart/display', { headers: { 'Authorization': `Bearer ${AuthStr}` } })
                .then((response) => {
                    resolve(response.data.items);
                }).catch((error) => {
                    reject(error);
                })
        })
    }
}

export const fetchCartAsync = createAsyncThunk(
    'cart/fetchCart',
    async (_, thunkAPI) => {
        try {
            const response = await fetchCart();
            thunkAPI.dispatch(setCart(response))
            thunkAPI.dispatch(setTotalPrice())
        } catch (error) {
            console.log("error in fetching cart!", error);
        }

    }
)

function addToCart(items) {
    const AuthStr = localStorage.getItem('jwtToken')

    if (AuthStr) {
        console.log('items', items)
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:5000/cart/add', items, { 'headers': { 'Authorization': `Bearer ${AuthStr}` } })
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    }
}

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (items, thunkAPI) => {
        console.log("items in slice ", items);
        try {
            const response = await addToCart(items)
            thunkAPI.dispatch(addItemToCart(response.data.items))
            thunkAPI.dispatch(showToast({ status: "success", message: "Added to Cart!" }));
        } catch (error) {
            console.log("error in adding to cart! ", error)
            thunkAPI.dispatch(showToast({ status: "error", message: "Unable to add to Cart!" }));
        }
    }
)

function deleteItemInCart(id) {
    const AuthStr = localStorage.getItem('jwtToken')
    if (AuthStr) {
        return new Promise((resolve, reject) => {
            axios.delete(`http://localhost:5000/cart/delete/${id}`, { 'headers': { 'Authorization': `Bearer ${AuthStr}` } })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }
}

export const deleteItemInCartAsync = createAsyncThunk(
    'cart/deleteItemInCart',
    async (id, thunkAPI) => {
        try {
            console.log("id ", id);
            const response = await deleteItemInCart(id);
            thunkAPI.dispatch(removeItemFromCart(id))
            thunkAPI.dispatch(showToast({ status: "success", message: "Removed from Cart!" }));

        } catch (error) {
            console.log("error in deleting item from cart!", error);
            thunkAPI.dispatch(showToast({ status: "error", message: "Unable to remove from Cart!" }));
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
            state.status = "succeed"
        },
        addItemToCart: (state, action) => {
            state.cart = action.payload
        },
        removeItemFromCart: (state, id) => {
            state.cart = state.cart.filter((item) => item.id._id !== id);
        },
        emptyCart: (state) => {
            state.cart = [];
        },
        setTotalPrice: (state) => {
            state.totalPrice = state.cart.reduce((total, food) => total + food.id.price * food.quantity, 0);
        },
        increaseQuantity: (state, action) => {
            let id = action.payload
            state.cart.forEach((foodItem) => {
                if (foodItem.id._id === id) {
                    foodItem.quantity++
                }
            })
            state.totalPrice = state.cart.reduce((total, food) => total + food.id.price * food.quantity, 0)
        },
        decreaseQuantity: (state, action) => {
            let id = action.payload
            state.cart.forEach((foodItem) => {
                if (foodItem.id._id === id) {
                    foodItem.quantity--
                }
            })
            state.totalPrice = state.cart.reduce((total, food) => total + food.id.price * food.quantity, 0)
        }
    },

})

export const { setCart, removeItemFromCart, emptyCart, addItemToCart, setTotalPrice, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
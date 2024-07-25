import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { emptyCart } from "./cartSlice"
import { showToast } from "./toastSlice"

const initialState = {
    orders: [],
    status: 'idle'
}

function fetchOrders() {
    let AuthStr = localStorage.getItem("jwtToken")
    if (AuthStr) {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:5000/order/view', { 'headers': { 'Authorization': `Bearer ${AuthStr}` } })
                .then((response) => {
                    resolve(response.data.items)
                }).catch((error) => {
                    console.log("error in fetching order - ", error);
                    reject(error)
                })
        })
    }
}

export const fetchOrdersAsync = createAsyncThunk(
    'orders/fetchOrders',
    async (_, thunkAPI) => {
        try {
            const response = await fetchOrders();
            thunkAPI.dispatch(setOrders(response))
        } catch (error) {
            console.log("error in fetching order - ", error);
        }
    }
)

function placeOrder(items) {
    const AuthStr = localStorage.getItem("jwtToken")

    if (AuthStr) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:5000/order/place', { items }, { 'headers': { 'Authorization': `Bearer ${AuthStr}` } })
                .then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                })
        })

    }
}

export const placeOrderAsync = createAsyncThunk(
    'orders/placeOrders',
    async (items, thunkAPI) => {
        try {
            const response = await placeOrder(items);
            thunkAPI.dispatch(setOrders(response))
            thunkAPI.dispatch(emptyCart())
            thunkAPI.dispatch(showToast({ status: "success", message: "Order placed!" }));
        } catch (error) {
            console.log("error in placing order!", error);
            thunkAPI.dispatch(showToast({ status: "error", message: "error in placing Order!" }));
        }
    }
)

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload
        }
    }
})

export const { setOrders } = orderSlice.actions;

export const selectOrders = (state) => state.orders.orders;

export default orderSlice.reducer;
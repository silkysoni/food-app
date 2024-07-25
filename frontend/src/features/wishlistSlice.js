import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showToast } from "./toastSlice";

const initialState = {
    wishlistItems: [],
};

const getWishlist = () => {
    const AuthStr = localStorage.getItem('jwtToken')
    if (AuthStr) {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:5000/wishlist', { headers: { 'Authorization': `Bearer ${AuthStr}` } })
                .then((response) => {
                    resolve(response.data.items)
                }).catch((error) => {
                    console.log("error ", error);
                    reject(error)
                })
        })
    }
}

export const getWishlistAsync = createAsyncThunk(
    'wishlistItem/get', async (_, thunkAPI) => {
        try {
            const response = await getWishlist()
            thunkAPI.dispatch(setWishlist(response))
        } catch (error) {
            console.log(error);
            if (error.response.status === 404) {
                thunkAPI.dispatch(setWishlist([]))
            }
        }
    }
)

const addItemToWishlist = (id) => {
    const AuthStr = localStorage.getItem('jwtToken')
    if (AuthStr) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:5000/wishlist/add', { id }, { headers: { 'Authorization': `Bearer ${AuthStr}` } })
                .then((response) => {
                    resolve(response.data.items)
                }).catch((error) => {
                    console.log("error ", error);
                    reject(error)
                })
        })
    }
}

export const addItemToWishlistAsync = createAsyncThunk(
    'wishlistItem/add', async (id, thunkAPI) => {
        try {
            const response = await addItemToWishlist(id)
            thunkAPI.dispatch(addToWishlist(response))
            thunkAPI.dispatch(showToast({ status: "success", message: "Added to Wishlist!" }));
        } catch (error) {
            console.log("Error in adding to wishlist! ", error);
            thunkAPI.dispatch(showToast({ status: "error", message: "Error in adding to wishlist!" }));
        }
    }
)

const removeItemFromWhishlist = (id) => {
    const AuthStr = localStorage.getItem('jwtToken')
    console.log(AuthStr);
    if (AuthStr) {
        return new Promise((resolve, reject) => {
            axios.delete(`http://localhost:5000/wishlist/remove/${id}`, { headers: { 'Authorization': `Bearer ${AuthStr}` } })
                .then((response) => {
                    resolve(response.data.items)
                }).catch((error) => {
                    console.log("error ", error);
                    reject(error)
                })
        })
    }
}
export const removeItemFromWhishlistAsync = createAsyncThunk(
    'wishlistItem/remove', async (id, thunkAPI) => {
        try {
            const response = await removeItemFromWhishlist(id)
            console.log("updated wishlist ", response);
            thunkAPI.dispatch(removeFromWishlist(id))
            thunkAPI.dispatch(getWishlistAsync(response))
            thunkAPI.dispatch(showToast({ status: "success", message: "Removed from Wishlist!" }));
        } catch (error) {
            console.log("Error in removing from wishlist!", error);
            thunkAPI.dispatch(showToast({ status: "error", message: "Error in removing from wishlist!" }));
        }
    }
)

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlist: (state, action) => {
            state.wishlistItems = action.payload
        },
        addToWishlist: (state, action) => {
            state.wishlistItems = action.payload
        },
        removeFromWishlist: (state, id) => {
            state.wishlistItems = state.wishlistItems.filter(item => item.id !== id);
        },
    },
});

export const { setWishlist, addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlistItems = state => state.wishlist.wishlistItems;

export default wishlistSlice.reducer;

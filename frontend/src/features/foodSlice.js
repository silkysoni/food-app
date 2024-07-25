import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showToast } from "./toastSlice";

const initialState = {
    foodItems: [],
    foodCategories: [],
    search: ""
}

const fetchFoodItems = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/fooditems')
            .then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
    })
}

export const fetchFoodItemsAsync = createAsyncThunk('food-items', async (_, thunkAPI) => {
    try {
        const response = await fetchFoodItems()
        thunkAPI.dispatch(setFoodItems(response.data))
    } catch (error) {
        console.log("error in fetching food items ", error);
    }
})

const fetchFoodCategories = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/foodcategory')
            .then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
    })
}

export const fetchFoodCategoriesAsync = createAsyncThunk('food-items', async (_, thunkAPI) => {
    try {
        const response = await fetchFoodCategories()
        thunkAPI.dispatch(setFoodCategories(response.data))
    } catch (error) {
        console.log("error in fetching food category ", error);
    }
})

export const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
        setFoodItems: (state, action) => {
            state.foodItems = action.payload
        },
        setFoodCategories: (state, action) => {
            state.foodCategories = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        }
    }
})

export const { setFoodItems, setFoodCategories, setSearch } = foodSlice.actions;

export const selectFoodItems = (state) => state.food.foodItems;
export const selectFoodCategories = (state) => state.food.foodCategories;
export const selectSearch = (state) => state.food.search;

export default foodSlice.reducer;
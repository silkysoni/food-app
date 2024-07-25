import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'
import cartReducer from '../features/cartSlice'
import orderReducer from '../features/orderSlice'
import toastReducer from '../features/toastSlice'
import wishlistReducer from '../features/wishlistSlice'
import foodRedux from '../features/foodSlice'
import { thunk } from 'redux-thunk';

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        orders: orderReducer,
        toast: toastReducer,
        wishlist: wishlistReducer,
        food: foodRedux
    },
}, applyMiddleware(thunk))
export default store;

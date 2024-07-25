import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    show: false,
    message: "This is a toast message",
    status: ""
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action) => {
            state.show = true;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        hideToast: (state) => {
            state.show = false
        }
    }
})

export const { hideToast, showToast } = toastSlice.actions;

export const selectShow = (state) => state.toast.show;
export const selectMessage = (state) => state.toast.message;
export const selectStatus = (state) => state.toast.status;


export default toastSlice.reducer;
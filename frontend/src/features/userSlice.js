import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showToast } from "./toastSlice";
import { getWishlistAsync } from "./wishlistSlice";

const initialState = {
    loggedIn: false,
    user: {},
    registered: false
}

const register = (formData) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/user/register', formData)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const registerAsync = createAsyncThunk("register", async (formData, thunkAPI) => {
    try {
        const response = await register(formData)
        if (response.status === 201) {
            thunkAPI.dispatch(showToast({ status: "success", message: "Successfully Registered!" }));
            thunkAPI.dispatch(setRegistered(true))
        }
    } catch (error) {
        if (error.response.status === 400) {
            thunkAPI.dispatch(showToast({ status: "error", message: error.response.data }))
        }
        else {
            console.log("error in registering user!", error);
            thunkAPI.dispatch(showToast({ status: "error", message: "Error in registering!" }))
        }
    }
})

const login = (formData) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/user/login', formData)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const loginAsync = createAsyncThunk(
    "login",
    async (formData, thunkAPI) => {
        try {
            const response = await login(formData);
            if (response.status === 200) {
                thunkAPI.dispatch(showToast({ status: "success", message: "Successfully Logged In!" }));
                thunkAPI.dispatch(logIn(response.data.user));
                localStorage.setItem("jwtToken", response.data.access_token)
                thunkAPI.dispatch(getWishlistAsync(response.data.access_token))
            }
            else {
                thunkAPI.dispatch(showToast({ status: "error", message: response.response.data }));
            }
        } catch (error) {
            console.log("error in logging in!", error);
            thunkAPI.dispatch(showToast({ status: "error", message: error.response.data }))
        }
    }
)


const getUserDetails = () => {
    const AuthStr = localStorage.getItem('jwtToken')
    if (AuthStr) {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:5000/user/details', { headers: { 'Authorization': `Bearer ${AuthStr}` } })
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
        })
    }
}

export const getUserDetailsAsync = createAsyncThunk("user", async (_, thunkAPI) => {
    try {
        const response = await getUserDetails()
        thunkAPI.dispatch(setUser(response.data))
        thunkAPI.dispatch(logIn(response.data))
    } catch (error) {
        console.log("error in getting user ", error);
    }
})

const editUserDetails = async (formData) => {
    const AuthStr = localStorage.getItem('jwtToken')
    if (AuthStr) {
        return new Promise((resolve, reject) => {
            axios.patch('http://localhost:5000/user/update', formData, { headers: { 'Authorization': `Bearer ${AuthStr}` } }).
                then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
        })
    }
}

export const editUserDetailsAsync = createAsyncThunk("user/update", async (formData, thunkAPI) => {
    try {
        const response = await editUserDetails(formData)
    } catch (error) {
        console.log("error in updating user's details!", error);
    }
})

const editUserPassword = async (data) => {
    const AuthStr = localStorage.getItem('jwtToken')
    if (AuthStr) {
        return new Promise((resolve, reject) => {
            axios.patch('http://localhost:5000/user/update-password', data, { headers: { 'Authorization': `Bearer ${AuthStr}` } }).
                then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
        })
    }
}

export const editUserPasswordAsync = createAsyncThunk("user/update-password", async (data, thunkAPI) => {
    try {
        console.log(data);
        const response = await editUserPassword(data)
        thunkAPI.dispatch(showToast({ status: "success", message: "Details updated!" }));
    } catch (error) {
        console.log("error in updating password! ", error);
        thunkAPI.dispatch(showToast({ status: "error", message: error.response.data }));
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.loggedIn = true;
            state.user = action.payload
        },
        setUser: (state, action) => {
            console.log("action payload ", action.payload);
            state.user = action.payload
        },
        logOut: (state) => {
            state.loggedIn = false;
            localStorage.removeItem("jwtToken")
        },
        setRegistered: (state) => {
            state.registered = true
        }

    }
})
export const { logIn, logOut, setUser, setRegistered } = userSlice.actions;


export const selectLogIn = (state) => state.user.loggedIn;
export const selectUser = (state) => state.user.user;
export const selectRegistered = (state) => state.user.registered;

export default userSlice.reducer;
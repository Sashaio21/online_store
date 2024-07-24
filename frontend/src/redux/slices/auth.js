import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';


export const fetchUser = createAsyncThunk("/user/fetchUser", async (params)=>{
    const {data} = await axios.post("/auth/login", params);
    return data
});


export const fetchUserMe = createAsyncThunk("/user/fetchUserMe", async ()=>{
    const {data} = await axios.get("/auth/me");
    return data
});


const initialState = {
    userData: {
        user: null,
        status: 'loading'
    }
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logout: (state) => {
            state.userData.user = null
        }
    },
    extraReducers: {
        [fetchUser.pending]: (state) => {
            state.userData.user = null;
            state.userData.status = "loading";  
        },
        [fetchUser.fulfilled]: (state, action)=>{
            state.userData.user = action.payload;
            state.userData.status = "loaded";
        },
        [fetchUserMe.pending]: (state) => {
            state.userData.user = null;
            state.userData.status = "loading";  
        },
        [fetchUserMe.fulfilled]: (state, action)=>{
            state.userData.user = action.payload;
            state.userData.status = "loaded";
        },
    }
});


export const selectAuth = (state)=> (state.auth.userData.user);
export const selectAdmin = (state)=> (state.auth.userData.user);
export const selectUserData = (state)=>(state.auth.userData.user)
export const usersReducer = userSlice.reducer;
export const {logout} = userSlice.actions;
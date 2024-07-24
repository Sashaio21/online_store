import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';


export const fetchOrder = createAsyncThunk("/order/fetchOrder", async (params)=>{
    const {data} = await axios.get("/orders/list");
    return data
});


const initialState = {
    orderData: {
        product: null,
        status: 'loading'
    }
};


const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        logout: (state) => {
            state.orderData.product = null
        }
    },
    extraReducers: {
        [fetchOrder.pending]: (state) => {
            state.orderData.product = null;
            state.orderData.status = "loading";  
        },
        [fetchOrder.fulfilled]: (state, action)=>{
            state.orderData.product = action.payload;
            state.orderData.status = "loaded";
        }
    }
});
 

export const orderResucer = orderSlice.reducer;
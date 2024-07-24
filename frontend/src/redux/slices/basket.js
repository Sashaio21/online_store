import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';


export const fetchBasket = createAsyncThunk("/basket/fetchBasket", async (params)=>{
    const {data} = await axios.get("/basket");
    return data
});


const initialState = {
    basketData: {
        product: null,
        status: 'loading'
    }
};


const basketSlice = createSlice({
    name:'basket',
    initialState,
    reducers:{
        logout: (state) => {
            state.basketData.product = null
        }
    },
    extraReducers: {
        [fetchBasket.pending]: (state) => {
            state.basketData.product = null;
            state.basketData.status = "loading";  
        },
        [fetchBasket.fulfilled]: (state, action)=>{
            state.basketData.product = action.payload;
            state.basketData.status = "loaded";
        }
    }
});
 

export const basketResucer = basketSlice.reducer;
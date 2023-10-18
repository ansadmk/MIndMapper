"use client"
import { createSlice } from "@reduxjs/toolkit";
import { FetchUsers } from "./Axioses";


const slice=createSlice({
    name:"axios",
    initialState:{
        status:"standby",
        userDetails:{}

    },
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(FetchUsers.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(FetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.userDetails = action.payload;
          })
          .addCase(FetchUsers.rejected, (state, action) => {
            state.status = 'failed';
            
          });
      },
})


export const userFetchStatus=(s)=>s.Axios.status
export const getDetails=(s)=>s.Axios.userDetails
export default slice.reducer
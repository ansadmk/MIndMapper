"use client";
import { createSlice } from "@reduxjs/toolkit";
import { getUsersList } from "./AdminAxioses";


const AdminSlice = createSlice({
  name: "AdminAxios",
  initialState: {
    status: "standby",
    userDetails: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsersList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetails = action.payload;
      })
      .addCase(getUsersList.rejected, (state) => {
        state.status = "failed";
      })
      
  },
});
const slice1 = createSlice({
  name: "userModal",
  initialState: {
    
  },
  reducers: {
   
  },
});


export const getUsersForAdmin=(s)=>s.AdminAxios.userDetails
export default AdminSlice.reducer;

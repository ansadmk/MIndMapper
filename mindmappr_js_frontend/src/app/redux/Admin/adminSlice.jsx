"use client";
import { createSlice } from "@reduxjs/toolkit";
import { getUsersList, notify } from "./AdminAxioses";


const AdminSlice = createSlice({
  name: "AdminAxios",
  initialState: {
    status: "standby",
    userDetails: {},
    notiRes:''
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
      .addCase(notify.fulfilled, (state, action) => {
        
        state.notiRes = action.payload;
      })
      
  },
});
const slice1 = createSlice({
  name: "userModal",
  initialState: {
    currentUser:''
  },
  reducers: {
   setCurrentUser:(state,action)=>{state.currentUser=action.payload}
  },
});


export const getUsersForAdmin=(s)=>s.AdminAxios.userDetails
export const notifyForAdmin=(s)=>s.AdminAxios.notiRes
export const currentUser=(s)=>s.adminSlice.currentUser
export const {setCurrentUser}=slice1.actions
export default AdminSlice.reducer;
export const AdminSlice1=slice1.reducer

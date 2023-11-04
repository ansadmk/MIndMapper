"use client"
const { configureStore } = require("@reduxjs/toolkit");
import adminSlice from "./Admin/adminSlice";
import reduce, { Modalslice } from "./slice"
const stores=configureStore({
    reducer:{
        Axios:reduce,
        profileStats:Modalslice,
        AdminAxios:adminSlice
    },
    devTools:true,
    
})

export const store=stores
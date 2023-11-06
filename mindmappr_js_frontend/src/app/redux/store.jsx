"use client"
const { configureStore } = require("@reduxjs/toolkit");
import adminSlice, { AdminSlice1 } from "./Admin/adminSlice";
import reduce, { Modalslice } from "./slice"
const stores=configureStore({
    reducer:{
        Axios:reduce,
        profileStats:Modalslice,
        AdminAxios:adminSlice,
        adminSlice:AdminSlice1
    },
    devTools:true,
    
})

export const store=stores
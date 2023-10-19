"use client"
const { configureStore } = require("@reduxjs/toolkit");

import reduce, { Modalslice } from "./slice"
const stores=configureStore({
    reducer:{
        Axios:reduce,
        profileStats:Modalslice
    },
    devTools:true,
    
})

export const store=stores
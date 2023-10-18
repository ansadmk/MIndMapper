"use client"
const { configureStore } = require("@reduxjs/toolkit");

import reduce, { getDetails } from "./slice"
const stores=configureStore({
    reducer:{
        Axios:reduce
    },
    devTools:true,
    // middleware:(get)=>get({
    //     serializableCheck:false
    // })
  
})

export const store=stores
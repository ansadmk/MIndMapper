"use client"
const { configureStore } = require("@reduxjs/toolkit");
import { createWrapper } from "next-redux-wrapper";
import reduce from "./slice"
const stores=configureStore({
    reducer:{
        Axios:reduce
    },
    devTools:true

})
export const store=stores
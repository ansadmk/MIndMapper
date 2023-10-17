"use client"
const { createSlice,useDispatch } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
const { getCookie } = require("cookies-next");
const cookie=getCookie('token')
const slice=createSlice({
    name:"axios",
    initialState:{
        userDetails:{}
    },
    reducers:{
        getDetails:async (state,action)=>{
            const res=await axios.get("http://127.0.0.1:4000/api/user/userdetails",{
                headers:{
                  Authorization:`Bearer ${cookie}`
                }})
            state.userDetails=res.data    
        }
    }
})
const dispatch=useDispatch()
dispatch(getDetails())
export const {getDetails}=slice.actions
export default slice.reducer
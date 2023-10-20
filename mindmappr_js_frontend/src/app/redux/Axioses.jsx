
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "cookies-next";
const cookie=getCookie('token')
export const FetchUsers = createAsyncThunk(
    'redux/fetchUsers',
    async () => {
        const res=await axios.get("http://127.0.0.1:4000/api/user/userdetails",{
            headers:{
              Authorization:`Bearer ${cookie}`
            }})
            return res.data
    }
  );
  export const createPageResponse = createAsyncThunk(
    'redux/create',
    async (data) => {
      const {parent,role,content}=data
        const res=await axios.post("http://127.0.0.1:4000/api/user/createPage",{
            parent:parent,
            role:role,
            content:content
          
        },{
            headers:{
              Authorization:`Bearer ${cookie}`
            }})
            return res.data
    }
  );
  export const FetchPages = createAsyncThunk(
    'redux/fetchpages',
    async () => {
        const res=await axios.get("http://127.0.0.1:4000/api/user/userdetails",{
            headers:{
              Authorization:`Bearer ${cookie}`
            }})
            return res.data
    }
  );
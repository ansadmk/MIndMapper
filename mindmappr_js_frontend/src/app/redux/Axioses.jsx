
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "cookies-next";
const cookie=getCookie('token')
export const FetchUsers = createAsyncThunk(
    'redux/fetchRockets',
    async () => {
        const res=await axios.get("http://127.0.0.1:4000/api/user/userdetails",{
            headers:{
              Authorization:`Bearer ${cookie}`
            }})
            return res.data
    }
  );
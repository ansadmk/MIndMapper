import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "cookies-next";


const cookie = getCookie("adminToken");
console.log(cookie);
export const getUsersList = createAsyncThunk("redux/getUsersList", async () => {
  const res = await axios.get("http://127.0.0.1:4000/api/admin/getUserList", {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return res.data;
});
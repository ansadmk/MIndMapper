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
export const notify = createAsyncThunk("redux/notify", async ({msg,sub,type,to}) => {
  const res = await axios.post("http://127.0.0.1:4000/api/admin/notify",{msg,sub,type,to}, {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return res.data;
});
export const getnotify = createAsyncThunk("redux/getnotify", async () => {
  const res = await axios.get("http://127.0.0.1:4000/api/admin/getNoti",{
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return res.data;
});
export const deletenotify = createAsyncThunk("redux/deletenotify", async (id) => {
  const res = await axios.delete(`http://127.0.0.1:4000/api/admin/deleteNoti/${id}`,{
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return res.data;
});
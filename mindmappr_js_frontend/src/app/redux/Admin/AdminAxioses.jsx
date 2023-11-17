import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance, axiosInstanceAdmin } from "../axiosInstance";







export const getUsersList = createAsyncThunk("redux/getUsersList", async () => {
  const res = await axiosInstanceAdmin.get("/api/admin/getUserList");
  return res.data;
});
export const notify = createAsyncThunk("redux/notify", async ({msg,sub,type,to}) => {
  const res = await axiosInstanceAdmin.post("/api/admin/notify",{msg,sub,type,to});
  return res.data;
});
export const getnotify = createAsyncThunk("redux/getnotify", async () => {
  const res = await axiosInstanceAdmin.get("/api/admin/getNoti");
  return res.data;
});
export const deletenotify = createAsyncThunk("redux/deletenotify", async (id) => {
  const res = await axiosInstanceAdmin.delete(`/api/admin/deleteNoti/${id}`);
  return res.data;
});
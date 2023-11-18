import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "cookies-next";
import { axiosInstance } from "./axiosInstance";

export const FetchUsers = createAsyncThunk("redux/fetchUsers", async () => {
  const res = await axiosInstance.get("/api/user/userdetails");
  return res.data;
});
export const createPageResponse = createAsyncThunk(
  "redux/create",
  async (data) => {
    const resp = await axiosInstance.post("/api/user/createPage", data);
    return resp.data;
  }
);
export const FetchPages = createAsyncThunk("redux/fetchpages", async () => {
  const respo = await axiosInstance.get("/api/user/getPages");
  return respo.data;
});
export const FetchSpecificPage = createAsyncThunk(
  "redux/fetchspecpages",
  async (id) => {
    console.log(id);
    const respo = await axiosInstance.get(`/api/user/getPages/${id}`);
    return respo.data;
  }
);

export const setprofile = createAsyncThunk(
  "redux/setprofile",
  async ({ url, name, pageid, content, prev, sub, test }) => {
    console.log(test);
    const response = await axiosInstance.patch("/api/user/setprofile", {
      Image: url,
      name: name,
      pageId: pageid,
      content: content,
      prev: prev,
      sub: sub,
      test: test,
    });
    return response;
  }
);
export const deletePage = createAsyncThunk(
  "redux/deletePage",
  async ({ pageid, content }) => {
    const response = await axiosInstance.delete(
      `/api/user/deletepage/${pageid}/${content}`
    );
    return response;
  }
);
export const sendUrl = createAsyncThunk(
  "redux/coverandAvatar",
  async ({ avatarUrl, coverUrl, pageId }) => {
    const response = await axiosInstance.put(`/api/user/coveravatar`, {
      avatarUrl: avatarUrl,
      coverUrl: coverUrl,
      pageId: pageId,
    });
    return response;
  }
);
export const getNoti = createAsyncThunk("redux/getNoti", async () => {
  const respo = await axiosInstance.get("/api/user/getUsersNoti");
  return respo.data;
});
export const getAllPages = createAsyncThunk("redux/getAllPages", async (data) => {
  const respo = await axiosInstance.get("/api/user/getAllPages",data);
  return respo.data;
});
export const setPublic = createAsyncThunk(
  "redux/setPublic",
  async ({ id, unpub }) => {
    console.log(id, unpub);
    const respo = await axiosInstance.put("/api/user/setPublic", { id, unpub });
    return respo.data;
  }
);
export const getAllPagesPublic = createAsyncThunk(
  "redux/getAllPagesPublic",
  async () => {
    const respo = await axiosInstance.get("/api/user/getAllPagesPublic");
    return respo.data;
  }
);

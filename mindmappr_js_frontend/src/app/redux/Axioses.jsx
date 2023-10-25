import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "cookies-next";


const cookie = getCookie("token");
export const FetchUsers = createAsyncThunk("redux/fetchUsers", async () => {
  const res = await axios.get("http://127.0.0.1:4000/api/user/userdetails", {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return res.data;
});
export const createPageResponse = createAsyncThunk(
  "redux/create",
  async (data) => {
    const { parent, role, content } = data;
    const resp = await axios.post(
      "http://127.0.0.1:4000/api/user/createPage",
      {
        parent: parent,
        role: role,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      }
    );
    return resp.data;
  }
);
export const FetchPages = createAsyncThunk("redux/fetchpages", async () => {
  const respo = await axios.get("http://127.0.0.1:4000/api/user/getPages", {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return respo.data;
});
export const cloudinary = createAsyncThunk("redux/cloudinary", async (data) => {
  
  const respon = await axios.post(
    "https://api.cloudinary.com/v1_1/duamefd9c/upload",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return respon
});
export const setprofile = createAsyncThunk("redux/setprofile", async ({url,name,pageid,content}) => {
  console.log(url);
  const response = await axios.patch(
    "http://127.0.0.1:4000/api/user/setprofile",
    {
      Image:url,
      name:name,
      pageId:pageid,
      content:content
    },
    {
      headers: {
        Authorization: `Bearer ${cookie}`
      },
    }
  );
  return response
});

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
export const FetchSpecificPage = createAsyncThunk("redux/fetchspecpages", async (id) => {
  console.log(id);
  const respo = await axios.get(`http://127.0.0.1:4000/api/user/getPages/${id}`, {
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
export const setprofile = createAsyncThunk("redux/setprofile", async ({url,name,pageid,content,prev,sub,test}) => {
  console.log(test)
  const response = await axios.patch(
    "http://127.0.0.1:4000/api/user/setprofile",
    {
      Image:url,
      name:name,
      pageId:pageid,
      content:content,
      prev:prev,
      sub:sub,
      test:test

    },
    {
      headers: {
        Authorization: `Bearer ${cookie}`
      },
    }
  );
  return response
});
export const deletePage = createAsyncThunk("redux/deletePage", async ({pageid,content}) => {
 
  const response = await axios.delete(
    `http://127.0.0.1:4000/api/user/deletepage/${pageid}/${content}`,
    {
      headers: {
        Authorization: `Bearer ${cookie}`
      },
    }
  );
  return response
});
export const sendUrl = createAsyncThunk("redux/coverandAvatar", async ({avatarUrl,coverUrl,pageId}) => {
 
  const response = await axios.put(
    `http://127.0.0.1:4000/api/user/coveravatar`,
    {
      avatarUrl:avatarUrl,
      coverUrl:coverUrl,
      pageId:pageId
    },
    {
      headers: {
        Authorization: `Bearer ${cookie}`
      },
    }
  );
  return response
});
export const getNoti = createAsyncThunk("redux/getNoti", async () => {
  const respo = await axios.get("http://127.0.0.1:4000/api/user/getUsersNoti", {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return respo.data;
});
export const getAllPages = createAsyncThunk("redux/getAllPages", async () => {
  const respo = await axios.get("http://127.0.0.1:4000/api/user/getAllPages", {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return respo.data;
});
export const setPublic = createAsyncThunk("redux/setPublic", async ({id,unpub}) => {
  console.log(id,unpub);
  const respo = await axios.put("http://127.0.0.1:4000/api/user/setPublic",{id,unpub} ,{
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return respo.data;
});
export const getAllPagesPublic = createAsyncThunk("redux/getAllPagesPublic", async () => {
  const respo = await axios.get("http://127.0.0.1:4000/api/user/getAllPagesPublic");
  return respo.data;
});

"use client";
import { createSlice } from "@reduxjs/toolkit";
import {
  FetchUsers,
  createPageResponse,
  FetchPages,
  cloudinary,
  setprofile,
  deletePage,
  sendUrl,
} from "./Axioses";


const slice = createSlice({
  name: "axios",
  initialState: {
    status: "standby",
    userDetails: {},
    createPageStatus: "standby",
    createPageRes: {},
    FetchPageStatus: "standby",
    FetchPageres: {},
    cloudstatus: "standby",
    cloudResponse: "",
    setProfile: "",
    deletePagestatus: "",
    uploadurlstatus: "",
    uploadurl: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetails = action.payload;
      })
      .addCase(FetchUsers.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createPageResponse.pending, (state) => {
        state.createPageStatus = "loading";
      })
      .addCase(createPageResponse.fulfilled, (state, action) => {
        state.createPageStatus = "succeeded";
        state.createPageRes = action.payload;
      })
      .addCase(createPageResponse.rejected, (state) => {
        state.createPageStatus = "failed";
      })
      .addCase(FetchPages.pending, (state) => {
        state.FetchPageStatus = "loading";
      })
      .addCase(FetchPages.fulfilled, (state, action) => {
        state.FetchPageStatus = "succeeded";
        state.FetchPageres = action.payload;
      })
      .addCase(FetchPages.rejected, (state) => {
        state.FetchPageStatus = "failed";
      })
      .addCase(cloudinary.pending, (state) => {
        state.cloudstatus = "loading";
      })
      .addCase(cloudinary.fulfilled, (state, action) => {
        state.cloudstatus = "succeeded";
        state.cloudResponse = action.payload;
      })
      .addCase(cloudinary.rejected, (state) => {
        state.cloudstatus = "failed";
      })
      .addCase(setprofile.fulfilled, (state, action) => {
        state.setProfile = action.payload;
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        state.deletePagestatus = action.payload;
      })
      .addCase(sendUrl.pending, (state) => {
        state.uploadurlstatus = "loading";
      })
      .addCase(sendUrl.fulfilled, (state, action) => {
        state.uploadurlstatus = "succeeded";
        state.uploadurl = action.payload;
      })
      .addCase(sendUrl.rejected, (state) => {
        state.uploadurlstatus = "failed";
      });
  },
});
const slice1 = createSlice({
  name: "userModal",
  initialState: {
    profileStats: false,
    showPageForm: false,
    mainPageListRender: false,
    offset: true,
    currentPage: "",
    editable: false,
    subpagerender: false,
    breadCrumb: [],
    setCoverAndAvatarForPages: false,
    uploadcover: {avatar:false,cover:false},
  },
  reducers: {
    changeProfileStats: (state) => {
      state.profileStats = !state.profileStats;
    },
    changeShowPageForm: (state, action) => {
      state.showPageForm = action.payload;
    },
    changeMainPageListRender: (state) => {
      state.mainPageListRender = !state.mainPageListRender;
    },
    changeOffset: (state) => {
      state.offset = !state.offset;
    },
    changeCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    changeEditable: (state, action) => {
          
      if (action.payload == "false") {
        state.editable = false;
      } else if (action.payload == "true") {
        state.editable = true;
      } else {
        state.editable = !state.editable;
      }
    },
    changesubpageRender: (state, action) => {
      if (action.payload == "false") {
        state.subpagerender = false;
      } else if (action.payload == "true") {
        state.subpagerender = true;
      } else {
        state.subpagerender = !state.subpagerender;
      }
    },
    changeBreadCrumb: (state, action) => {
      const { data, type } = action.payload;
      if (type == "push") {
        state.breadCrumb.push(data);
      } else if (type == "clear") {
        state.breadCrumb = [];
      } else if (type == "select") {
        state.breadCrumb.splice(data + 1);
      }
      // else if(action.payload.type=="pop"){
      //   state.breadCrumb.splice(a)
      // }
    },
    changeSetCoverAndAvatarForPages: (state, action) => {
      if (action.payload == "false") {
        state.setCoverAndAvatarForPages = false;
      } else if (action.payload == "true") {
        state.setCoverAndAvatarForPages = true;
      } else {
        state.setCoverAndAvatarForPages = !state.setCoverAndAvatarForPages;
      }
    },
    changeuploadcover: (state, action) => {
      const  {avatar,cover}=action.payload
      if (avatar == "false") {
        state.uploadcover.avatar = false;
      } else if (cover == "true") {
        state.uploadcover.cover = true;
      }  else if (cover == "false") {
        state.uploadcover.cover = false;
      } else if (avatar == "true") {
        state.uploadcover.avatar = true;
      }
    },
  },
});
export const modalupload = (s) => s.profileStats.uploadcover
export const sendurl = (s) => s.Axios.uploadurl;
export const SetCoverAndAvatarForPages = (s) =>
  s.profileStats.SetCoverAndAvatarForPages;
export const Breadcrumb = (s) => s.profileStats.breadCrumb;
export const deletepage = (s) => s.profileStats.deletePagestatus;
export const editable = (s) => s.profileStats.editable;
export const currentPage = (s) => s.profileStats.currentPage;
export const cloudstatus = (s) => s.Axios.cloudstatus;
export const changemainPageListRender = (s) =>
  s.profileStats.mainPageListRender;
export const offset = (s) => s.profileStats.offset;
export const cloudResponse = (s) => s.Axios.cloudResponse;
export const userFetchStatus = (s) => s.Axios.status;
export const getDetails = (s) => s.Axios.userDetails;
export const createpagestatus = (s) => s.Axios.createPageStatus;
export const createpageres = (s) => s.Axios.createPageRes;
export const fetchpagestatus = (s) => s.Axios.FetchPageStatus;
export const fetchpageres = (s) => s.Axios.FetchPageres;
export const ProfileStats = (s) => s.profileStats.profileStats;
export const showPageForm = (s) => s.profileStats.showPageForm;
export const changeSubpageRender = (s) => s.profileStats.subpagerender;
export const {
  changeSetCoverAndAvatarForPages,
  changeBreadCrumb,
  changeProfileStats,
  changeShowPageForm,
  changeMainPageListRender,
  changeOffset,
  changeCurrentPage,
  changeEditable,
  changesubpageRender,
  changeuploadcover,
} = slice1.actions;
export const Modalslice = slice1.reducer;
export default slice.reducer;

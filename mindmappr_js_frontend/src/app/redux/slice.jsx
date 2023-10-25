"use client"
import { createSlice } from "@reduxjs/toolkit";
import { FetchUsers, createPageResponse,FetchPages, cloudinary,setprofile } from "./Axioses";


const slice=createSlice({
    name:"axios",
    initialState:{
        status:"standby",
        userDetails:{},
        createPageStatus:"standby",
        createPageRes:{},
        FetchPageStatus:"standby",
        FetchPageres:{},
        cloudstatus:"standby",
        cloudResponse:'',
        setProfile:''
    },
    reducers:{
      
    },
    extraReducers: (builder) => {
        builder
          .addCase(FetchUsers.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(FetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.userDetails = action.payload;
          })
          .addCase(FetchUsers.rejected, (state, ) => {
            state.status = 'failed';
            
          })
          .addCase(createPageResponse.pending, (state) => {
            state.createPageStatus = 'loading';
          })
          .addCase(createPageResponse.fulfilled, (state, action) => {
            state.createPageStatus = 'succeeded';
            state.createPageRes = action.payload;
          })
          .addCase(createPageResponse.rejected, (state, ) => {
            state.createPageStatus = 'failed';
            
          })
          .addCase(FetchPages.pending, (state) => {
            state.FetchPageStatus = 'loading';
          })
          .addCase(FetchPages.fulfilled, (state, action) => {
            
            state.FetchPageStatus = 'succeeded';
            state.FetchPageres = action.payload;
          })
          .addCase(FetchPages.rejected, (state ) => {
            state.FetchPageStatus = 'failed';
            
          })
          .addCase(cloudinary.pending, (state) => {
            state.cloudstatus = 'loading';
          })
          .addCase(cloudinary.fulfilled, (state, action) => {
            
            state.cloudstatus = 'succeeded';
            state.cloudResponse = action.payload;
          })
          .addCase(cloudinary.rejected, (state ) => {
            state.cloudstatus = 'failed';
            
          })
          .addCase(setprofile.fulfilled, (state, action) =>{
            state.setProfile = action.payload;
          })
      },
})
const slice1=createSlice({
  name:"userModal",
  initialState:{
     profileStats:false,
     showPageForm:false,
     mainPageListRender:false,
     offset:true,
     currentPage:''
  },
  reducers:{
    changeProfileStats:(state)=>{state.profileStats=!state.profileStats},
    changeShowPageForm:(state,action)=>{
        state.showPageForm=action.payload
    },
    changeMainPageListRender:(state)=>{state.mainPageListRender=!state.mainPageListRender},
    changeOffset:(state)=>{state.offset=!state.offset},
    changeCurrentPage:(state,action)=>{
      console.log(action);  
      state.currentPage=action.payload
    }

  },
})

export const currentPage=(s)=>s.profileStats.currentPage
export const cloudstatus=(s)=>s.Axios.cloudstatus
export const changemainPageListRender=(s)=>s.profileStats.mainPageListRender
export const offset=(s)=>s.profileStats.offset
export const cloudResponse=(s)=>s.Axios.cloudResponse
export const userFetchStatus=(s)=>s.Axios.status
export const getDetails=(s)=>s.Axios.userDetails
export const createpagestatus=(s)=>s.Axios.createPageStatus
export const createpageres=(s)=>s.Axios.createPageRes
export const fetchpagestatus=(s)=>s.Axios.FetchPageStatus
export const fetchpageres=(s)=>s.Axios.FetchPageres
export const ProfileStats=(s)=>s.profileStats.profileStats
export const showPageForm=(s)=>s.profileStats.showPageForm
export const {changeProfileStats,changeShowPageForm,changeMainPageListRender,changeOffset,changeCurrentPage}=slice1.actions
export const Modalslice=slice1.reducer
export default slice.reducer
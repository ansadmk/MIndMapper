import axios from "axios";
import { getCookie } from "cookies-next";
const cookie = getCookie("adminToken");
const usercookie = getCookie("token");

 export const axiosInstanceAdmin=axios.create({
    // baseURL:"https://13.53.207.81",
    baseURL:"https://api.mindmappr.me/",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  })
  export const axiosInstance=axios.create({
    baseURL:"https://api.mindmappr.me/",
    headers: {
      Authorization: `Bearer ${usercookie}`,
    },
  })
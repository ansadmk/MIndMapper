import axios from "axios";
import { getCookie } from "cookies-next";
const cookie = getCookie("adminToken");
const usercookie = getCookie("token");

 export const axiosInstanceAdmin=axios.create({
    baseURL:"http://13.53.207.81:4000",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  })
  export const axiosInstance=axios.create({
    baseURL:"http://13.53.207.81:4000",
    headers: {
      Authorization: `Bearer ${usercookie}`,
    },
  })
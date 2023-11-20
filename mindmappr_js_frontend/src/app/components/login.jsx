"use client";
import React from "react";
import { Form, Button } from "react-bootstrap";
import Sign from "./sign";
import axios from "axios";
import { useRouter } from "next/navigation";

import { setCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { FetchPages, FetchUsers } from "../redux/Axioses";
import { changeMainPageListRender } from "../redux/slice";
import { Box, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { axiosInstance } from "../redux/axiosInstance";

const login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handlesub = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const res = await axiosInstance.post("/api/user/login", {
      username: username,
      password: password,
    });

    if (res.data.status === "success") {
      if (res.data.message == "adminlogged") {
        setCookie("adminToken", res.data.jwt_token);
         console.log('hhh');
        router.push("/admin");
      } else {
        setCookie("token", res.data.jwt_token);

        router.push("/Users");
      }
    } else {
      alert("failed");
    }
  };
  return (
    
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      className="p-5 d-flex flex-column gap-2"
      autoComplete="off"
      onSubmit={handlesub}
    >
      <TextField
        id="username"
        label="Username"
        placeholder="Enter your username here"
        variant="filled"
        type="text"
        required
      />
      <TextField
        id="password"
        label="Password"
        placeholder="Enter your password here"
        variant="filled"
        type="password"
      />
      <Button type="submit">submit</Button>
      <Sign />
    </Box>
  );
};

export default login;

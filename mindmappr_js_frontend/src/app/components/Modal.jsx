"use client";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
// import Modal from 'react-bootstrap/Modal';
import Login from "./login";
import Register from "./register";

import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { ToastContainer } from "react-toastify";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const popup = () => {
 
  const router = useRouter();
  const [show, setShow] = useState({ log: false, reg: false });
  const cookie = getCookie("token");
  const handlelog = () => setShow({ log: !show.log, reg: false });
  const handlereg = () => setShow({ log: false, reg: !show.reg });
 useEffect(()=>{
  if(cookie ){router?.push("/users")}
 })
  return (
    <div className="d-flex">
      
      <Button variant="" onClick={handlelog}>
        Login
      </Button>
      <Button variant="" onClick={handlereg}>
        Register
      </Button>

      <Modal
        open={show.log}
        onClose={handlelog}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-5">
          <h1>login</h1>
          <Box className="d-flex  ">
            <Login />
          </Box>
        </Box>
      </Modal>
      <Modal
        open={show.reg}
        onClose={handlereg}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-5">
          <h1>Register</h1>
          <Box className="d-flex  ">
          <Register close={handlereg}/>
          </Box>
        </Box>
      </Modal>
    
    </div>
  );
};
export default popup;

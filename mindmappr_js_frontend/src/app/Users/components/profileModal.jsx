"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal from "react-bootstrap/Modal";
import {
  ProfileStats,
  changeMainPageListRender,
  changeProfileStats,
  cloudResponse,
  getDetails,
  
} from "@/app/redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {  setprofile } from "@/app/redux/Axioses";
import { useState } from "react";
import Image from "next/image";
import upload from "@/app/components/upload";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IconButton } from '@mui/material';
import { Box, TextField } from "@mui/material";
import {
  Avatar
} from "@mui/material";
const Profile = () => {
  const [files, setfile] = useState("");
  const profilestats = useSelector(ProfileStats);

  const cloudres = useSelector(cloudResponse);
  const user = useSelector(getDetails);
  const { data } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
 
  const handle1 = () => dispatch(changeProfileStats());
  const handleout = () => {
    data ? signOut() : deleteCookie("token");
    dispatch(changeProfileStats())
   
    router.push("/");
    
  };
  
  const handleCloud = (e) => {
    const file=e.target.files[0]
   setfile(file)

  };
  const handleurl=async ()=>{
    const url= await upload(files)
   dispatch(setprofile({ url: url }))
    dispatch(changeProfileStats())
    dispatch(changeMainPageListRender())
  }
  const handleusername = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    dispatch(setprofile({ name: username }));
    dispatch(changeProfileStats());
    dispatch(changeMainPageListRender());
  };
  return (
    <div className="">
      <Modal
        show={profilestats}
        onHide={handle1}
        className="d-flex align-items-center"
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul class="list-group">
            <li class="list-group-item active" aria-current="true">
              <div class="  d-flex gap-3 align-items-center">
                {user?.data?.image ? (
                   <Avatar
                   alt="Natacha"
                   src={user?.data?.image}
                   className="fs-1"
                 />
                ) : (
                  <Avatar>
                    {user?.data?.username.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                 <IconButton className='position-relative '>
   <CloudUploadIcon/>
  <input type="file" style={{opacity:'0'}} className='w-25  position-absolute' onChange={(e)=>handleCloud(e)}/>
  </IconButton> 
              
                <Button
                  variant=""
                  onClick={() =>handleurl()}                  
                  className="w-75 h-75 border-0 bg-white"
                >
                  Change Profile
                </Button>
              </div>
            </li>
            <li class="list-group-item">
              
                <form onSubmit={handleusername} className="d-flex justify-content-center gap-5">
                <TextField
        id="username"
        label="Username"
        placeholder="Enter your username here"
        variant="filled"
        type="text"
        defaultValue={user?.data?.username}
        required
      />
                  <Button type="submit">Change Username</Button>
                </form>
              
            </li>
            <li class="list-group-item">
              <div className="d-flex">
                <Button
                  variant=""
                  onClick={() => handleout()}
                  className="w-75 h-75 border-0 mt-2"
                >
                  signout
                </Button>
              </div>
            </li>
            
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Profile;

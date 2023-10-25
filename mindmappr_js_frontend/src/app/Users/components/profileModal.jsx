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
import { cloudinary, setprofile } from "@/app/redux/Axioses";
import { useState } from "react";
import Image from "next/image";

const Profile = () => {
  const [files, setfile] = useState("");
  const profilestats = useSelector(ProfileStats);

  const cloudres = useSelector(cloudResponse);
  const user = useSelector(getDetails);
  const { data } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(ProfileStats);
  const handle = () => dispatch(changeProfileStats());
  const handleout = () => {
    data ? signOut() : deleteCookie("token");
  
    dispatch(changeMainPageListRender());
   
    router.push("/");
    
  };
  console.log(cloudres);
  const handleCloud = (e) => {
    const files=e.target.files[0]
    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "Avatar");
    console.log(cloudres);
    dispatch(cloudinary(data));

  };
  const handleurl=()=>{
    
    dispatch(setprofile({ url: cloudres?.data?.secure_url }))
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
        onHide={handle}
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
                  <img src={user?.data?.image} alt="" width={64} height={64} />
                ) : (
                  <Image
                    src="/user.png"
                    alt="me"
                    width="64"
                    height="64"
                    className="me-3"
                  />
                )}
                 
                <input
                  type="file"
                  className="h-25  "
                  onChange={(e) => handleCloud(e)}
                  
                />
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
                  <input
                    type="text"
                    id="username"
                    placeholder="Change Username"
                    defaultValue={user?.data?.username}
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

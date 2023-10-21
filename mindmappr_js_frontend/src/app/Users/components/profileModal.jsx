'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import Modal from 'react-bootstrap/Modal';  
import { ProfileStats, changeProfileStats} from '@/app/redux/slice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "react-bootstrap";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { cloudinary } from "@/app/redux/Axioses";
import { useState } from "react";


const Profile = () => {
  const [files,setfile]=useState('')
    const profilestats=useSelector(ProfileStats)
    const { data } = useSession();
    const dispatch=useDispatch()
    const router=useRouter()
    console.log(ProfileStats);
    const handle = () => dispatch(changeProfileStats());
    const handleout = () => {
      data?signOut():deleteCookie('token')
      router.push("/");
    };
    const handleCloud=()=>{
      const data = new FormData();
      data.append("file", files);
      data.append("upload_preset", "Avatar");
      dispatch(cloudinary(data))
    }
    return (
      <div className='d-flex'>
  
        <Modal show={profilestats} onHide={handle} className='d-flex align-items-center m-4 '>
          <Modal.Header closeButton className='border-0'>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div class="input-group mb-3">
         <label class="input-group-text" for="inputGroupFile01">Upload</label>
         <input type="file" class="form-control" id="inputGroupFile01" onChange={(e)=>setfile(e.target.files[0])}/>
         </div>
          
         <Button variant="" onClick={() => handleCloud()} className="w-75 h-75 border-0 mt-2">
              Upload
            </Button>
          <Button variant="" onClick={() => handleout()} className="w-75 h-75 border-0 mt-2">
              signout
            </Button>
           
          </Modal.Body>
          
        </Modal>
      </div>
    );
}
export default Profile
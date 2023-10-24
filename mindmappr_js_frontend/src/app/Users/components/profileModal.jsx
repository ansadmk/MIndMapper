'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import Modal from 'react-bootstrap/Modal';  
import { ProfileStats, changeProfileStats, cloudResponse, getDetails} from '@/app/redux/slice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "react-bootstrap";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { cloudinary, setprofile } from "@/app/redux/Axioses";
import { useState } from "react";
import Image from "next/image";


const Profile = () => {
  const [state,setState]=useState(false)
  const [files,setfile]=useState('')
    const profilestats=useSelector(ProfileStats)
    const cloudres=useSelector(cloudResponse)
  const user = useSelector(getDetails);
    const { data } = useSession();
    const dispatch=useDispatch()
    const router=useRouter()
    console.log(ProfileStats);
    const handle = () => dispatch(changeProfileStats());
    const handleout = () => {
      data?signOut():deleteCookie('token')
      dispatch(changeProfileStats())
      router.push("/");
    };
    console.log(cloudres);
    const handleCloud=()=>{
      const data = new FormData();
      data.append("file", files);
      data.append("upload_preset", "Avatar");
      console.log(cloudres);
      dispatch(cloudinary(data))
      setState(true)
      
      setTimeout(()=>  dispatch( setprofile( {url:cloudres?.data?.secure_url})),10000)
      
    }
    return (
      <div className=''>
  
        <Modal show={profilestats} onHide={handle} className='d-flex align-items-center'>
          <Modal.Header closeButton className='border-0'>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          <div class=" mb-3 ">
          {user?.data?.image ? <img src={user?.data?.image} alt="" width={64} height={64} />  :
                <Image
                  src="/user.png"
                  alt="me"
                  width="64"
                  height="64"
                  className="me-3"
                />}
         
         <input type="file"  className="h-25 "  onChange={(e)=>setfile(e.target.files[0])}/>
         </div>
          <div className="d-flex">
          <Button variant="" onClick={() => handleCloud()} className="w-75 h-75 border-0 mt-2">
              Upload
            </Button>
          <Button variant="" onClick={() => handleout()} className="w-75 h-75 border-0 mt-2">
              signout
            </Button>
           
          </div>
         
          </Modal.Body>
          
        </Modal>
      </div>
    );
}
export default Profile
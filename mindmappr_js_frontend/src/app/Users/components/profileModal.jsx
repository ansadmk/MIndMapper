'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import Modal from 'react-bootstrap/Modal';  
import { ProfileStats, changeProfileStats} from '@/app/redux/slice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "react-bootstrap";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";


const Profile = () => {
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
    return (
      <div className='d-flex'>
  
        <Modal show={profilestats} onHide={handle} className='d-flex align-items-center m-4 '>
          <Modal.Header closeButton className='border-0'>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Button variant="" onClick={() => handleout()} className="w-75 h-75 border-0 mt-2">
              signout
            </Button>
           
          </Modal.Body>
          
        </Modal>
      </div>
    );
}
export default Profile
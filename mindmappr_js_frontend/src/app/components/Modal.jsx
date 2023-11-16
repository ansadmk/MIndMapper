'use client';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';  
import Login from './login';
import Register from './register';
import { signIn,signOut,useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { ToastContainer } from 'react-toastify';

const popup = () => {
  const {data}=useSession()
  const router=useRouter()
    const [show, setShow] = useState({log:false,reg:false});
    const cookie = getCookie("token");
    const handlelog = () => setShow({log:!show.log,reg:false});
    const handlereg = () => setShow({log:false,reg:!show.reg});
    useEffect(()=>{
    data?.user.name?router.push('/Users'):null}
    )
    return (
      <div className='d-flex'>
      {!cookie ? null : router.push("/Users")}
        <Button variant="" onClick={handlelog}>
          Login
        </Button>
        <Button variant="" onClick={handlereg}>
          Register
        </Button>
  
        <Modal show={show.log} onHide={handlelog} className='d-flex align-items-center m-4 p-5'>
         
          <Modal.Header closeButton className='border-0 p-4'>
            <Modal.Title>login</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Login/>
          </Modal.Body>
          
        </Modal>
        <Modal show={show.reg} onHide={handlereg} className='d-flex align-items-center m-4 '>
        
          <Modal.Header closeButton className='border-0 p-4'>
            <Modal.Title>register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Register/>
          </Modal.Body>
          
        </Modal>
      </div>
    );
}
export default popup
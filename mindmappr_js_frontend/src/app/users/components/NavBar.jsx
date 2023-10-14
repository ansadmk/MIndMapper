'use client'
import React, { useState } from 'react'
import { Button,Offcanvas } from 'react-bootstrap';
import { signIn,signOut,useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const [show, setShow] = useState(false);
  const {data}=useSession()
  const router=useRouter()
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  const handleout=()=>{
    signOut()
    router.push('/')
  }
  return (
    <>
      <Button variant="" onClick={toggleShow} className="ms-5 mt-5 p-0 pt-0 fs-1 border-0">
      ⇨
      </Button>
      <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="d-flex">
        <img src={data?.user?.image} alt="" className='img-fluid w-25 h-25'/>
         <div className='text-center mt-4'> hello {data?.user?.name}</div>
          <Button variant='' onClick={()=>handleout()} className='w-50'>signout</Button>
    </div>
      
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavBar
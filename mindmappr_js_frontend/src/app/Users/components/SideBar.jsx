"use client";
import React, { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { deleteCookie, getCookie } from 'cookies-next';
import {useSelector,useDispatch} from "react-redux";
import { userFetchStatus ,getDetails, changeProfileStats} from "@/app/redux/slice";
import { FetchUsers } from "@/app/redux/Axioses";



const NavBar =  () => {
  const [show, setShow] = useState(true);
  const dispatch=useDispatch()
  const user=useSelector(getDetails)
  useEffect(()=>{
    if (userFetchStatus!="standby") {
      dispatch(FetchUsers())
    }
  },[])
  
  const handledis=()=>dispatch(changeProfileStats())
  const { data } = useSession();
  const router = useRouter();
 const cookie=getCookie('token')
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  
  
  return (
    <div className="position-relative ">
      {cookie?null:router.push('/')}
      <Button
        variant=""
        onClick={toggleShow}
        className="fs-3 border-0 "
      >
        🟰
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={false}
        
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex link" onClick={()=>handledis()}>
            {data?.user ? (
              <>
                <img
                  src={data?.user?.image}
                  alt=""
                  className="img-fluid w-25 h-25"
                />
                <div className="text-center mt-4">
                  hello {data?.user?.name }
                </div>
              </>
            ) : (
              <>
                <Image
                  src="/user.png"
                  alt="me"
                  width="64"
                  height="64"
                  className="me-3"
                />
                <div className="text-center mt-4"> hello {user?.data?.username}</div>
              </>
            )}
            
          </div>
          <div className="mt-5">
            <ul className="d-flex flex-column gap-4">
              <li>search</li>
              <li>notifications</li>
              <li >Add new page</li>
              
            </ul>
            <div className="border-5 bg-black">
              <div></div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default NavBar;

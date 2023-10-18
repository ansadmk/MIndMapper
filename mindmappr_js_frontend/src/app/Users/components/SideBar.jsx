"use client";
import React, { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { deleteCookie, getCookie } from 'cookies-next';
import {useSelector,useDispatch} from "react-redux";
import { userFetchStatus ,getDetails} from "@/app/redux/slice";
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
  
  
  const { data } = useSession();
  const router = useRouter();
 const cookie=getCookie('token')
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  const handleout = () => {
    data?signOut():deleteCookie('token')
    router.push("/");
  };
  
  return (
    <div className="position-relative ">
      {cookie?null:router.push('/')}
      <Button
        variant=""
        onClick={toggleShow}
        className="ms-5 mt-5 p-0 pt-0 fs-1 border-0 position-absolute top-0 start-0 translate-middle"
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
          <div className="d-flex">
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
            <Button variant="" onClick={() => handleout()} className="w-50">
              signout
            </Button>
          </div>
          <div className="mt-5">
            <ul className="d-flex flex-column gap-4">
              <li>search</li>
              <li>notifications</li>
              <li>Add new page</li>
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

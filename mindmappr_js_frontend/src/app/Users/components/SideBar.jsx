"use client";
import React, { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { useSelector, useDispatch } from "react-redux";
import {
  userFetchStatus,
  getDetails,
  changeProfileStats,
  changeShowPageForm,
  createpagestatus,
  fetchpagestatus,
  fetchpageres,
} from "@/app/redux/slice";
import { FetchPages, FetchUsers } from "@/app/redux/Axioses";

const NavBar = () => {
  const [show, setShow] = useState(true);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(getDetails);
  const pages = useSelector(fetchpageres);
  console.log(pages);
  const userfetchstatus = useSelector(userFetchStatus);
  const fetchPagestatus = useSelector(fetchpagestatus);
  console.log(userfetchstatus,fetchPagestatus);
     
  const handlePageCreation = () => dispatch(changeShowPageForm());
  useEffect(() => {
    
      dispatch(FetchUsers());
    
      
      dispatch(FetchPages());
    
  
    
},[]);

  const handledis = () => dispatch(changeProfileStats());
  const { data } = useSession();
  const router = useRouter();
  const cookie = getCookie("token");
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <div className="position-relative ">
      {cookie ? null : router.push("/")}
      <Button variant="" onClick={toggleShow} className="fs-3 border-0 ">
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
          <div className="d-flex link" onClick={() => handledis()}>
            {data?.user ? (
              <>
                <img
                  src={data?.user?.image}
                  alt=""
                  className="img-fluid w-25 h-25"
                />
                <div className="text-center mt-4">hello {data?.user?.name}</div>
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
                <div className="text-center mt-4">
                  {" "}
                  hello {user?.data?.username}
                </div>
              </>
            )}
          </div>
          <div className="mt-5 h-75">
            <ul className="d-flex flex-column gap-4 h-75">
              <li>search</li>
              <li>notifications</li>
              <li>
                <Button onClick={() => handlePageCreation()}>
                  Add new page
                </Button>
              </li>
              <li className="h-100">
                <ul className="border h-100 border-black rounded-5 p-3 overflow-auto">
                  
                    {pages?.data?.mainpages?.map((data) => (
                      <li>
                        {" "}
                        <Button variant="" className="fs-3 border-0">
                          {data.content}
                        </Button>
                      </li>
                    ))
                  }
                </ul>
              </li>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default NavBar;

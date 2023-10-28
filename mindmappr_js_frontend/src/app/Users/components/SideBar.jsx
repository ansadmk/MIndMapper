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
  fetchpagestatus,
  fetchpageres,
  changemainPageListRender,
  changeMainPageListRender,
  offset,
  changeOffset,
  changeCurrentPage,
  changeEditable,
  changesubpageRender,
  changeBreadCrumb,
} from "@/app/redux/slice";
import { FetchPages, FetchUsers } from "@/app/redux/Axioses";
import { Avatar, Chip, Stack } from "@mui/material";

const NavBar = () => {
  const renderpage = useSelector(changemainPageListRender);
  const dispatch = useDispatch();
  const user = useSelector(getDetails);

  const pages = useSelector(fetchpageres);
  const offsetstate = useSelector(offset);

  const userfetchstatus = useSelector(userFetchStatus);
  const fetchPagestatus = useSelector(fetchpagestatus);
  console.log(userfetchstatus, fetchPagestatus);

  const handlePageCreation = () => dispatch(changeShowPageForm(true));

  useEffect(() => {
    dispatch(FetchUsers());
    dispatch(FetchPages());
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      location.reload(false);
    }
  }, []);

  useEffect(() => {
    if (renderpage) {
      dispatch(FetchUsers());
      dispatch(FetchPages());
      dispatch(changeMainPageListRender());
    }
  });

  const handledis = () => dispatch(changeProfileStats());
  const { data } = useSession();
  const router = useRouter();
  const cookie = getCookie("token");
  const handleClose = () => dispatch(changeOffset());
  const toggleShow = () => dispatch(changeOffset());

  return (
    <div className="position-relative ">
      {cookie ? null : router.push("/")}
      <Button variant="" onClick={toggleShow} className="fs-3 border-0 ">
        🟰
      </Button>

      <Offcanvas
        show={offsetstate}
        onHide={handleClose}
        scroll={true}
        backdrop={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex link justify-content-start "  onClick={() => handledis()}>
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
              <Stack direction="row" >
                {/* <Stack direction="row" spacing={1}>
               <Chip avatar={<Avatar>{user?.data?.username.charAt(0).toUpperCase()}</Avatar>} label="Avatar" />
               <Chip
               avatar={<Avatar alt="Natacha" src={user?.data?.image} />}
               label={user?.data?.username}
               variant="outlined"
                 />
               </Stack> */}
                {user?.data?.image ? (
                  <Chip
                    avatar={<Avatar alt="Natacha" src={user?.data?.image}  />}
                    label={user?.data?.username}
                    variant="outlined"
                    size="100"
                    className="p-5 d-flex gap-5"
                  />
                ) : (
                  <Chip
                    avatar={
                      <Avatar>
                        {user?.data?.username.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    label={user?.data?.username}
                    size="100"
                  />
                )}
              </Stack>
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
                      <Button
                        variant=""
                        className="fs-3 border-0"
                        onClick={() => {
                          dispatch(changeCurrentPage(data));
                          dispatch(changeBreadCrumb({type:'clear'}))

                          dispatch(changeBreadCrumb({type:'push',data:{role:"main",content:data}}))
                          dispatch(changeShowPageForm(false));
                          dispatch(changeEditable("false"));
                          dispatch(changesubpageRender("false"));
                        }}
                      >
                        {data.content}
                      </Button>
                    </li>
                  ))}
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

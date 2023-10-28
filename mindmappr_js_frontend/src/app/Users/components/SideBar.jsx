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
import { Avatar, Badge, Chip, Stack } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AddCircleIcon from '@mui/icons-material/AddCircle';




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
        className="w-25 "
      >
        <Offcanvas.Header closeButton >
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
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
               
                {user?.data?.image ? (
                  <Chip
                    avatar={<Avatar alt="Natacha" src={user?.data?.image} className="fs-1"  />}
                    label={user?.data?.username}
                    variant="outlined"
                    size="100"
                    className="p-2 d-flex gap-3"
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
            <ul className="d-flex flex-column gap-4 h-75 align-items-center ">
            <li><FindInPageIcon fontSize="large"/></li>
              <li><Badge badgeContent={4} color="secondary">
                  <InboxIcon color="action" fontSize="large" />
                  </Badge></li>
              
              <li>
                <Button variant="" onClick={() => handlePageCreation()}>
                <AddCircleIcon fontSize="large"/>
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

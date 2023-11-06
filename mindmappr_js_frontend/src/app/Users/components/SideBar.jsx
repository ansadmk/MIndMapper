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
  PageState,
  changeeditor,
  Noti,
} from "@/app/redux/slice";
import { FetchPages, FetchUsers, getNoti } from "@/app/redux/Axioses";
import { Avatar, Badge, Chip, Divider, IconButton, List, ListItem, ListItemAvatar, Popover, Stack ,ListItemText, Typography} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Asynchronous from "./searchBar";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const Notify=useSelector(Noti)
  const handlepop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlepop2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClo = () => {
    setAnchorEl(null);
  };
  const handleClo2 = () => {
    setAnchorEl2(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const open2 = Boolean(anchorEl2);
  const id2 = open ? "simple-popover" : undefined;

  const renderpage = useSelector(changemainPageListRender);
  const dispatch = useDispatch();
  const user = useSelector(getDetails);

  const pages = useSelector(fetchpageres);
  const offsetstate = useSelector(offset);

  const handlePageCreation = () => dispatch(changeShowPageForm(true));

  useEffect(() => {
    dispatch(FetchUsers());
    dispatch(FetchPages());
    dispatch(getNoti())
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      location.reload(false);
    }
  }, []);

  useEffect(() => {
    if (renderpage) {
      dispatch(getNoti())
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
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="w-50">
          <div
            className="d-flex link justify-content-start "
            onClick={() => handledis()}
          >
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
              <Stack direction="row">
                {user?.data?.image ? (
                  <div className="d-flex gap-2">
                    <Avatar
                      alt="Natacha"
                      src={user?.data?.image}
                      className="fs-1"
                    />
                    <h1>{user?.data?.username}</h1>
                  </div>
                ) : (
                  <div className="d-flex gap-2">
                    <Avatar>
                      {user?.data?.username.charAt(0).toUpperCase()}
                    </Avatar>
                    <h1>{user?.data?.username}</h1>
                  </div>
                )}
              </Stack>
            )}
          </div>
          <div className="mt-5 h-75">
            <ul className="d-flex flex-column gap-4 h-75 align-items-center ">
              <li>
                <Button
                  aria-describedby={id}
                  variant="contained"
                  onClick={handlepop}
                >
                  <FindInPageIcon fontSize="large" />
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClo}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Asynchronous />
                </Popover>
              </li>
              <li>
                <IconButton
                  aria-describedby={id2}
                  variant="contained"
                  onClick={handlepop2}
                >
                  <Badge badgeContent={Notify?.data?.length} color="secondary">
                    <InboxIcon color="action" fontSize="large" />
                  </Badge>
                </IconButton>
                <Popover
                  id={id2}
                  open={open2}
                  anchorEl={anchorEl2}
                  onClose={handleClo2}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  className="h-25"
                >
                  { Notify?.data ? (
                    Notify?.data?.map((data) => (
          
                      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>           
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={data.sub}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {data.msg}
              </Typography>
            
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </List>
                   ))
                  ) : (
                    <h1>Nothing to show here...</h1>
                  )}
                </Popover>
              </li>

              <li>
                <Button variant="" onClick={() => handlePageCreation()}>
                  <AddCircleIcon fontSize="large" />
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
                          dispatch(PageState(true));
                          dispatch(changeCurrentPage(data));
                          dispatch(changeBreadCrumb({ type: "clear" }));
                          dispatch(changeeditor(true));
                          dispatch(
                            changeBreadCrumb({
                              type: "push",
                              data: { role: "main", content: data },
                            })
                          );
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

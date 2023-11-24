"use client";
import { deletePage, setPublic } from "@/app/redux/Axioses";
import {
  Breadcrumb,
  changeBreadCrumb,
  changeCurrentPage,
  changeMainPageListRender,
  currentPage,
} from "@/app/redux/slice";

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShareIcon from "@mui/icons-material/Share";
import { IconButton, Popover } from "@mui/material";
import copy from "copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const NavBar = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const page = useSelector(currentPage);
  const crumb = useSelector(Breadcrumb);
  const handleClo = () => {
    setAnchorEl(null);
  };
  const handlepop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open1 = Boolean(anchorEl);
  const id = open1 ? "simple-popover" : undefined;
  const handle = () => {
    dispatch(deletePage({ pageid: page._id, content: page.content }));

    dispatch(changeMainPageListRender());
  };
  const handleCrumb = (d, index) => {
    dispatch(changeCurrentPage(d));
    dispatch(changeBreadCrumb({ type: "select", data: index }));
  };
  const handlePublic = () => {
    dispatch(setPublic({ id: page.ansester }));
  };
  const handleUnPublic = () => {
    dispatch(setPublic({ id: page.ansester, unpub: true }));
  };
  return (
    <div className="d-flex justify-content-end w-100 overflow-y-auto
     " style={{overflowWrap: "break-word"}}>
      <div className="me-5 d-flex justify-content-end w-100">
        <div className="d-flex">
          {crumb?.map((data, index) => (
            <Button
            key={index}
              variant=""
              onClick={() => handleCrumb(data.content, index)}
              className="nav-link"
            >
              {data?.content?.content} /
            </Button>
          ))}
        </div>
       
      </div>
      {page?<div className="d-flex">
        <Button variant="" onClick={() => handle()}>
          <DeleteForeverIcon />
        </Button>
        {page?.public ? (
        <Button onClick={() => handleUnPublic()}>unpublish</Button>
      ) : (
        <Button onClick={() => handlePublic()}>publish</Button>
      )}
      <div>
        <IconButton onClick={(e) => handlepop(e)}>
          <ShareIcon />
        </IconButton>
        <Popover
          id={id}
          open={open1}
          anchorEl={anchorEl}
          onClose={handleClo}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          className=""
        >
          {page.public ? (
            <div className="border p-3">
              {`http://localhost:3000/view/${page._id}`}
              <IconButton
                onClick={() =>
                  copy(`http://localhost:3000/view/${page._id}`, {
                    debug: true,
                    message: "copied",
                  })
                }
              >
                <ContentCopyIcon />
              </IconButton>
            </div>
          ) : (
            <h5 className="p-3 text-danger">you have to publish first!</h5>
          )}
        </Popover>
      </div>
      </div>:null}
      
    </div>
  );
};

export default NavBar;

"use client";
import {
  SetCoverAndAvatarForPages,
  changeSetCoverAndAvatarForPages,
  changeuploadcover,
  currentPage,
} from "@/app/redux/slice";
import { Avatar, Card, CardMedia, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";

const ImageForPages = () => {
  const parent = useSelector(currentPage);
  
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);

  return (
    <div
      className="w-100 row top-75  position-relative rounded-5"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        className={`col ${parent.cover ? "":"h-100 border"}`}
      >
        <Card className="rounded-5">
        {isShown ? (
          <IconButton
            onClick={() => dispatch(changeuploadcover({ cover: "true" }))}
            
          >
            <EditIcon />
            <h6>Set Cover</h6>
          </IconButton>
        ) : null}
        {parent.cover ? (
          
            <CardMedia
              sx={{ height: "50vh" }}
              className=" "
              image={parent.cover}
              title="Cover"
            />
         
        ) : null}
       
         </Card>
        
      </div>
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        className="col position-absolute d-flex justify-content-center  align-items-end h-100 mt-5 ms-0 "
      >

        {parent.avatar ? (
          <div>
            <Avatar src={parent.avatar} sx={{maxHeight:120,maxWidth:120}}  className="bg-white h-100 w-100  "/>
          </div>
        ) : null}
        {isShown ? (
          <IconButton
            onClick={() => dispatch(changeuploadcover({ avatar: "true" }))}
            className=" "
          >
            <EditIcon />
            <h6>set icon</h6>
          </IconButton>
        ) : null}{" "}
      </div>
    </div>
  );
};

export default ImageForPages;

"use client";
import {
  SetCoverAndAvatarForPages,
  changeSetCoverAndAvatarForPages,
  changeuploadcover,
  currentPage,
} from "@/app/redux/slice";
import { Avatar, Card, CardMedia, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const ImageForPages = () => {
  const parent = useSelector(currentPage);
  const detect = useSelector(SetCoverAndAvatarForPages);
  const dispatch = useDispatch();
  

  return (
    <div className="w-100 h-25">
      <div >
            {parent.avatar ? (
              <div onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}>
                <Avatar
                  src={parent.avatar}
                  
                />
                {isShown ? (
                  <IconButton onClick={() => dispatch(changeuploadcover("true"))}>
                    <EditIcon />
                  </IconButton>
                ) : null}{" "}
              </div>
            ) : null}
          </div>
      {parent.cover ? (
        <Card>
          <CardMedia sx={{ height: 140 }} image={parent.cover} title="Cover" />
        
         {isShown ? (
          <IconButton onClick={() => dispatch(changeuploadcover("true"))}>
            <EditIcon />
          </IconButton>
        ) : null}
        </Card>
      ) : null}
      
    </div>
  );
};

export default ImageForPages;

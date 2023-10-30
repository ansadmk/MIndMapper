"use client";
import {
  SetCoverAndAvatarForPages,
  changeSetCoverAndAvatarForPages,
  changeuploadcover,
  currentPage,
} from "@/app/redux/slice";
import { Avatar, Card, CardMedia, IconButton } from "@mui/material";
import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const ImageForPages = () => {
  const parent = useSelector(currentPage);
  const detect = useSelector(SetCoverAndAvatarForPages);
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="w-100 border"
    onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
    >
     
          <div >
          {parent.cover ? (
        <Card>
          <CardMedia sx={{ height: 140 }} image={parent.cover} title="Cover" />
        
         
        </Card>
      ) : null}
      {isShown ? (
          <IconButton onClick={() => dispatch(changeuploadcover({cover:"true"}))}>
            <EditIcon />
          </IconButton>
        ) : null}
          </div>
      
      
    </div>
  );
};

export default ImageForPages;

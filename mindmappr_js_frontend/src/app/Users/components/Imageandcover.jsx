"use client";
import {
  SetCoverAndAvatarForPages,
  changeSetCoverAndAvatarForPages,
  currentPage,
} from "@/app/redux/slice";
import { Avatar, Card, CardMedia, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
const ImageForPages = () => {
  const parent = useSelector(currentPage);
  const detect = useSelector(SetCoverAndAvatarForPages);
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      className="w-100 h-25"
    >
      {parent.cover ? (
        <Card>
          <CardMedia sx={{ height: 140 }} image={parent.cover} title="Cover" />
        </Card>
      ) : null}
      {parent.avatar ? <Avatar src={parent.avatar} /> : null}
      {isShown ? (
        <div className="d-flex">
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <AddIcon />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
};

export default ImageForPages;

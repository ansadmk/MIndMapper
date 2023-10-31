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
  const detect = useSelector(SetCoverAndAvatarForPages);
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);

  return (
    <div
      className="w-100  top-75  position-relative"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        {parent.cover ? (
          <Card>
            <CardMedia
              sx={{ height: "50vh" }}
              className="rounded-5 "
              image={parent.cover}
              title="Cover"
            />
          </Card>
        ) : null}
        {isShown ? (
          <IconButton
            onClick={() => dispatch(changeuploadcover({ cover: "true" }))}
          >
            <EditIcon />
            <h6>Set Cover</h6>
          </IconButton>
        ) : null}
      </div>
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        {parent.avatar ? (
          <div>
            <Avatar src={parent.avatar} />
          </div>
        ) : null}
        {isShown ? (
          <IconButton
            onClick={() => dispatch(changeuploadcover({ avatar: "true" }))}
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

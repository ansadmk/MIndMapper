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
import Container from '@mui/material/Container';

const ImageForPages = () => {
  const parent = useSelector(currentPage);
  
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);

  return (
    
    <Container
      className="w-100 d-flex justify-content-center flex-column h-100  "
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}

    >
      {"Add icon and Cover"}
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        className={`col  ${parent.cover ? "h-100":"h-100 "}`}
      >
        <Card className=" w-100 container-fluid ">
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
              className=" img-fluid "
              image={parent.cover}
              title="Cover"
            />
         
        ) : null}
       
         </Card>
        
      </div>
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        className="col  "
      >

        {parent.avatar ? (
          <div className="w-100 d-flex justify-content-start ms-5">
            <Avatar src={parent.avatar} alt='' sx={{width:120,height:120}}/>
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
    </Container>
  );
};

export default ImageForPages;

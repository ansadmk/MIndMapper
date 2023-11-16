"use client";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchUsers, getAllPages } from "@/app/redux/Axioses";
import { allPages, searchitem } from "@/app/redux/slice";
import moment from "moment";
import usersList from "@/app/admin/components/usersList";
import { getUsersForAdmin } from "@/app/redux/Admin/adminSlice";
import { getUsersList } from "@/app/redux/Admin/AdminAxioses";
import { useRouter } from "next/navigation";

export default function page() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(getAllPages());
    dispatch(FetchUsers());
    dispatch(getUsersList());
  }, [dispatch]);
  const users = useSelector(getUsersForAdmin);
  console.log(users);
  const pages = useSelector(allPages);
  const search = useSelector(searchitem);
 
  return (
    <div className=" d-flex h-75 justify-content-center align-items-center    w-100 container">
      <div className="h-75">
      {search ? (
        <div className="d-flex flex-column gap-3">
          {pages?.data?.map((value) =>
            value.public && value.role == "main" && value.content.includes(search) ? (
              <Card sx={{ maxWidth: 345 }} className=" w-100 ">
                <CardHeader
                  avatar={
                    value.avatar ? (
                      <Avatar
                        src={
                          pages?.user?.filter(
                            (val) => val._id == value.owner
                          )[0].image
                        }
                      />
                    ) : (
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {pages?.user
                          ?.filter((val) => val._id == value.owner)[0]
                          .username.charAt(0)}
                      </Avatar>
                    )
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={
                    pages?.user?.filter((val) => val._id == value.owner)[0]
                      .username
                  }
                  subheader={moment(value.createdAt).fromNow()}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={value.avatar}
                  alt=""
                  onClick={() => router.push(`/View/${value._id}`)}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {value.content}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ) : null
          )}
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {pages?.data?.map((value) =>
            value.public && value.role == "main" ? (
              <Card sx={{ maxWidth: 345 }} className="col w-100 ">
                <CardHeader
                  avatar={
                    value.avatar ? (
                      <Avatar
                        src={
                          pages?.user?.filter(
                            (val) => val._id == value.owner
                          )[0].image
                        }
                      />
                    ) : (
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {pages?.user
                          ?.filter((val) => val._id == value.owner)[0]
                          .username.charAt(0)}
                      </Avatar>
                    )
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={
                    pages?.user?.filter((val) => val._id == value.owner)[0]
                      .username
                  }
                  subheader={moment(value.createdAt).fromNow()}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={value.avatar}
                  alt=""
                  onClick={() => router.push(`/View/${value._id}`)}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {value.content}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ) : null
          )}
        </div>
      )}
      </div>
      
    </div>
  );
}

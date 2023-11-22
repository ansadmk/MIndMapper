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
import { FetchUsers, getAllPages, setlike } from "@/app/redux/Axioses";
import { allPages, getDetails, searchitem } from "@/app/redux/slice";
import moment from "moment";
import usersList from "@/app/admin/components/usersList";
import { getUsersForAdmin } from "@/app/redux/Admin/adminSlice";
import { getUsersList } from "@/app/redux/Admin/AdminAxioses";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
import { Snackbar } from "@mui/material";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";

const r=0
export default function page() {
  const dispatch = useDispatch();
  const user = useSelector(getDetails);                                                                                                        r
  const router = useRouter();
  useEffect(() => {
    dispatch(getAllPages({ pageno: 1 }));
    dispatch(FetchUsers());
    dispatch(getUsersList());
  }, [dispatch]);
  
  
  const pages = useSelector(allPages);
  const search = useSelector(searchitem);
  const [page, setPage] = useState(1);
  const handleChange1 = (event, value) => {
    
    dispatch(getAllPages({ pageno: value }));
    setPage(value);
  };
  
  return (
    <div className=" d-flex h-75 justify-content-center align-items-center    w-100 container">
      <div className="h-75 ">
        {search ? (
          <div className="gap-1 row">
            
            <h1>showing related to {search}</h1>
          {
            pages?.data?.map((value) =>
              (value.public &&
                value.role == "main" &&
                value.content.toLowerCase().includes(search.toLowerCase())) ||
              pages?.user
                ?.filter((val) => val._id == value.owner)[0]
                .username.toLowerCase()
                .includes(search.toLowerCase()) ? (
                <Card sx={{ maxWidth: 345 }} className="  col-md-3 col-12">
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
                  <IconButton aria-label="add to favorites"  onClick={()=>{dispatch(setlike({contentId:value._id}))
                dispatch(FetchUsers());
                }}>
                    <FavoriteIcon />
                  </IconButton>
                    <IconButton
                      onClick={() => {
                        copy(`http://localhost:3000/View/${value._id}`);
                        alert("copied");
                      }}
                    >
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ) : null
            )}
          </div>
        ) : (
          <div className="row gap-1">
            {pages?.data1?.map((value) =>
              value.public && value.role == "main" ? (
                <Card sx={{ maxWidth: 345 }} className="col-md-3 col-12   ">
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
                   {user?.data?.liked?.filter(i=>i.contentId==value._id)[0]? <IconButton aria-label="add to favorites" style={{color:"red"}} onClick={()=>{dispatch(setlike({contentId:user?.data?.liked?.filter(i=>i.contentId==value._id)[0]._id,no:true}))
                dispatch(FetchUsers());
                }}>
                    <FavoriteIcon />
                  </IconButton> :<IconButton aria-label="add to favorites"   onClick={()=>{dispatch(setlike({contentId:value._id}))
                dispatch(FetchUsers());
                }}>
                    <FavoriteIcon />
                  </IconButton>}
                    <IconButton
                      onClick={() => {
                        copy(`http://localhost:3000/View/${value._id}`);
                        alert("copied");
                      }}
                    >
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ) : null
            )}
            <Stack spacing={2}>
              <Typography>Page: {page}</Typography>
              <Pagination
                count={
                  pages?.data1?.length / 10 < 1
                    ? 1
                    : pages?.data1?.length / 10 + 1
                }
                page={page}
                onChange={handleChange1}
              />
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Welcome from "./welcomepage";
import { useDispatch, useSelector } from "react-redux";
import {
  Noti,
  PageState,
  changeBreadCrumb,
  changeCurrentPage,
  changeEditable,
  changeMainPageListRender,
  changeProfileStats,
  changeShowPageForm,
  changeeditor,
  changemainPageListRender,
  changesubpageRender,
  fetchpageres,
  getDetails,
} from "@/app/redux/slice";
import {
  Avatar,
  Badge,
  Button,
  ListItemAvatar,
  Paper,
  Popover,
  Stack,
} from "@mui/material";
import { FetchPages, FetchUsers, getNoti } from "@/app/redux/Axioses";
import { Suspense, useEffect, useState } from "react";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import Asynchronous from "./searchBar";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NavBar from "./NavBar";
import SignpostIcon from '@mui/icons-material/Signpost';
import Loading from "../loading";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
 
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  maxWidth: 400,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
const dispatch = useDispatch();
const r=10
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const Notify = useSelector(Noti);
  const handlepop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClo = () => {
    setAnchorEl(null);
  };
  const handleClo2 = () => {
    setAnchorEl2(null);
  };
  const handlepop2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const open1 = Boolean(anchorEl);
  const id = open1 ? "simple-popover" : undefined;
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const pages = useSelector(fetchpageres);
  const handlePageCreation = () => dispatch(changeShowPageForm(true));
  const user = useSelector(getDetails);                                                                                                        r
  const renderpage = useSelector(changemainPageListRender);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(FetchUsers());
    dispatch(FetchPages());
    dispatch(getNoti());
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      location.reload(false);
    }
  }, []);

  useEffect(() => {
    if (renderpage) {
      dispatch(getNoti());
      dispatch(FetchUsers());
      dispatch(FetchPages());
      dispatch(changeMainPageListRender());
    }
  });
  const handledis = () => dispatch(changeProfileStats());
  const { data } = useSession();
  const router = useRouter();
  const cookie = getCookie("token");
  return (
    
    <Box sx={{ display: "flex" }}>
      {cookie ? null : router.push("/")}
      <CssBaseline />
      <AppBar position="fixed" color=""  open={open}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <NavBar />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
       
        <List>
        {open?<div
          className="d-flex link justify-content-start w-0 h-0 border p-5"
          onClick={() => handledis()}
        >
          {data?.user ? (
            <div>
              <img
                src={data?.user?.image}
                alt=""
                className="img-fluid w-25 h-25"
              />
              <div className="text-center mt-4">hello {data?.user?.name}</div>
            </div>
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
        </div>:null}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              aria-describedby={id}
              variant="contained"
              onClick={handlepop}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FindInPageIcon fontSize="large" />
              </ListItemIcon>

              <ListItemText primary={"search"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            <Popover
              id={id}
              open={open1}
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
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              aria-describedby={id2}
              variant="contained"
              onClick={handlepop2}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Badge badgeContent={Notify?.data?.length} color="secondary">
                  <InboxIcon color="action" fontSize="large" />
                </Badge>
              </ListItemIcon>

              <ListItemText primary={"inbox"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
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
              {Notify?.data ? (
                Notify?.data?.map((data,index) => (
                  <List
                  key={index}
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={data.sub}
                        secondary={
                          <div>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {data.msg} {moment(data.time).fromNow()}
                            </Typography>
                          </div>
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
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => handlePageCreation()}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AddCircleIcon fontSize="large" />
              </ListItemIcon>

              <ListItemText primary={"Create page"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
             onClick={()=>router.push('/Users/posts')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SignpostIcon fontSize="large" />
              </ListItemIcon>

              <ListItemText primary={"MindMappers"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            
          </ListItem>
        </List>
        <Divider />

        {open ? (
          <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }} className="overflow-auto" >
            
            {pages?.data?.mainpages?.map((data,index) => (
              <Item
              key={index}
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 2,
                }}
              >
                <Stack
                  spacing={2}
                  direction="row"
                  alignItems="center"
                  onClick={() => {
                    dispatch(changeShowPageForm(false));
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

                    dispatch(changeEditable("false"));
                    dispatch(changesubpageRender("false"));
                  }}
                >
                  <Avatar src={data.avatar} alt="" />
                  <Typography noWrap className="w-25">{data.content}</Typography>
                  
                </Stack>
              </Item>
            ))}
          </Box>
        ) : null}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <DrawerHeader />
        <Welcome />
      </Box>
    </Box>
    

  );
}

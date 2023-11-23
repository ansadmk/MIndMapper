"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { MenuItem } from "@mui/material";
import Asynchronous from "./searchBar";

const pages = ["Users", "Anounnce", "Logout",'Notifications'];

function AdminPanel() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const { data } = useSession();
  const cookie = getCookie("adminToken");
  const router = useRouter();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleout = () => {
    data ? signOut() : deleteCookie("adminToken");
    router.push("/");
  };

  const bar = (setting, s) => {
    if (s != 1) {
      handleCloseNavMenu();
    }
    setting == "Logout"
      ? handleout()
      : setting == "Anounnce"
      ? router.push("/admin/announce")
      : setting == "Users"
      ? router.push("/admin")
      : null;

      if (setting=="Notifications") {
        router.push('/admin/Notifications')
      }
  };

  return (
    <AppBar position="sticky" color="">
      {cookie ? null : router.push("/")}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image
            src="/icon..svg"
            alt="me"
            width="32"
            height="32"
            className="img-fluid mb-2"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MindMapper <i> AdminPanel</i>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" onClick={() => bar(page, 1)}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MindMapper <i> AdminPanel</i>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Asynchronous/>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => bar(page)}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AdminPanel;

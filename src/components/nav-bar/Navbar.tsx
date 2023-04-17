import * as React from "react";
import { MouseEventHandler } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./styles.css";
import AdbIcon from "@mui/icons-material/Adb";
import { ChevronRight } from "@mui/icons-material";
const pages = ["Home", "Create account"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElStatistic, setAnchorElStatistic] =
    React.useState<null | HTMLElement>(null);

  const [anchorElExpand, setAnchorElExpand] =
    React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // for statistics dropdown item and expand item
  const open = Boolean(anchorElStatistic);
  const openExpand = Boolean(anchorElExpand);

  const handleClose = () => {
    setAnchorElStatistic(null);
    setTimeout(() => {
      document.getElementById("expanded")!.classList.remove("expand");
    }, 170);
  };

  const handleExpandClose = () => {
    setAnchorElExpand(null);
  };
  const handleClick = (event: any) => {
    setAnchorElStatistic(event.currentTarget);

    document.getElementById("expanded")!.classList.add("expand");
  };

  const handleExpand = (event: any) => {
    setAnchorElExpand(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static">
      <Container className="secondary-color" maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src="/src/assets/icons/My project 1.png"
            alt="logo-image"
            style={{ width: "100px", marginLeft: "0px" }}
          />

          {/* Toggle box */}
          <Box
            className="toggle-box"
            sx={{
              flexGrow: 1,
              display: { xs: "block", sm: "none" },
            }}
          >
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
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ marginBottom: "20px" }}
                >
                  <div className="collapsed-item-container">
                    {index == 0 ? (
                      <HomeIcon sx={{ color: "white" }} />
                    ) : (
                      <GroupsIcon sx={{ color: "white" }} />
                    )}
                    <Typography
                      sx={{
                        fontWeight: "500",
                        display: "inline",
                        marginLeft: "10px",
                        color: "white",
                      }}
                      textAlign="center"
                    >
                      {page}
                    </Typography>
                  </div>
                </MenuItem>
              ))}

              <MenuItem
                onClick={handleExpand}
                id="Expand-button"
                aria-controls={openExpand ? "Expand-Menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openExpand ? "true" : undefined}
              >
                <SignalCellularAltIcon sx={{ color: "white" }} />
                <Typography
                  sx={{
                    fontWeight: "500",
                    display: "inline",
                    marginLeft: "10px",
                    color: "white",
                    textDecoration: "none",
                  }}
                  textAlign="center"
                >
                  {" "}
                  Statistics
                </Typography>
                <ChevronRight sx={{ color: "white", marginLeft: "auto" }} />
              </MenuItem>
            </Menu>
            <Menu
              sx={{ marginTop: "8px", marginLeft: "0px", borderRadius: "0px"! }}
              open={openExpand}
              id="Expand-Menu"
              anchorEl={anchorElExpand}
              MenuListProps={{
                "aria-labelledby": "Expand-button",
              }}
              onClose={handleExpandClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <MenuItem
                sx={{ color: "white", marginBottom: "20px" }}
                onClick={handleExpandClose}
              >
                {" "}
                Registry Center{" "}
              </MenuItem>
              <MenuItem
                sx={{ color: "white", marginBottom: "20px" }}
                onClick={handleExpandClose}
              >
                {" "}
                Car registry
              </MenuItem>
              <MenuItem sx={{ color: "white" }} onClick={handleExpandClose}>
                {" "}
                Near-expired
              </MenuItem>
            </Menu>
          </Box>

          {/* Menu Box */}
          <Box
            className="menu-box"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page, index) => (
              <div key={index}>
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: "white",
                    marginBottom: "3px",
                    marginLeft: "1vw",
                  }}
                >
                  {index == 0 ? (
                    <HomeIcon sx={{ marginRight: "10px" }} />
                  ) : (
                    <GroupsIcon sx={{ marginRight: "10px" }} />
                  )}
                  <Typography sx={{ fontWeight: "500" }}>{page}</Typography>
                </MenuItem>
              </div>
            ))}
            <MenuItem
              sx={{ color: "white", marginBottom: "3px", marginLeft: "1vw" }}
              id="statistics-button"
              onClick={handleClick}
              aria-controls={open ? "Statistics-Menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <SignalCellularAltIcon sx={{ marginRight: "10px" }} />
              <Typography sx={{ fontWeight: "500" }}>Statistics</Typography>
              <KeyboardArrowDownIcon />
            </MenuItem>
            <Menu
              open={open}
              id="Statistics-Menu"
              anchorEl={anchorElStatistic}
              MenuListProps={{
                "aria-labelledby": "statistics-button",
              }}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem sx={{ color: "white" }} onClick={handleClose}>
                {" "}
                Registry Center{" "}
              </MenuItem>
              <MenuItem sx={{ color: "white" }} onClick={handleClose}>
                {" "}
                Car registry
              </MenuItem>
              <MenuItem sx={{ color: "white" }} onClick={handleClose}>
                {" "}
                Near-expired
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        <div id="expanded"></div>
      </Container>
    </AppBar>
  );
}
export default Navbar;
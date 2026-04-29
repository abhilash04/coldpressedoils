import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  Avatar,
  Typography,
  Popover,
  Tab,
  ListItem,
  List,
  useMediaQuery,
  useTheme
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { config } from "../../config/config";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useFetch from "../pages/useFetch";
import MenuIcon from "@mui/icons-material/Menu";
import WindowSharpIcon from "@mui/icons-material/WindowSharp";
import TranslateSharpIcon from "@mui/icons-material/TranslateSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import Logo from "../../assets/amruthadharee_logo.png";
import { 
  Tabs, 
  Tab as MuiTab 
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LockIcon from "@mui/icons-material/Lock";
import FeedbackIcon from "@mui/icons-material/Feedback";
import HistoryIcon from "@mui/icons-material/History";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Header = ({ toggleSideNav }) => {
  const { name, roles } = useFetch();
  const location = useLocation();
 
  const [cookies, , removeCookie] = useCookies([config.cookieName]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("1");
  const [activeItem, setActiveItem] = useState(0);
  const [openProfile, setOpenProfile] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));

  console.log(name, "stud");
  console.log(roles, "rol");
  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie(config.cookieName);
    navigate("/");
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Grid
        sx={{
          width: isMobile ? "100%" : "100%",
          height: isMobile ? "60px" : isSmallScreen ? "80px" : "110px",
          background: "rgba(255, 255, 255, 0.7)",

          top: 0,
          position: "sticky",
          zIndex: 5,
        }}
      >
        <Grid
          container
          md={12}
          xs={12}
          sx={{
            px: isMobile ? 1 : isSmallScreen ? 2 : 5,
            py: isMobile ? 1 : isSmallScreen ? 2 : 3,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            md={4}
            xs={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 0,
            }}
          >
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <MenuIcon
                sx={{
                  fontSize: isSmallScreen ? 20 : 25,
                  color: "#1d1a57",
                  display: "block",
                }}
                onClick={toggleSideNav}
              />
            </Grid>
            <Box
              component="img"
              src={Logo}
              alt="logo"
              sx={{
                height: isMobile ? "45px" : isSmallScreen ? "65px" : "90px",
                width: "auto",
                cursor: "pointer",
                ml: 0
              }}
              onClick={() => navigate("/")}
            />
            <Grid sx={{ background: "#FFF", borderRadius: "5px", display: isMobile ? "none" : "block" }}>
              <TextField
                type="text"
                size="small"
                value=""
                placeholder="search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: "#1D1A57",
                          fontSize: isMobile ? 10 : "auto",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: isMobile ? "90px" : "200px",
                  fontSize: isMobile ? 10 : isSmallScreen ? 12 : "auto",
                  "& .MuiInputBase-input": {
                    height: isMobile
                      ? "6px"
                      : isSmallScreen
                      ? "12px"
                      : "15px",
                    fontSize: isMobile ? 10 : isSmallScreen ? 12 : "auto",
                  },
                  border: "1px solid #1d1a57",
                  borderRadius: "5px",
                }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            md={4}
            xs={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: isMobile ? 2 : 4,
            }}
          >
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WindowSharpIcon
                sx={{
                  fontSize: isMobile ? 10 : isSmallScreen ? 20 : 25,
                  color: "#1d1a57",
                }}
              />
            </Grid>
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TranslateSharpIcon
                sx={{
                  fontSize: isMobile ? 10 : isSmallScreen ? 20 : 25,
                  color: "#1d1a57",
                }}
              />
            </Grid>
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NotificationsIcon
                sx={{
                  fontSize: isMobile ? 10 : isSmallScreen ? 20 : 25,
                  color: "#1d1a57",
                }}
              />
            </Grid>
            <Grid
              sx={{
                width: isMobile ? 15 : isSmallScreen ? 30 : 40,
                height: isMobile ? 15 : isSmallScreen ? 30 : 40,
              }}
            >
              <Avatar
                onClick={handleClick}
                sx={{
                  width: isMobile ? 15 : isSmallScreen ? 30 : 40,
                  height: isMobile ? 15 : isSmallScreen ? 30 : 40,
                  cursor: "pointer",
                  backgroundColor: "#1D1A57",
                  borderRadius: "50%",
                }}
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{
                  mt: 1,
                }}
                PaperProps={{
                  sx: {
                    borderRadius: 3,
                  },
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 20,
                    py: isMobile ? 1 : 2,
                    width: isMobile ? "175px" : "300px",
                  }}
                >
                  <Grid
                    container
                    md={12}
                    xs={12}
                    sx={{
                      width: "90%",
                      borderRadius: 10,

                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: isMobile ? 1 : 2,
                    }}
                  >
                    <Grid
                      item
                      md={9}
                      xs={9}
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Grid>
                        <Avatar
                          sx={{
                            width: isMobile ? 20 : 40,
                            height: isMobile ? 20 : 40,
                            cursor: "pointer",
                            backgroundColor: "#1D1A57",
                            borderRadius: "50%",
                          }}
                        />
                      </Grid>

                      <Grid sx={{ mx: isMobile ? 1 : 2 }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: isMobile ? "12px" : "16px",
                          }}
                        >
                          {name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#95959B",
                            fontSize: isMobile ? "8px" : "13px",
                          }}
                        >
                          {roles}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      md={3}
                      xs={3}
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                      }}
                      onClick={handleLogout}
                    >
                      <LogoutSharpIcon
                        sx={{
                          color: "#1D1A57",
                          fontSize: isMobile ? 15 : 25,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid sx={{ mt: isMobile ? 1 : 3 }}>
                  <Grid sx={{ mt: isMobile ? 1 : 3 }}>
                    <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs 
                        value={value} 
                        onChange={(e, nv) => setValue(nv)} 
                        variant="fullWidth"
                        sx={{
                          "& .MuiTabs-indicator": { background: "#1d1a57" },
                          "& .MuiTab-root": { color: "#5B6B79", "&.Mui-selected": { color: "#1d1a57" } }
                        }}
                      >
                        <MuiTab value="1" label="Profile" sx={{ textTransform: 'none' }} />
                        <MuiTab value="2" label="Settings" sx={{ textTransform: 'none' }} />
                      </Tabs>
                    </Box>
                    
                    {value === "1" && (
                      <List sx={{ cursor: "pointer", p: 2 }}>
                        <ListItem onClick={() => handleItemClick(0)} sx={{ borderRadius: 1, mb: 1, color: activeItem === 0 ? "#1D1A57" : "#5B6B79", bgcolor: activeItem === 0 ? "#f0f8ff" : "transparent" }}>
                          <BorderColorRoundedIcon sx={{ mr: 2 }} /> Edit Profile
                        </ListItem>
                        <ListItem onClick={() => { handleLogout(); }} sx={{ borderRadius: 1, color: "#5B6B79" }}>
                          <LogoutRoundedIcon sx={{ mr: 2 }} /> Logout
                        </ListItem>
                      </List>
                    )}
                    {value === "2" && (
                      <List sx={{ cursor: "pointer", p: 2 }}>
                        <ListItem sx={{ borderRadius: 1 }}>
                          <SupportAgentIcon sx={{ mr: 2 }} /> Support
                        </ListItem>
                      </List>
                    )}
                  </Grid>
                  </Grid>
                </Grid>
              </Popover>
            </Grid>
          </Grid>
        </Grid>
        <Grid></Grid>
      </Grid>
    </>
  );
};

export default Header;

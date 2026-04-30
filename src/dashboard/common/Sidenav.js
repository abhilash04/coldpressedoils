import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  ListItemButton,
  Grid,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/amruthadharee_logo.png";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UniversityIcon from "@mui/icons-material/School";
import PartnerIcon from "@mui/icons-material/People";
import LeadsIcon from "@mui/icons-material/BusinessCenter";
import EmployeeIcon from "@mui/icons-material/Person";
import BlogIcon from "@mui/icons-material/Description";
import LoginIcon from "@mui/icons-material/Login";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailIcon from "@mui/icons-material/Mail";
import {
  School as SchoolIcon,
  LibraryBooks as LibraryBooksIcon,
  Person as PersonIcon,
  Event as EventIcon,
  LocalLibrary as LocalLibraryIcon,
  SportsHandball as SportsHandballIcon,
  BusinessCenter as BusinessCenterIcon,
  Explore as ExploreIcon,
} from "@mui/icons-material";
import WorkIcon from "@mui/icons-material/Work";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CachedIcon from "@mui/icons-material/Cached";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PlusIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AddIcon from "@mui/icons-material/Add";
import BookIcon from "@mui/icons-material/Book";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../config/config";
import { getUser } from "../../global/redux/action";
import BuildIcon from "@mui/icons-material/Build";

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [openSubList, setOpenSubList] = useState({});
  const isSmallScreen = useMediaQuery(
    "(min-width:1024px) and (max-width:1440px)"
  );

  const [cookies] = useCookies();
  const globalState = useSelector((state) => state);
  const { userData, userError } = globalState.userReducer;
  const dispatch = useDispatch();
  useEffect(() => {
    menuItems.forEach((item, index) => {
      if (item.subItems.some((subItem) => subItem.path === location.pathname)) {
        setOpenSubList((prevOpenSubList) => ({
          ...prevOpenSubList,
          [index]: true,
        }));
      }
    });
  }, [location.pathname]);

  const handleSubListClick = (index) => {
    setOpenSubList((prevOpenSubList) => ({
      ...prevOpenSubList,
      [index]: !prevOpenSubList[index],
    }));
  };

  const handleNavigation = (path, parentIndex) => {
    navigate(path);
    setOpenSubList((prevOpenSubList) => ({
      ...prevOpenSubList,
      [parentIndex]: true,
    }));
  };

  useEffect(() => {
    setOpen(true);
  }, [location.pathname]);

  useEffect(() => {
    if (userError) {
      alert(
        "Something went wrong while fetching user details. Please try again later!"
      );
    }
  }, [userError]);

  useEffect(() => {
    if (cookies[config.cookieName]?.loginUserId && !userData?.users) {
      dispatch(
        getUser({ id: cookies[config.cookieName].loginUserId, cookies })
      );
    }
  }, [dispatch, cookies, userData]);

  const userRole = userData?.users?.roles || [];
  const getMenuItemsBasedOnRole = (userRoles) => {
    return [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        path: "/dashboard",
        subItems: [],
      },
      // {
      //   text: "Web Settings",
      //   icon: <SettingsIcon />,
      //   subItems: [
      //     {
      //       text: "College List",
      //       icon: <SchoolIcon />,
      //       path: "/university-manager/college-list",
      //     },
      //     {
      //       text: "Add New College",
      //       path: "/university-manager/add-college",
      //       icon: <LibraryBooksIcon />,
      //     },
      //     {
      //       text: "Add Main College",
      //       path: "/university-manager/add-main-college",
      //       icon: <LibraryBooksIcon />,
      //     },
      //     {
      //       text: "Universities List",
      //       path: "/university-manager/university-list",
      //       icon: <SchoolIcon />,
      //     },
      //     {
      //       text: "Course List",
      //       path: "/university-manager/course-list",
      //       icon: <EventIcon />,
      //     },
      //     {
      //       text: "Amenities",
      //       path: "/university-manager/amenities",
      //       icon: <LocalLibraryIcon />,
      //     },

      //     {
      //       text: "Placement Companies",
      //       path: "/university-manager/placement-company",
      //       icon: <SportsHandballIcon />,
      //     },
      //     {
      //       text: "Type of Colleges",
      //       path: "/university-manager/college-type",
      //       icon: <BusinessCenterIcon />,
      //     },
      //     {
      //       text: "Type of Institute",
      //       path: "/university-manager/institute-type",
      //       icon: <ExploreIcon />,
      //     },
      //   ],
      // },
      {
        text: "Inventory Manager",
        icon: <SettingsIcon />,
        subItems: [
          {
            text: "Product List",
            icon: <SchoolIcon />,
            path: "/inventory-manager/product-list",
          },
          {
            text: "Add New Product",
            path: "/inventory-manager/add-new-product",
            icon: <LibraryBooksIcon />,
          },
          {
            text: "Categories",
            path: "/inventory-manager/categories",
            icon: <LocalLibraryIcon />,
          },
        ],
      },
      {
        text: "Leads Manager",
        icon: <LeadsIcon />,
        subItems: [
          {
            text: "Fresh Leads",
            path: "/lead-manager/fresh",
            icon: <PlaylistAddCheckIcon />,
          },
          {
            text: "Fake Leads",
            path: "/lead-manager/fake",
            icon: <DoNotDisturbAltIcon />,
          },
          {
            text: "Follow-up Leads",
            path: "/lead-manager/follow-up",
            icon: <ThumbUpOffAltIcon />,
          },
          {
            text: "Converted Leads",
            path: "/lead-manager/converted",
            icon: <CachedIcon />,
          },
          {
            text: "Generate Leads",
            path: "/lead-manager/generate",
            icon: <AutoAwesomeIcon />,
          },
        ],
      },
      // {
      //   text: "Developer Tools",
      //   icon: <BuildIcon />,
      //   subItems: [
      //     {
      //       text: "Users",
      //       path: "/employee-manager/users",
      //       icon: <PersonIcon />,
      //     },
      //     {
      //       text: "Add New User",
      //       path: "/employee-manager/add-user",
      //       icon: <PersonIcon />,
      //     },
      //   ],
      // },
      {
        text: "Employees Manager",
        icon: <EmployeeIcon />,
        subItems: [
          {
            text: "Users",
            path: "/employee-manager/users",
            icon: <PersonIcon />,
          },
          {
            text: "Add New User",
            path: "/employee-manager/add-user",
            icon: <PersonIcon />,
          },
        ],
      },
      // {
      //   text: "Blog",
      //   icon: <BlogIcon />,
      //   subItems: [
      //     { text: "Add Blog", path: "/blog-manager/add-blog", icon: <PlusIcon /> },
      //     { text: "Blog List", path: "/blog-manager/blog-list", icon: <ListIcon /> },
      //   ],
      // },
      // {
      //   text: "SEO",
      //   icon: <BlogIcon />,
      //   subItems: [
      //     {
      //       text: "Add Site",
      //       path: "/seo-manager/add-sites",
      //       icon: <AddIcon />,
      //     },
      //     {
      //       text: "Static Page",
      //       path: "/seo-manager/static-pages",
      //       icon: <ArticleOutlinedIcon />,
      //     },
      //     {
      //       text: "Blog",
      //       path: "/seo-manager/blog",
      //       icon: <ArticleOutlinedIcon />,
      //     },
      //   ],
      // },
      // {
      //   text: "Web Approval",
      //   icon: <VerifiedUserIcon />,
      //   subItems: [
      //     {
      //       text: "College List",
      //       path: "/college-approval/college-approve-list",
      //       icon: <SchoolIcon />,
      //     },
      //     {
      //       text: "Approved College",
      //       path: "/college-approval/approved-college-list",
      //       icon: <LibraryBooksIcon />,
      //     },
      //   ],
      // },
      // {
      //   text: "Blog Approval",
      //   icon: <FactCheckIcon />,
      //   subItems: [
      //     {
      //       text: "Blog List",
      //       path: "/blog-approval/blog-approve-list",
      //       icon: <BookIcon />,
      //     },
      //     {
      //       text: "Approved Blog",
      //       path: "/blog-approval/approved-blog-list",
      //       icon: <LibraryBooksIcon />,
      //     },
      //   ],
      // },
    ].filter((item) => {
      for (let role of userRoles) {
        switch (role) {
          case "Super Admin":
            return true;
          case "Admin":
            if (
              [
                "Dashboard",
                "Web Settings",
                "Leads Manager",
                "Employees Manager",
                "Blog",
                "College Approval",
                "Blog Approval",
                "Developer Tools"
              ].includes(item.text)
            )
              return true;
            break;
          case "Team Leader":
          case "Telecaller":
            if (["Dashboard", "Leads Manager"].includes(item.text)) return true;
            break;
          case "Blog Author":
            if (["Dashboard", "Blog"].includes(item.text)) return true;
            break;
          case "Partner":
            if (["Dashboard", "Leads Manager"].includes(item.text)) return true;
            break;
          case "Interns":
            if (["Dashboard", "University / Colleges"].includes(item.text))
              return true;
            break;
          case "SEODataPro":
            if (["Dashboard", "SEO"].includes(item.text)) return true;
            break;
          case "DataAssure":
            if (
              [
                "Dashboard",
                "College Approval",
                "Blog Approval",
              ].includes(item.text)
            )
              return true;
            break;
          default:
            break;
        }
      }
      return false;
    });
  };
  const menuItems = getMenuItemsBasedOnRole(userRole);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const openPopper = Boolean(anchorEl);
  const id = openPopper ? "simple-popover" : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: isSmallScreen ? 225 : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSmallScreen ? 225 : drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgb(24, 20, 20)",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.4)",
            cursor: "pointer",
          }}
        >
          <Grid
            sx={{
              my: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: isSmallScreen ? 50 : 75,
              height: isSmallScreen ? 40 : 65,
            }}
          >
            <img
              src={Logo}
              alt="logo"
              style={{ height: "100%", objectFit: "cover" }}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            overflow: "auto",
          }}
        >
          <List>
            {menuItems.map((item, index) => (
              <div key={index} style={{ px: 2 }}>
                <ListItem
                  button
                  onClick={() =>
                    item.path
                      ? handleNavigation(item.path, index)
                      : handleSubListClick(index)
                  }
                  sx={{
                    "&:hover": {
                      background: "#f0f8ff",
                    },
                    background:
                      location.pathname === item.path
                        ? "#f0f8ff"
                        : "transparent",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    {React.cloneElement(item.icon, {
                      sx: {
                        fontSize: isSmallScreen ? 29 : 30,
                        color:
                          location.pathname === item.path ? "gray" : "#1D1A57",
                        py: "2px",
                        px: 1,
                      },
                    })}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          color:
                            location.pathname === item.path
                              ? "gray"
                              : "#1d1a57",
                          fontSize: isSmallScreen ? 13 : 14,
                          fontWeight: 600,
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                  {item.subItems.length > 0 ? (
                    openSubList[index] ? (
                      <ExpandLess sx={{ fontSize: isSmallScreen ? 17 : 20 }} />
                    ) : (
                      <ExpandMore sx={{ fontSize: isSmallScreen ? 17 : 20 }} />
                    )
                  ) : null}
                </ListItem>
                {item.subItems.length > 0 && (
                  <Collapse
                    in={openSubList[index]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItemButton
                          key={subIndex}
                          sx={{
                            pl: 4,
                            py: isSmallScreen ? "2px" : "5px",
                            "&:hover": {
                              background: "#f0f8ff",
                            },
                            background:
                              location.pathname === subItem.path
                                ? "#f0f8ff"
                                : "transparent",
                          }}
                          onClick={() => handleNavigation(subItem.path, index)}
                        >
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            {subItem.icon &&
                              React.cloneElement(subItem.icon, {
                                sx: {
                                  fontSize: isSmallScreen ? 26 : 30,
                                  color:
                                    location.pathname === subItem.path
                                      ? "gray"
                                      : "#1D1A57",

                                  px: 1,
                                },
                              })}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                sx={{
                                  color:
                                    location.pathname === subItem.path
                                      ? "gray"
                                      : "#1d1a57",
                                  fontSize: isSmallScreen ? 13 : 14,
                                }}
                              >
                                {subItem.text}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: 0,
          width: isSmallScreen ? 225 : drawerWidth,
          zIndex: 1300,
          px: 2
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          startIcon={<LoginIcon />}
          onClick={() => {
            const cookieName = config.cookieName;
            document.cookie = `${cookieName}=; Max-Age=0; path=/;`;
            window.location.href = "/";
          }}
          sx={{
            color: "#C62828",
            borderColor: "#C62828",
            borderRadius: 0,
            "&:hover": { bgcolor: "#FFF5F5", borderColor: "#C12828" }
          }}
        >
          LOGOUT
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;

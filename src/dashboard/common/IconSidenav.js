import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  Grid,
  Typography,
  useMediaQuery,
  Popover,
} from "@mui/material";
import { useEffect } from "react";
import {
  School as UniversityIcon,
  People as PartnerIcon,
  BusinessCenter as LeadsIcon,
  Person as EmployeeIcon,
  LocationOn as AddressManagerIcon,
  Description as BlogIcon,
} from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import { getUser } from "../../global/redux/action";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../config/config";
import { useCookies } from "react-cookie";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import Logo from "../../assets/amruthadharee_logo.png";
// import WhatsAppIcon from "@mui/icons-logo192material/WhatsApp";
import MailIcon from "@mui/icons-material/Mail";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CachedIcon from "@mui/icons-material/Cached";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Add as PlusIcon, List as ListIcon } from "@mui/icons-material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AddIcon from "@mui/icons-material/Add";
import BookIcon from "@mui/icons-material/Book";
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
import SettingsIcon from "@mui/icons-material/Settings";
import WorkIcon from "@mui/icons-material/Work";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import BuildIcon from "@mui/icons-material/Build";

const drawerWidth = 100;
const isMobile = 75;

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies();
  const globalState = useSelector((state) => state);
  const { userData, userError } = globalState.userReducer;
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );
  const isSmallScreen = useMediaQuery(
    "(min-width:1024px) and (max-width:1440px)"
  );
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
      // {
      //   text: "Web Settings",
      //   icon: <SettingsIcon />,
      //   subItems: [
      //     {
      //       text: "Page List",
      //       icon: <SchoolIcon />,
      //       path: "/university-manager/college-list",
      //     },
      //     {
      //       text: "Add New Page",
      //       path: "/web-settings/add-new-page",
      //       icon: <LibraryBooksIcon />,
      //     },
      //     {
      //       text: "Locations",
      //       path: "/web-settings/locations",
      //       icon: <LocalLibraryIcon />,
      //     },
      //   ],
      // },
      {
        text: "Leads Manager",
        icon: <LeadsIcon />,
        subItems: [
          {
            text: "Fresh Leads",
            path: "/lead-manager/fresh-leads",
            icon: <PlaylistAddCheckIcon />,
          },
          {
            text: "Fake Leads",
            path: "/lead-manager/fake-leads",
            icon: <DoNotDisturbAltIcon />,
          },
          {
            text: "Follow-up Leads",
            path: "/lead-manager/follow-leads",
            icon: <ThumbUpOffAltIcon />,
          },
          {
            text: "Converted Leads",
            path: "/lead-manager/converted-leads",
            icon: <CachedIcon />,
          },
          {
            text: "Generate Leads",
            path: "/lead-manager/generated-leads",
            icon: <AutoAwesomeIcon />,
          },
        ],
      },
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
      //   text: "College Approval",
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
          width: isMobileScreen ? isMobile : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobileScreen ? isMobile : drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f0f8ff",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.4)",
          }}
        >
          <Grid
            sx={{
              my: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: isMobileScreen ? 60 : isSmallScreen ? 75 : 95,
              height: isMobileScreen ? 60 : isSmallScreen ? 70 : 90,
            }}
          >
            <img
              src={Logo}
              alt="logo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <List>
            {menuItems.map((item, index) => (
              <div key={index} style={{ px: 2 }}>
                <ListItem
                  button
                  onClick={(event) => {
                    if (item.subItems.length === 0) {
                      navigate(item.path);
                    } else {
                      handleClick(event, index);
                    }
                  }}
                  sx={{
                    "&.MuiListItem-root": { py: isMobileScreen ? 0 : 1 },

                    "&:hover": {
                      background: "#f0f8ff",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: isMobileScreen ? 25 : 35 }}>
                    {React.cloneElement(item.icon, {
                      sx: {
                        fontSize: isMobileScreen ? 30 : isSmallScreen ? 35 : 40,
                        color:
                          item.path === location.pathname ? "gray" : "#1d1a57",
                        py: "2px",
                        px: 1,
                      },
                    })}
                  </ListItemIcon>
                </ListItem>
              </div>
            ))}
          </List>
        </Box>
      </Drawer>
      {selectedIndex !== null && menuItems[selectedIndex]?.subItems && (
        <Popover
          id={id}
          open={openPopper}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <List>
            {menuItems[selectedIndex]?.subItems.map((subItem, subIndex) => (
              <ListItem
                button
                key={subIndex}
                onClick={() => {
                  handleClose();
                  subItem.path && navigate(subItem.path);
                }}
                sx={{
                  py: "2px",
                  "&:hover": {
                    background: "#f0f8ff",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 30 }}>
                  {React.cloneElement(subItem.icon, {
                    sx: {
                      color:
                        subItem.path === location.pathname ? "gray" : "#1d1a57",
                      fontSize: isMobileScreen ? 25 : isSmallScreen ? 28 : 30,
                      px: 1,
                    },
                  })}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        color:
                          subItem.path === location.pathname
                            ? "gray"
                            : "#1d1a57",
                        fontSize: isMobileScreen ? 10 : isSmallScreen ? 11 : 14,
                      }}
                    >
                      {subItem.text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Popover>
      )}
    </Box>
  );
}

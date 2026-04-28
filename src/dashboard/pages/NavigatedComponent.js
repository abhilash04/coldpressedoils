import { Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { NavLink } from "react-router-dom";

const NavigatedComponent = ({ pathname }) => {
  let componentName;
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );
  const isSmallScreen = useMediaQuery(
    "(min-width:1024px) and (max-width:1440px)"
  );

  switch (pathname) {
    case "/dashboard":
      componentName = "Dashboard";
      break;
    case "/university-manager/college-list":
      componentName = "College List";
      break;
    case "/university-manager/add-college":
      componentName = "Add College";
      break;
    case "/university-manager/add-main-college":
      componentName = "Add Main College";
      break;
    case "/university-manager/university-list":
      componentName = "University List";
      break;
    case "/university-manager/course-list":
      componentName = "Course List";
      break;
    case "/university-manager/amenities":
      componentName = "Amenities";
      break;
    case "/university-manager/placement-company":
      componentName = "Placement Company";
      break;
    case "/university-manager/college-type":
      componentName = "College Type";
      break;
    case "/university-manager/institute-type":
      componentName = "Institute Type";
      break;
    case "/principal-login/principal-login-list":
      componentName = "Student List";
      break;
    case "/principal-login/add-student-login":
      componentName = "Add New Student";
      break;
    // case "":
    //   componentName = "Placement";
    //   break;
    //   case "":
    //     componentName = "Placement Details";
    //     break;
    case "/partner-manager/partners-list":
      componentName = "Partner List";
      break;
    case "/partner-manager/add-partner":
      componentName = "Add Partner";
      break;
    case "/newsLetter-manager/newsLetter":
      componentName = "NewsLetter";
      break;
    case "/employee-manager/users":
      componentName = "User List";
      break;
    case "/employee-manager/add-user":
      componentName = "Add User";
      break;
    case "/blog":
      componentName = "Add Blog";
      break;
    case "/blog/blog-list":
      componentName = "Blog List";
      break;
    case "/blog/view-blog/:id":
      componentName = "Blog View";
      break;
    case "/blog/edit-blog/:id":
      componentName = "Blog Edit";
      break;
    case "/lead-manager/fresh-leads":
      componentName = "Fresh Leads";
      break;
    case "/lead-manager/fake-leads":
      componentName = "Fake Leads";
      break;
    case "/lead-manager/follow-leads":
      componentName = "Follow-Up Leads";
      break;
    case "/lead-manager/converted-leads":
      componentName = "Converted Leads";
      break;
    case "/lead-manager/generated-leads":
      componentName = "Generated Leads";
      break;
    case "/college-approval/college-approve-list":
      componentName = "College Approve List";
      break;
    case "/college-approval/approved-college-list":
      componentName = "Approved College List";
      break;
    case "/blog-approval/blog-approve-list":
      componentName = "Blog Approve List";
      break;
    case "/blog-approval/approved-blog-list":
      componentName = "Approved blog List";
      break;
    case "/seo-manager/add-sites":
      componentName = "Add Site";
      break;
    case "/seo-manager/static-pages":
      componentName = "Static Page";
      break;
    case "/seo-manager/colleges":
      componentName = "College";
      break;
    case "/email-messenger":
      componentName = "Email Messenger";
      break;
    case "/whatsapp-messenger":
      componentName = "Whatsapp Messenger";
      break;
    default:
      componentName = "Dashboard";
  }
  return (
    <Grid
      container
      md={12}
      sx={{ px: isMobileScreen ? 1 : isSmallScreen ? 2 : 5 }}
    >
      <Grid item md={6} xs={6}>
        <Typography
          sx={{ fontSize: isMobileScreen ? 12 : 16, fontWeight: 600 }}
        >
          {componentName}
        </Typography>
      </Grid>
      <Grid
        item
        md={6}
        xs={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <NavLink
          to="/dashboard"
          style={{
            textDecoration: "none",
            color: "#000",
            fontSize: isMobileScreen ? 9 : isSmallScreen ? 12 : 14,
          }}
        >
          Dashboard
        </NavLink>
        <ArrowForwardIosOutlinedIcon
          sx={{
            color: "#07070C",
            fontSize: isMobileScreen ? 8 : isSmallScreen ? 10 : 12,
            mx: isMobileScreen ? "2px" : isSmallScreen ? "6px" : 1,
          }}
        />
        <Typography
          sx={{
            color: "#95959B",
            fontSize: isMobileScreen ? 9 : isSmallScreen ? 12 : 14,
          }}
        >
          {componentName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NavigatedComponent;

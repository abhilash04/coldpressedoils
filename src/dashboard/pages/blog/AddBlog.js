import React, { useState } from "react";
import Sidenav from "../../common/Sidenav";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import {
  Grid,
  Button,
  InputLabel,
  Typography,
  TextField,
  Box,
  Card,
  Divider,
  Snackbar,
  Alert,
  useMediaQuery,
  MenuItem,
  Select,
} from "@mui/material";

import Header from "../../common/Header";
import { Add as PlusIcon, List as ListIcon } from "@mui/icons-material";
import NavigatedComponent from "../NavigatedComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";
import IconSidenav from "../../common/IconSidenav";

const AddBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies();
  const [bannerImage, setBannerImage] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const isMobileScreen = useMediaQuery("(min-width:360px) and (max-width:500px)");

  const [blog, setBlog] = useState({
    blogTitle: "",
    blogContent: "",
    tableOfContent: "",
    ogUrl: "",
    category: "--Select--",
    bannerUrl: "",
    featuredUrl: "",
  });
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => setShowSideNav(!showSideNav);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBlog((prevState) => ({ ...prevState, [name]: value }));
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await invokeApi(config.apiUrl + apiList.addBlog, blog, cookies);
      if (response?.status === 200) {
        showSnackbar("Blog Added successfully", "success");
        navigate("/blog-manager/blog-list");
      }
    } catch (error) {
      showSnackbar("Failed to add blog", "error");
    }
  };

  return (
    <>
      <Grid sx={{ display: "flex" }}>
        {isMobileScreen || showSideNav ? <IconSidenav /> : <Sidenav />}
        <Grid component="main" sx={{ width: "100%", px: 1 }}>
          <Header toggleSideNav={toggleSideNav} />
          <Grid sx={{ py: 1 }}>
            <NavigatedComponent pathname={location.pathname} />
            <Grid sx={{ width: "100%", px: isMobileScreen ? 1 : 5 }}>
              <Card elevation={1} sx={{ my: 5, p: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>CREATE NEW BLOG</Typography>
                <Divider sx={{ mb: 3 }} />
                <form onSubmit={handleBlogSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Blog Title *" name="blogTitle" value={blog.blogTitle} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="OG URL *" name="ogUrl" value={blog.ogUrl} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, fontWeight: 'bold' }}>Table of Content</InputLabel>
                      <TextField fullWidth multiline rows={4} name="tableOfContent" value={blog.tableOfContent} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, fontWeight: 'bold' }}>Blog Content</InputLabel>
                      <TextField fullWidth multiline rows={10} name="blogContent" value={blog.blogContent} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                      <Button type="submit" variant="contained" size="large" sx={{ bgcolor: "#1d1a57" }}>
                        <DriveFolderUploadIcon sx={{ mr: 1 }} /> PUBLISH BLOG
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </>
  );
};

export default AddBlog;

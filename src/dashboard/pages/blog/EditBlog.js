import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Card,
  Divider,
  InputLabel,
  Alert,
  Snackbar,
  useMediaQuery,
  Autocomplete,
  Paper,
  MenuItem,
  Select,
} from "@mui/material";
import Sidenav from "../../common/Sidenav";
// import ReactQuill from "react-quill";
import Header from "../../common/Header";
import { Add as PlusIcon, List as ListIcon } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { DropzoneArea } from "mui-file-dropzone";
import { config } from "../../../config/config";
import { apiList, invokeApi } from "../../../services/apiServices";
import { useCookies } from "react-cookie";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconSidenav from "../../common/IconSidenav";
import JoditEditor from "jodit-react";

const EditBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const blogData = location.state.blogData;

  const [blogDetails, setBlogDetails] = useState(blogData);

  const [cookies] = useCookies();
  const [bannerImage, setBannerImage] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [selectedBannerImage, setSelectedBannerImage] = useState(
    blogData.bannerUrl
  );
  const [selectedFeaturedImage, setSelectedFeaturedImage] = useState(
    blogData.featuredUrl
  );

  const [collegeLogoChanged, setCollegeLogoChanged] = useState(false);
  const [bannerImageChanged, setBannerImageChanged] = useState(false);
  const [featuredImageChanged, setFeaturedImageChanged] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [originalBlogDetails, setOriginalBlogDetails] = useState({
    ...blogDetails,
  });
  const [categoryData, setCategoryData] = useState([]);
  const [showSideNav, setShowSideNav] = useState(false);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );
  const [loading, setLoading] = useState(false);
  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBlogDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputContentChange = (name, value) => {
    setBlogDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCategoryTypeChange = (event, newValue) => {
    setBlogDetails((prevState) => ({
      ...prevState,
      category: newValue,
    }));
  };

  const handleBannerImage = (files) => {
    if (files && files.length > 0) {
      setBannerImageChanged(true);
      const selectedBannerFile = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedBannerImage(reader.result);
        setBannerImage(selectedBannerFile);
      };
      reader.readAsDataURL(selectedBannerFile);
    } else {
      setSelectedBannerImage("");
      setBannerImage(null);
      setBannerImageChanged(false);
    }
  };

  const handleFeaturedImage = (files) => {
    if (files && files.length > 0) {
      setFeaturedImageChanged(true);
      const selectedFeaturedFile = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFeaturedImage(reader.result);
        setFeaturedImage(selectedFeaturedFile);
      };
      reader.readAsDataURL(selectedFeaturedFile);
    } else {
      setSelectedFeaturedImage("");
      setFeaturedImage(null);
      setFeaturedImageChanged(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleAddBannerImage = async () => {
    const formData = new FormData();
    formData.append("banner", bannerImage);
    try {
      const response = await invokeFormDataApi(apiList.addBlogBanner, formData);

      if (response?.status >= 200 && response?.status < 300) {
        return response.data.bannerUrl || "";
      } else {
        showSnackbar("Failed to add college banner", "error");
      }
    } catch (error) {
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };

  const handleAddCollegeFeatured = async () => {
    const formData = new FormData();
    formData.append("featured", featuredImage);
    try {
      const response = await invokeFormDataApi(apiList.addBlogFeaturedImage, formData);

      if (response?.status >= 200 && response?.status < 300) {
        return response.data.imageUrl || "";
      } else {
        showSnackbar("Failed to add college featured image", "error");
      }
    } catch (error) {
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };


  const handleAddBlog = async (updatedBlogData) => {
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.updateBlog,
        updatedBlogData,
        cookies
      );

      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          navigate("/blog-manager/blog-list");
        } else if (response.data.responseCode === "400") {
          showSnackbar(response.data.message, "error");
        }
      }
    } catch (error) {
      console.error("Error during adding college:", error);
      showSnackbar("Something went wrong. Please try again later!!", "error");
    }
  };

  const handleBlogSubmit = async (event) => {
    try {
      const bannerUrl = bannerImageChanged
        ? await handleAddBannerImage()
        : originalBlogDetails.bannerUrl;

      const featuredUrl = featuredImageChanged
        ? await handleAddCollegeFeatured()
        : originalBlogDetails.featuredUrl;

      const updatedBlogData = {
        id: blogDetails.id,
        blogTitle: blogDetails.blogTitle,
        tableOfContent: blogDetails.tableOfContent,
        category: blogDetails.category,
        blogContent: blogDetails.blogContent,
        ogUrl: blogDetails.ogUrl,
        bannerUrl,
        featuredUrl,
      };

      await handleAddBlog(updatedBlogData);
    } catch (error) {
      console.error("Error while adding blog details:", error);
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };

  return (
    <div>
      <Grid sx={{ display: "flex" }}>
        {isMobileScreen ? (
          <IconSidenav />
        ) : showSideNav ? (
          <IconSidenav />
        ) : (
          <Sidenav />
        )}
        <Grid component="main" sx={{ width: "100%", px: 1 }}>
          <Header toggleSideNav={toggleSideNav} />

          <Grid sx={{ width: "100%", px: isMobileScreen ? 1 : 5 }}>
            <Card elevation={1} sx={{ my: 5 }}>
              <Grid sx={{ py: isMobileScreen ? 2 : 2 }}>
                <Typography
                  sx={{
                    mb: 2,
                    mx: isMobileScreen ? 2 : 8,
                    textAlign: "left",
                    fontSize: isMobileScreen ? 14 : 18,
                    fontWeight: 600,
                    // textDecorationLine: "underline",
                    textTransform: "uppercase",
                  }}
                >
                  Edit Blog
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid
                  container
                  md={12}
                  xs={12}
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    my: 2,
                  }}
                >
                  <Grid item md={11} xs={11} sx={{ my: 2 }}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Blog Title *
                    </InputLabel>
                    <TextField
                      placeholder="Enter Blog Title"
                      fullWidth
                      name="blogTitle"
                      value={blogDetails.blogTitle}
                      onChange={handleInputChange}
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item md={11} xs={11} sx={{ my: 2 }}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      OG URL *
                    </InputLabel>
                    <TextField
                      placeholder=""
                      fullWidth
                      name="ogUrl"
                      value={blogDetails.ogUrl}
                      onChange={handleInputChange}
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item md={11} xs={11} sx={{ my: 2 }}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Category *
                    </InputLabel>
                    <Select
                      fullWidth
                      name="category"
                      value={blogDetails.category}
                      onChange={handleInputChange}
                      style={{
                        height: isMobileScreen ? "35px" : "40px",
                        fontSize: isMobileScreen ? 12 : 14,
                      }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: "200px",
                          },
                        },
                      }}
                    >
                      <MenuItem value="--Select--" disabled>
                        --Select--
                      </MenuItem>
                      <MenuItem
                        value={"WashingMachine"}
                        style={{ fontSize: isMobileScreen ? 12 : 14 }}
                      >
                        Washing Machine
                      </MenuItem>
                      <MenuItem
                        value={"AirConditioner"}
                        style={{ fontSize: isMobileScreen ? 12 : 14 }}
                      >
                        Air Conditioner
                      </MenuItem>
                      <MenuItem
                        value={"Refrigerator"}
                        style={{ fontSize: isMobileScreen ? 12 : 14 }}
                      >
                        Refrigerator
                      </MenuItem>
                      <MenuItem
                        value={"WaterPurifier"}
                        style={{ fontSize: isMobileScreen ? 12 : 14 }}
                      >
                        Water Purifier
                      </MenuItem>
                      <MenuItem
                        value={"DishWasher"}
                        style={{ fontSize: isMobileScreen ? 12 : 14 }}
                      >
                        Dish Washer
                      </MenuItem>
                      <MenuItem
                        value={"MotorCycle"}
                        style={{ fontSize: isMobileScreen ? 12 : 14 }}
                      >
                        Motor Cycle
                      </MenuItem>
                      <MenuItem
                        value={"Sofa"}
                        style={{ fontSize: isMobileScreen ? 12 : 14 }}
                      >
                        Sofa
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid item md={11} xs={11} sx={{ my: 2 }}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Table of Content
                    </InputLabel>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        my: isMobileScreen ? 2 : 2,
                        mb: isMobileScreen ? 15 : 1,
                      }}
                    >
                      <JoditEditor
                        value={blogDetails.tableOfContent}
                        tabIndex={1}
                        onChange={(newValue) =>
                          handleInputContentChange("tableOfContent", newValue)
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid item md={11} xs={11} sx={{ my: 2 }}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Blog Content
                    </InputLabel>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        my: isMobileScreen ? 2 : 2,
                        mb: isMobileScreen ? 15 : 1,
                      }}
                    >
                      <JoditEditor
                        value={blogDetails.blogContent}
                        onChange={(newValue) =>
                          handleInputContentChange("blogContent", newValue)
                        }
                        tabIndex={1}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    md={12}
                    sx={{
                      width: "100%",
                      justifyContent: "space-around",
                      my: 5,
                    }}
                  >
                    <Grid item md={2} xs={11}>
                      <InputLabel
                        sx={{
                          fontWeight: "bold",
                          my: 1,
                          fontSize: isMobileScreen ? 12 : 15,
                        }}
                      >
                        Banner Image
                      </InputLabel>
                      <Grid
                        sx={{
                          my: 2,
                          ".MuiBox-root ": {
                            bgcolor: "#f0f8ff",
                            borderColor: "#1d1a57",
                            minHeight: 0,
                            my: 1,
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        }}
                      >
                        <DropzoneArea
                          filesLimit={1}
                          acceptedFiles={["image/jpeg", "image/png"]}
                          onChange={handleBannerImage}
                          maxFileSize={5000000}
                          showPreviews={true}
                          showAlerts={false}
                          showPreviewsInDropzone={false}
                          showFileNames={false}
                          Icon={(props) => (
                            <CloudUploadIcon
                              style={{
                                color: "#1d1a57",
                                width: 35,
                                height: 35,
                              }}
                              {...props}
                            />
                          )}
                          dropzoneText={
                            <Typography
                              sx={{
                                color: "#1d1a57",
                                fontWeight: 600,
                                fontSize: 16,
                              }}
                            >
                              Upload / Drag files
                            </Typography>
                          }
                          previewText="Selected Banner Image:"
                        />
                      </Grid>
                      <Grid
                        sx={{
                          my: 3,
                          py: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "auto",
                          height: "auto",
                        }}
                      >
                        {selectedBannerImage && (
                          <img
                            src={selectedBannerImage}
                            alt="BannerUrl"
                            style={{ maxWidth: "90px", display: "none" }}
                          />
                        )}
                        {!selectedBannerImage && blogData.bannerUrl && (
                          <img
                            src={blogData.bannerUrl}
                            alt="BannerUrl"
                            style={{ maxWidth: "90px" }}
                          />
                        )}
                      </Grid>
                    </Grid>
                    <Grid item md={2} xs={11}>
                      <InputLabel
                        sx={{
                          fontWeight: "bold",
                          my: 1,
                          fontSize: isMobileScreen ? 12 : 15,
                        }}
                      >
                        Featured Image
                      </InputLabel>
                      <Grid
                        sx={{
                          my: 2,
                          ".MuiBox-root ": {
                            bgcolor: "#f0f8ff",
                            borderColor: "#1d1a57",
                            minHeight: 0,
                            my: 1,
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        }}
                      >
                        <DropzoneArea
                          filesLimit={1}
                          acceptedFiles={["image/jpeg", "image/png"]}
                          onChange={handleFeaturedImage}
                          maxFileSize={5000000}
                          showPreviews={true}
                          showAlerts={false}
                          showPreviewsInDropzone={false}
                          showFileNames={false}
                          Icon={(props) => (
                            <CloudUploadIcon
                              style={{
                                color: "#1d1a57",
                                width: 35,
                                height: 35,
                              }}
                              {...props}
                            />
                          )}
                          dropzoneText={
                            <Typography
                              sx={{
                                color: "#1d1a57",
                                fontWeight: 600,
                                fontSize: 16,
                              }}
                            >
                              Upload / Drag files
                            </Typography>
                          }
                          previewText="Selected Featured Image:"
                        />
                      </Grid>
                      <Grid
                        sx={{
                          my: 3,
                          py: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "auto",
                        }}
                      >
                        {selectedFeaturedImage && (
                          <img
                            src={selectedFeaturedImage}
                            alt="FeaturedUrl"
                            style={{ maxWidth: "90px", display: "none" }}
                          />
                        )}
                        {!selectedFeaturedImage && blogData.featuredUrl && (
                          <img
                            src={blogData.featuredUrl}
                            alt="FeaturedUrl"
                            style={{ maxWidth: "90px" }}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider sx={{ mb: 1 }} />
                <Grid
                  container
                  md={12}
                  xs={12}
                  sx={{
                    width: "100%",
                  }}
                >
                  <Divider sx={{ mb: 1 }} />
                  <Grid
                    container
                    spacing={isMobileScreen ? 0 : 2}
                    md={12}
                    xs={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 2,
                    }}
                  >
                    <Button
                      color="success"
                      sx={{
                        mr: 4,
                        my: 2,
                        px: 2,
                        fontSize: 12,
                        background: "#1d1a57",
                        color: "#FFF",
                        fontWeight: 600,
                        "&:hover": {
                          background: "#1d1a57",
                          color: "#FFF",
                        },
                      }}
                      onClick={handleBlogSubmit}
                    >
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={4000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              sx={{ width: "auto" }}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity={snackbarSeverity}
                sx={{ width: "auto" }}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditBlog;

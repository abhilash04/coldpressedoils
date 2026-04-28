import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  InputLabel,
  Paper,
  Snackbar,
  TextField,
  TextareaAutosize,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NavigatedComponent from "../NavigatedComponent";
import Header from "../../common/Header";
import Sidenav from "../../common/Sidenav";
import { useLocation, useNavigate } from "react-router-dom";
import { DropzoneArea } from "mui-file-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useFetch from "../useFetch";
import { apiList, invokeApi } from "../../../../../services/apiServices";
import { config } from "../../../../../config/config";
import { useCookies } from "react-cookie";
import ReactQuill from "react-quill";
import IconSidenav from "../../common/IconSidenav";

const AddMainCollege = () => {
  //     const {collegeData,getSuggestions} =useFetch()
  // console.log(collegeData,'con')
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();
  const [mainColleges, setMainColleges] = useState({
    collegeName: "",
    ogUrl: "",
    collegeLogoUrl: "",
    collegeBannerUrl: "",
    collegeFeaturedUrl: "",
    fullDescription: "",
    subColleges: "",
    mainCollegeFlag: "yes",
  });
  const [collegeLogo, setCollegeLogo] = useState("");
  const [selectedCollegeLogo, setSelectedCollegeLogo] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [selectedBannerImage, setSelectedBannerImage] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [selectedFeaturedImage, setSelectedFeaturedImage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [collegeData, setCollegeData] = useState([]);
  const [showSideNav, setShowSideNav] = useState(false);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMainColleges((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleInputChange = (value) => {
    setMainColleges((prevState) => ({
      ...prevState,
      fullDescription: value,
    }));
  };
  const handleSelectionChange = (event, newValue) => {
    const selectedIds = newValue.map((college) => college.id);
    const subCollegesString = selectedIds.join(", ");

    setMainColleges((prevFormData) => ({
      ...prevFormData,
      subColleges: subCollegesString,
    }));
  };
  const handleCollegeLogo = (files) => {
    if (files && files.length > 0) {
      const selectedCollegeLogo = files[0];
      setCollegeLogo(selectedCollegeLogo);
      setSelectedCollegeLogo(selectedCollegeLogo.name);
    } else {
      setCollegeLogo(null);
      setSelectedCollegeLogo("");
    }
  };
  const handleBannerImage = (files) => {
    if (files && files.length > 0) {
      const selectedBannerImage = files[0];
      setBannerImage(selectedBannerImage);
      setSelectedBannerImage(selectedBannerImage.name);
    } else {
      setBannerImage(null);
      setSelectedBannerImage("");
    }
  };
  const handleFeaturedImage = (files) => {
    if (files && files.length > 0) {
      const selectedFeaturedImage = files[0];
      setFeaturedImage(selectedFeaturedImage);
      setSelectedFeaturedImage(selectedFeaturedImage.name);
    }
  };
  const handleAddCollegeLogo = async () => {
    const formData = new FormData();
    formData.append("logo", collegeLogo);
    try {
      const response = await fetch(
        "https://image-upload.getmycollege.com/addCollegeLogo",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response?.status >= 200 && response?.status < 300) {
        const responseData = await response.json();
        return responseData.imageUrl || "";
      } else {
        showSnackbar("Failed to add college logo", "error");
      }
    } catch (error) {
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };

  const handleAddBannerImage = async () => {
    const formData = new FormData();
    formData.append("banner", bannerImage);
    try {
      const response = await fetch(
        `https://image-upload.getmycollege.com/addCollegeBanner`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response?.status >= 200 && response?.status < 300) {
        const responseData = await response.json();
        return responseData.bannerUrl || "";
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
      const response = await fetch(
        "https://image-upload.getmycollege.com/addCollegeFeaturedImage",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response?.status >= 200 && response?.status < 300) {
        const responseData = await response.json();
        return responseData.imageUrl || "";
      } else {
        showSnackbar("Failed to add college featured image", "error");
      }
    } catch (error) {
      showSnackbar("Something went wrong. Please try again later.", "error");
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
  const getSuggestions = async () => {
    try {
      let params = {};
      let response = await invokeApi(
        config.getMyCollege + apiList.getalltopcolleges,
        params
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          setCollegeData(response.data.topColleges);
          console.log(response.data.topColleges, "collegeData");
        } else {
          showSnackbar(
            "Something went wrong while getting Programs Details. Please try again later!",
            "error"
          );
        }
      } else {
        showSnackbar(
          "Something went wrong while getting Programs Details. Please try again later!",
          "error"
        );
      }
    } catch (error) {
      console.error("Error while fetching suggestions:", error);
      showSnackbar(
        "Something went wrong while getting Programs Details. Please try again later!",
        "error"
      );
    }
  };
  useEffect(() => {
    getSuggestions();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const collegeLogoUrl = await handleAddCollegeLogo();
      const collegeBannerUrl = await handleAddBannerImage();
      const collegeFeaturedUrl = await handleAddCollegeFeatured();

      await handleAddCollege(
        collegeLogoUrl,
        collegeBannerUrl,
        collegeFeaturedUrl
      );
    } catch (error) {
      console.error("Error while adding college details:", error);
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };
  const handleAddCollege = async (
    collegeLogoUrl,
    collegeBannerUrl,
    collegeFeaturedUrl,
    collegeBroucherUrl,
    collegeGallery
  ) => {
    const params = {
      ...mainColleges,
      collegeLogoUrl,
      collegeBannerUrl,
      collegeFeaturedUrl,
      collegeBroucherUrl,
      collegeGallery,
    };

    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.addSubCollege,
        params,
        cookies
      );
      console.log(params);
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          showSnackbar("College Added successfully", "success");
          navigate("/university-manager/college-list");
        } else if (response.data.responseCode === "400") {
          showSnackbar(response.data.message, "error");
        }
      }
    } catch (error) {
      console.error("Error during adding college:", error);
      showSnackbar("Something went wrong. Please try again later!!", "error");
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
          <Grid sx={{ py: 1 }}>
            <NavigatedComponent pathname={location.pathname} />

            <Grid sx={{ width: "100%", px: isMobileScreen ? 2 : 5 }}>
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{ my: 5, boxShadow: 2, width: "100%", height: "100%" }}
                >
                  {/* College Details */}
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
                      Main College Details
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid
                      container
                      md={12}
                      xs={12}
                      spacing={isMobileScreen ? 0 : 2}
                      sx={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Grid item md={11} xs={11} sx={{ py: 1 }}>
                        <InputLabel
                          sx={{
                            fontWeight: "bold",
                            my: 1,
                            fontSize: isMobileScreen ? 12 : 15,
                          }}
                        >
                          College Name *
                        </InputLabel>
                        <TextField
                          placeholder="
                    Enter College Name"
                          fullWidth
                          name="collegeName"
                          value={mainColleges.collegeName}
                          onChange={handleChange}
                          inputProps={{
                            style: {
                              height: isMobileScreen ? "3px" : "8px",
                              fontSize: isMobileScreen ? 12 : 14,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={11} xs={11} sx={{ py: 1 }}>
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
                          value={mainColleges.ogUrl}
                          onChange={handleChange}
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
                          College Full Description
                        </InputLabel>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            my: isMobileScreen ? 2 : 2,
                            mb: isMobileScreen ? 15 : 1,
                          }}
                        >
                          <ReactQuill
                            value={mainColleges.fullDescription}
                            onChange={handleInputChange}
                            modules={{
                              toolbar: [
                                ["bold", "italic", "underline", "strike"],
                                ["blockquote", "code-block"],
                                [{ list: "ordered" }, { list: "bullet" }],
                                [{ script: "sub" }, { script: "super" }],
                                [{ indent: "-1" }, { indent: "+1" }],
                                [{ direction: "rtl" }],
                                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                [{ color: [] }, { background: [] }],
                                [{ font: [] }],
                                [{ align: [] }],
                                ["link", "image", "video"],
                                ["clean"],
                              ],
                            }}
                            style={{ height: "500px" }}
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
                          Sub Colleges
                        </InputLabel>
                        <Autocomplete
                          multiple
                          id="multi-selector"
                          options={collegeData}
                          getOptionLabel={(option) => option.collegeName}
                          //   value={mainColleges.subColleges.split(',')}
                          onChange={handleSelectionChange}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              sx={{
                                ".MuiAutocomplete-inputRoot": {
                                  height: "auto",
                                  p: 1,
                                },
                              }}
                            />
                          )}
                          ListboxComponent={(props) => (
                            <Paper
                              {...props}
                              style={{
                                maxHeight: "200px",
                                fontSize: isMobileScreen ? 12 : 14,
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid
                        container
                        md={12}
                        xs={12}
                        sx={{
                          width: "100%",
                          justifyContent: "space-around",
                          mt: 5,
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
                            College Logo
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
                              onChange={handleCollegeLogo}
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
                              previewText="Selected College Logo:"
                            />
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
                              onChange={handleFeaturedImage}
                              acceptedFiles={["image/jpeg", "image/png"]}
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
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Grid
                    container
                    spacing={isMobileScreen ? 0 : 2}
                    sx={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Button
                      type="submit"
                      sx={{
                        my: isMobileScreen ? 2 : 5,
                        px: 2,
                        fontSize: 12,
                        background: "#1d1a57",
                        color: "#FFF",
                        fontWeight: 600,
                        "&:hover": { background: "#1d1a57", color: "#FFF" },
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Box>
              </form>
            </Grid>
            {/* Snackbar */}
            <Snackbar
              open={openSnackbar}
              autoHideDuration={2000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddMainCollege;

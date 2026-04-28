import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  InputLabel,
  InputAdornment,
  TextareaAutosize,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  Autocomplete,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../../../config/config";
import { apiList, invokeApi } from "../../../services/apiServices";
import { useCookies } from "react-cookie";
import { DropzoneArea } from "mui-file-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import JoditEditor from "jodit-react";

const UpdatePageDetails = () => {
  const [cookies] = useCookies();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state.userData;
  const [colleges, setColleges] = useState(userData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  // my use states
  const [locations, setLocations] = useState([]);
  const [originalColleges, setOriginalColleges] = useState({ ...colleges });

  // upload files
  const [bannerImage, setBannerImage] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [selectedBannerImage, setSelectedBannerImage] = useState(
    userData.collegeBannerUrl
  );
  const [selectedFeaturedImage, setSelectedFeaturedImage] = useState(
    userData.collegeFeaturedUrl
  );

  const [bannerImageChanged, setBannerImageChanged] = useState(false);
  const [featuredImageChanged, setFeaturedImageChanged] = useState(false);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  const handleSubmit = async () => {
    try {
      const collegeBannerUrl = bannerImageChanged
        ? await handleAddBannerImage()
        : originalColleges.collegeBannerUrl;
      const collegeFeaturedUrl = featuredImageChanged
        ? await handleAddCollegeFeatured()
        : originalColleges.collegeFeaturedUrl;
      const updatedCollegeData = {
        id: colleges.id,
        ...(colleges.collegeName !== originalColleges.collegeName && {
          collegeName: colleges.collegeName,
        }),
        ...(colleges.university !== originalColleges.university && {
          university: colleges.university,
        }),
        ...(colleges.ogUrl !== originalColleges.ogUrl && {
          ogUrl: colleges.ogUrl,
        }),
        ...(collegeBannerUrl !== originalColleges.collegeBannerUrl && {
          collegeBannerUrl,
        }),
        ...(collegeFeaturedUrl !== originalColleges.collegeFeaturedUrl && {
          collegeFeaturedUrl,
        }),
        ...(colleges.fullDescription !== originalColleges.fullDescription && {
          fullDescription: colleges.fullDescription,
        }),
      };

      await handleUpdateCollege(updatedCollegeData);
    } catch (error) {
      console.error("Error while adding college details:", error);
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };

  const handleAddBannerImage = async () => {
    const formData = new FormData();
    formData.append("banner", bannerImage);
    try {
      const response = await fetch(
        `https://image-upload.bookmypainter.com/addCollegeBanner`,
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
        "https://image-upload.bookmypainter.com/addCollegeFeaturedImage",
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

  const handleLocationChange = (newValue) => {
    setColleges((prevState) => ({
      ...prevState,
      university: newValue,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setColleges((prevState) => {
      if (prevState[name] !== value) {
        return {
          ...prevState,
          [name]: value,
        };
      }
      return prevState;
    });
  };

  const handleChangeService = (value) => {
    setColleges((prevState) => ({
      ...prevState,
      fullDescription: value,
    }));
  };

  const handleUpdateCollege = async (updatedData) => {
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.updatecollegedetails,
        updatedData,
        cookies
      );
      if (response?.status === 200) {
        showSnackbar("User updated successfully");
        navigate("/university-manager/college-list");
      } else if (response?.status === 400) {
        showSnackbar("Failed to update. Please try again later!!");
      }
    } catch (error) {
      showSnackbar("Failed to update. Please try again later!!");
    }
  };

  const handleUniversityClick = async () => {
    await fetchData();
  };

  useEffect(() => {
    handleUniversityClick();
  }, []);

  // fetch data
  const fetchData = async (endpoint) => {
    const params = {
      status: "Active",
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getLocations,
        params,
        cookies
      );
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          setLocations(response.data.locations);
        } else {
          console.error("Invalid responseCode:", response.data.responseCode);
        }
      } else {
        console.error("HTTP error:", response?.status);
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  return (
    <>
      <Paper elevation={0} sx={{ width: "100%" }}>
        <Box sx={{ width: "100%", height: "100%" }}>
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
              Page Details
            </Typography>
            <Grid
              container
              spacing={isMobileScreen ? 0 : 2}
              md={12}
              xs={12}
              sx={{ width: "100%", justifyContent: "space-around" }}
            >
              <Grid item md={5} xs={11}>
                <InputLabel
                  sx={{
                    fontWeight: "bold",
                    my: 1,
                    fontSize: isMobileScreen ? 12 : 15,
                  }}
                >
                  Page Title / Identifier *
                </InputLabel>

                <TextField
                  fullWidth
                  name="collegeName"
                  value={colleges.pageTitle}
                  onChange={handleInputChange}
                  inputProps={{
                    style: {
                      height: isMobileScreen ? "3px" : "8px",
                      fontSize: isMobileScreen ? 12 : 14,
                    },
                  }}
                />
              </Grid>
              <Grid item md={5} xs={11}>
                <InputLabel
                  sx={{
                    fontWeight: "bold",
                    my: 1,
                    fontSize: isMobileScreen ? 12 : 15,
                  }}
                >
                  Location *
                </InputLabel>
                <Autocomplete
                  options={locations.map((option) => option.location)}
                  getOptionLabel={(location) => location || ""}
                  fullWidth
                  name="university"
                  value={colleges.location}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select University"
                      sx={{
                        "& .MuiInputBase-input": {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                        "& .MuiAutocomplete-inputRoot": {
                          height: isMobileScreen ? "35px" : "40px",
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
              <Grid item md={11} xs={11}>
                <InputLabel
                  sx={{
                    fontWeight: "bold",
                    my: 1,
                    fontSize: isMobileScreen ? 12 : 15,
                  }}
                >
                  OG URL
                </InputLabel>
                <TextField
                  placeholder=""
                  fullWidth
                  name="ogUrl"
                  value={colleges.ogUrl}
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
                    fontSize: isMobileScreen ? 12 : 14,
                  }}
                >
                  Signature Services
                </InputLabel>
                <Grid
                  item
                  // xs={12}
                  sx={{
                    my: isMobileScreen ? 2 : 2,
                    mb: isMobileScreen ? 15 : 1,
                  }}
                >
                  <JoditEditor
                    value={colleges.signatureServices}
                    // onChange={handleInputChange}
                    style={{
                      height: "500px",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
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
              Upload Files
            </Typography>
            <Grid
              container
              md={12}
              xs={12}
              sx={{ width: "100%", justifyContent: "space-around" }}
            >
              <Grid item md={5} xs={11}>
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
                        style={{ color: "#1d1a57", width: 35, height: 35 }}
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
                  {!selectedBannerImage && userData.bannerUrl && (
                    <img
                      src={userData.bannerUrl}
                      alt="BannerUrl"
                      style={{ maxWidth: "90px" }}
                    />
                  )}
                </Grid>
              </Grid>
              <Grid item md={5} xs={11}>
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
                        style={{ color: "#1d1a57", width: 35, height: 35 }}
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
                  {!selectedFeaturedImage && userData.featuredUrl && (
                    <img
                      src={userData.featuredUrl}
                      alt="FeaturedUrl"
                      style={{ maxWidth: "90px" }}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid
            container
            spacing={isMobileScreen ? 0 : 2}
            md={12}
            xs={12}
            sx={{
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
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </Grid>
        </Box>

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
      </Paper>
    </>
  );
};

export default UpdatePageDetails;

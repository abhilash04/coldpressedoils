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
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../../../../services/apiServices";
import { config } from "../../../../../config/config";
import { useCookies } from "react-cookie";
import { DropzoneArea } from "mui-file-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import pdfImage from "../../../../../assets/images/pdf.jpeg";
import Header from "../../common/Header";
import Sidenav from "../../common/Sidenav";
import ReactQuill from "react-quill";
import IconSidenav from "../../common/IconSidenav";

const EditMainCollege = () => {
  const [cookies] = useCookies();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state.userData;
  const [mainColleges, setMainColleges] = useState(userData || {});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const [originalColleges, setOriginalColleges] = useState({ ...mainColleges });

  // upload files
  const [collegeLogo, setCollegeLogo] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [selectedCollegeLogo, setSelectedCollegeLogo] = useState(
    userData?.collegeLogoUrl || ""
  );
  const [selectedBannerImage, setSelectedBannerImage] = useState(
    userData.collegeBannerUrl || ""
  );
  const [selectedFeaturedImage, setSelectedFeaturedImage] = useState(
    userData.collegeFeaturedUrl || ""
  );
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );
  const [collegeLogoChanged, setCollegeLogoChanged] = useState(false);
  const [bannerImageChanged, setBannerImageChanged] = useState(false);
  const [featuredImageChanged, setFeaturedImageChanged] = useState(false);
  const [collegeData, setCollegeData] = useState([]);
  const [selectedSubColleges, setSelectedSubColleges] = useState(
    mainColleges.subColleges
      ? mainColleges.subColleges.split(",").map((id) => parseInt(id.trim()))
      : []
  );
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  const handleSubmit = async () => {
    try {
      const collegeLogoUrl = collegeLogoChanged
        ? await handleAddCollegeLogo()
        : originalColleges.collegeLogoUrl;
      const collegeBannerUrl = bannerImageChanged
        ? await handleAddBannerImage()
        : originalColleges.collegeBannerUrl;
      const collegeFeaturedUrl = featuredImageChanged
        ? await handleAddCollegeFeatured()
        : originalColleges.collegeFeaturedUrl;

      const updatedCollegeData = {
        id: mainColleges.id,
        ...(mainColleges.collegeName !== originalColleges.collegeName && {
          collegeName: mainColleges.collegeName,
        }),

        ...(mainColleges.ogUrl !== originalColleges.ogUrl && {
          ogUrl: mainColleges.ogUrl,
        }),
        ...(mainColleges.fullDescription !==
          originalColleges.fullDescription && {
          fullDescription: mainColleges.fullDescription,
        }),
        ...(mainColleges.subColleges !== originalColleges.subColleges && {
          subColleges: mainColleges.subColleges,
        }),
        ...(collegeLogoUrl !== originalColleges.collegeLogoUrl && {
          collegeLogoUrl,
        }),
        ...(collegeBannerUrl !== originalColleges.collegeBannerUrl && {
          collegeBannerUrl,
        }),
        ...(collegeFeaturedUrl !== originalColleges.collegeFeaturedUrl && {
          collegeFeaturedUrl,
        }),
      };

      await handleUpdateCollege(updatedCollegeData);
    } catch (error) {
      console.error("Error while adding college details:", error);
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };
  const handleSelectionChange = (event, newValue) => {
    const uniqueSelections = new Set(newValue.map((college) => college.id));
    const uniqueSelectionsArray = Array.from(uniqueSelections);
    const subCollegesString = uniqueSelectionsArray.join(", ");
    setSelectedSubColleges(uniqueSelectionsArray);
    setMainColleges((prevFormData) => ({
      ...prevFormData,
      subColleges: subCollegesString,
    }));
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

  const handleCollegeLogo = (files) => {
    if (files && files.length > 0) {
      setCollegeLogoChanged(true);
      const selectedCollegeFile = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedCollegeLogo(reader.result);
        setCollegeLogo(selectedCollegeFile);
      };
      reader.readAsDataURL(selectedCollegeFile);
    } else {
      setSelectedCollegeLogo("");
      setCollegeLogo(null);
      setCollegeLogoChanged(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMainColleges((prevState) => {
      if (prevState[name] !== value) {
        return {
          ...prevState,
          [name]: value,
        };
      }
      return prevState;
    });
  };
  const handleChange = (value) => {
    setMainColleges((prevState) => ({
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
        navigate("/university-manager/main-college-list");
      } else if (response?.status === 400) {
        showSnackbar("Failed to update. Please try again later!!");
      }
    } catch (error) {
      showSnackbar("Failed to update. Please try again later!!");
    }
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

  return (
    <>
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
          <Grid sx={{ width: "100%", px: isMobileScreen ? 2 : 5 }}>
            <Box
              sx={{
                my: isMobileScreen ? 2 : 5,
                boxShadow: 2,
                width: "100%",
                height: "100%",
              }}
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
                  College Details
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid
                  container
                  spacing={isMobileScreen ? 0 : 2}
                  md={12}
                  xs={12}
                  sx={{ width: "100%", justifyContent: "space-around" }}
                >
                  <Grid item md={11} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      College Name
                    </InputLabel>

                    <TextField
                      fullWidth
                      name="collegeName"
                      value={mainColleges.collegeName}
                      onChange={handleInputChange}
                      inputProps={{
                        style: {
                          height: isMobileScreen ? "3px" : "8px",
                          fontSize: isMobileScreen ? 12 : 14,
                        },
                      }}
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
                      value={mainColleges.ogUrl}
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
                        onChange={handleChange}
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

                  <Grid item md={11} xs={11}>
                    <InputLabel
                      sx={{
                        fontWeight: "bold",
                        my: 1,
                        fontSize: isMobileScreen ? 12 : 15,
                      }}
                    >
                      Sub Colleges
                    </InputLabel>
                    {collegeData.length > 0 ? (
                      <Autocomplete
                        multiple
                        id="multi-selector"
                        options={collegeData}
                        getOptionLabel={(college) => college.collegeName}
                        value={(selectedSubColleges || []).map((collegeId) =>
                          collegeData.find(
                            (college) => college.id === collegeId
                          )
                        )}
                        onChange={handleSelectionChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
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
                    ) : (
                      <CircularProgress />
                    )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  md={12}
                  xs={12}
                  sx={{ width: "100%", justifyContent: "space-around" }}
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
                    <Grid
                      sx={{
                        py: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        width: "100%",
                        height: "auto",
                      }}
                    >
                      {selectedCollegeLogo && (
                        <img
                          src={selectedCollegeLogo}
                          alt="collegelogo"
                          style={{ maxWidth: "90px", display: "none" }}
                        />
                      )}
                      {!selectedCollegeLogo && userData.collegeLogoUrl && (
                        <img
                          src={userData.collegeLogoUrl}
                          alt="collegelogo"
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
                      {!selectedBannerImage && userData.collegeBannerUrl && (
                        <img
                          src={userData.collegeBannerUrl}
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
                      {!selectedFeaturedImage &&
                        userData.collegeFeaturedUrl && (
                          <img
                            src={userData.collegeFeaturedUrl}
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
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EditMainCollege;

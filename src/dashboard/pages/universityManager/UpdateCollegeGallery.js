import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  InputLabel,
  Typography,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { DropzoneArea } from "mui-file-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { apiList, invokeApi } from "../../../../../services/apiServices";
import { config } from "../../../../../config/config";

const UpdateCollegeGallery = () => {
  const [cookies] = useCookies();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state.userData;
  const [galleryImages, setGalleryImages] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  useEffect(() => {
    if (userData && userData.collegeGallery) {
      setGalleryImages(userData.collegeGallery);
    }
  }, [userData]);

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleFileChange = (files) => {
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        imageUrl: file,
      }));
      setGalleryImages(newImages);
    } else {
      setGalleryImages([]);
    }
  };

  const handleSubmit = async () => {
    try {
      const existingGallery = userData.collegeGallery || [];
      const galleryList = await handleAddGalleryImages(existingGallery);
      const updatedGallery = [...galleryList];
      const updatedCollegeData = {
        collegeId: userData.id,
        galleryList: updatedGallery.map((image) => image.imageUrl),
      };

      await handleUpdateGallery(updatedCollegeData);
    } catch (error) {
      console.error("Error while adding or updating gallery details:", error);
      showSnackbar("Something went wrong. Please try again later.", "error");
    }
  };

  const handleAddGalleryImages = async (existingGallery) => {
    const formData = new FormData();
    galleryImages.forEach((image, index) => {
      formData.append(`gallery[${index}]`, image.imageUrl);
    });

    try {
      const response = await invokeFormDataApi(apiList.addCollegeGallery, formData);

      if (response?.status === 200) {
        const galleryUrls = response.data.galleryUrls || [];
        return galleryUrls.map((url) => ({ imageUrl: url }));
      } else {
        throw new Error("Failed to add Gallery Image");
      }
    } catch (error) {
      throw new Error("Failed to add Gallery Image");
    }
  };


  const handleUpdateGallery = async (updatedCollegeData) => {
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.updatecollegegallery,
        updatedCollegeData,
        cookies
      );
      if (response?.status === 200) {
        showSnackbar("User updated successfully", "success");
        navigate("/university-manager/college-list");
      } else {
        showSnackbar("Failed to update. Please try again later!!", "error");
      }
    } catch (error) {
      showSnackbar("Failed to update. Please try again later!!", "error");
    }
  };

  return (
    <>
      <Paper elevation={0} sx={{ width: "100%" }}>
        <Box sx={{ width: "100%", height: "100%" }}>
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
              Gallery Details
            </Typography>
            <Grid
              container
              spacing={isMobileScreen ? 0 : 2}
              md={12}
              xs={12}
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Grid item md={11} sx={11}>
                <InputLabel
                  sx={{
                    fontWeight: "bold",
                    my: 1,
                    fontSize: isMobileScreen ? 12 : 15,
                  }}
                >
                  Gallery Images (Select Multiple)
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
                    acceptedFiles={["image/jpeg", "image/jpg", "image/png"]}
                    onChange={handleFileChange}
                    maxFileSize={5000000}
                    filesLimit={8}
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
                    previewText="Selected Gallery Images:"
                  />
                  <Grid
                    sx={{
                      my: 3,
                      py: 2,
                      display: "flex",
                      flexDirection: isMobileScreen ? "column" : "row",
                      alignItems: isMobileScreen ? "center" : "flex-start",
                      justifyContent: "center",
                      width: "100%",
                      height: "auto",
                    }}
                  >
                    {[...userData.collegeGallery, ...galleryImages].map(
                      (image, index) => (
                        <img
                          key={index}
                          src={
                            typeof image.imageUrl === "string"
                              ? image.imageUrl
                              : URL.createObjectURL(image.imageUrl)
                          }
                          alt={`galleryimage_${index}`}
                          style={{
                            maxWidth: "90px",
                            padding: "15px",
                          }}
                        />
                      )
                    )}
                  </Grid>
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

export default UpdateCollegeGallery;

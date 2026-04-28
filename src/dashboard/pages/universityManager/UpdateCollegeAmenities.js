import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  InputLabel,
  TextField,
  Autocomplete,
  Button,
  Paper,
  Snackbar,
  Divider,
  useMediaQuery,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../../../../services/apiServices";
import { config } from "../../../../../config/config";

const UpdateCollegeAmenities = () => {
  const [cookies] = useCookies();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state.userData;
  const [colleges, setColleges] = useState(userData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [amenities, setAmenities] = useState([]);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await invokeApi(
          config.getMyCollege + apiList.getamenities,
          {},
          cookies
        );
        if (response?.status >= 200 && response?.status < 300) {
          if (response.data.responseCode === "200") {
            setAmenities(response.data.amenities);
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
    fetchData();
  }, []);

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleAmenitiesChange = (event, newValue) => {
    setColleges((prevFormData) => ({
      ...prevFormData,
      collegeAmenities: newValue.map((amenity) => ({ amenity })),
    }));
  };

  const handleSaveChanges = async () => {
    const params = {
      collegeId: userData.id,
      amenitiesList: colleges.collegeAmenities.map(
        (amenity) => amenity.amenity
      ),
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.updatecollegeamenities,
        params,
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
        <Grid sx={{ width: "100%", height: "100%" }}>
          {/* Facilities/Amenities*/}
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
              Facilities/Amenities
            </Typography>

            <Grid
              container
              spacing={isMobileScreen?0:2}
              md={12}
              xs={12}
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Grid item md={11} xs={11}>
                <InputLabel sx={{ fontWeight: "bold", my: 1, fontSize:isMobileScreen?12: 15 }}>
                  Facilities/Amenities
                </InputLabel>
                <Autocomplete
                  multiple
                  id="multi-selector"
                  options={amenities.map((option) => option.amenity)}
                  value={colleges.collegeAmenities.map(
                    (amenity) => amenity.amenity
                  )}
                  onChange={handleAmenitiesChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      sx={{
                        ".MuiAutocomplete-inputRoot": {
                          height: "auto",
                          p: 1,
                          fontSize:isMobileScreen?12: 14,
                        },
                      }}
                    />
                  )}
                  ListboxComponent={(props) => (
                    <Paper
                      {...props}
                      style={{ maxHeight: "200px",    fontSize:isMobileScreen?12:  14 }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid
            container
            spacing={isMobileScreen ? 0 :2}
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
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>

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

export default UpdateCollegeAmenities;

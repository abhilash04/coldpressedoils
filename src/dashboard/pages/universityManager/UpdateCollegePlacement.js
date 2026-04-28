import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  InputLabel,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Autocomplete,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../../../../services/apiServices";
import { config } from "../../../../../config/config";
import { useCookies } from "react-cookie";

const UpdateCollegePlacement = () => {
  const [cookies] = useCookies();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state.userData;
  const [colleges, setColleges] = useState(userData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [companiesData, setCompaniesData] = useState([]);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChangePlacement = (event, newValue) => {
    setColleges((prevState) => ({
      ...prevState,
      collegePlacement: newValue.map((placementCompany) => ({
        placementCompany,
      })),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await invokeApi(
          config.getMyCollege + apiList.getPlacementCompanies,
          {},
          cookies
        );
        if (response?.status >= 200 && response?.status < 300) {
          if (response.data.responseCode === "200") {
            setCompaniesData(response.data.placementCompanys);
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

  const handleSaveChanges = async () => {
    const params = {
      collegeId: userData.id,
      placementList: colleges.collegePlacement.map(
        (placementCompany) => placementCompany.placementCompany
      ),
    };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.updatecollegeplacements,
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
        <Box sx={{ width: "100%", height: "100%" }}>
          {/* Placements*/}
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
              Placement Details
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
              <Grid item md={11} xs={11}>
                <InputLabel
                  sx={{
                    fontWeight: "bold",
                    my: 1,
                    fontSize: isMobileScreen ? 12 : 15,
                  }}
                >
                  Placement
                </InputLabel>
                <Autocomplete
                  multiple
                  id="multi-selector"
                  options={companiesData.map(
                    (option) => option.placementCompany
                  )}
                  value={colleges.collegePlacement.map(
                    (placementCompany) => placementCompany.placementCompany
                  )}
                  onChange={handleChangePlacement}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      sx={{
                        ".MuiAutocomplete-inputRoot": {
                          height: "auto",
                          p: 1,
                          fontSize: isMobileScreen ? 12 : 14,
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
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid
            container
            spacing={isMobileScreen?0:2}
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
              onClick={handleSaveChanges}
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

export default UpdateCollegePlacement;

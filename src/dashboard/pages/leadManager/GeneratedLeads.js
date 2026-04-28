import React, { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { apiList, invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";
import Snackbar from "@mui/material/Snackbar";
import { useLocation } from "react-router-dom";
import Sidenav from "../../common/Sidenav";
import NavigatedComponent from "../NavigatedComponent";
import Header from "../../common/Header";
import IconSidenav from "../../common/IconSidenav";

const GeneratedLeads = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [errors, setErrors] = useState({});
  const [cookies] = useCookies();
  const [emailExistsLocally, setEmailExistsLocally] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const isMobileScreen = useMediaQuery(
    "(min-width:360px) and (max-width:500px)"
  );

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  const checkIfEmailExistsLocally = (email) => {
    // Your logic to check if the email exists locally
    return emailExistsLocally;
  };


 

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (checkIfEmailExistsLocally(email)) {
      showSnackbar("Email already exists locally", "error");
      return;
    }

    if (validateForm()) {
      try {
        await AddLead();
        showSnackbar("Lead Added successfully", "success");
      } catch (error) {
        console.error("Error while adding user:", error);
        showSnackbar("Something went wrong. Please try again later!!", "error");
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let formIsValid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required";
      formIsValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      formIsValid = false;
    }

    if (!phone || !phone.trim()) {
      newErrors.phone = "Phone Number is required";
      formIsValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone Number is invalid";
      formIsValid = false;
    }
    setErrors(newErrors);
    return formIsValid;
  };

  const AddLead = async () => {
    const params = {
      name: name,
      email: email,
      phone: phone,
    };

    try {
      const emailExistsLocally = checkIfEmailExistsLocally(email);

      if (emailExistsLocally) {
        showSnackbar("Email already exists ", "warning");
        return;
      }

      const response = await invokeApi(
        config.getMyCollege + apiList.addLead,
        params,
        cookies,
        console.log(params)
      );

      if (response && response?.status >= 200 && response?.status < 300) {
        if (response.data.exists) {
        }
      }
      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          showSnackbar("Lead Added successfully", "success");
        } else if (response.data.responseCode === "400") {
          showSnackbar(response.data.message, "error");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      showSnackbar("Something went wrong. Please try again later!!", "error");
    }
    setEmailExistsLocally(true);
  };

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
          <Grid sx={{ py: 1 }}>
            <NavigatedComponent pathname={location.pathname} />
            <Grid sx={{ width: "100%", px: isMobileScreen ? 2 : 5 }}>
              <form onSubmit={handleSubmit}>
                <Paper
                  sx={{
                    my: isMobileScreen ? 2 : 5,
                    p: 3,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#1d1a57",
                      fontSize: 18,
                      marginBottom: "20px",
                    }}
                  >
                    Partner Login Details:
                  </Typography>
                  <Divider sx={{ backgroundColor: "black" }}></Divider>

                  <Grid
                    container
                    spacing={isMobileScreen ? 0 : 2}
                    md={12}
                    xs={12}
                    sx={{ marginTop: "10px" }}
                  >
                    {/* Full Name */}
                    <Grid item md={6} xs={12}>
                      <InputLabel
                        sx={{ fontWeight: "bold", my: 1, fontSize: 15 }}
                      >
                        Name*:
                      </InputLabel>
                      <TextField
                        placeholder="Enter Full Name"
                        fullWidth
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors("");
                        }}
                        error={!!errors.name}
                        helperText={errors.name}
                        inputProps={{
                          style: { height: "8px", fontSize: 14 },
                        }}
                      />
                    </Grid>

                    {/* Email */}
                    <Grid item md={6} xs={12}>
                      <InputLabel
                        sx={{ fontWeight: "bold", my: 1, fontSize: 15 }}
                      >
                        Email*:
                      </InputLabel>
                      <TextField
                        placeholder="admin@getmycollege.com"
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrors("");
                        }}
                        error={!!errors.email}
                        helperText={errors.email}
                        inputProps={{
                          style: { height: "8px", fontSize: 14 },
                        }}
                      />
                    </Grid>

                    {/* Phone */}
                    <Grid item md={6} xs={12}>
                      <InputLabel
                        sx={{ fontWeight: "bold", my: 1, fontSize: 15 }}
                      >
                        Phone*:
                      </InputLabel>
                      <TextField
                        placeholder="Enter Phone Number"
                        fullWidth
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setErrors("");
                        }}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        inputProps={{
                          style: { height: "8px", fontSize: 14 },
                        }}
                      />
                    </Grid>
                  </Grid>

                  {/* Submit Button */}
                  <Box sx={{ marginTop: "5px", textAlign: "right" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
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
                  </Box>

                  {/* Snackbar component */}
                  <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert
                      onClose={handleCloseSnackbar}
                      severity={snackbarSeverity}
                      sx={{ width: "100%" }}
                    >
                      {snackbarMessage}
                    </Alert>
                  </Snackbar>
                </Paper>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default GeneratedLeads;

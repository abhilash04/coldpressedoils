import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import image1 from "../assets/loginimage1.svg";
import image2 from "../assets/loginimage2.svg";
import image3 from "../assets/loginimage3.svg";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { apiList, invokeApi } from "../services/apiServices";
// import { config } from "../config/config";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import { keyframes } from "@emotion/react";
import Cookies from "js-cookie";
import { useTheme } from "../componants/common/ThemeContext";
import { apiList, invokeApi } from "../services/apiServices";

const bounceIn = keyframes`
  0% { transform: translateY(100%); opacity: 0; }
  50% { transform: translateY(-10px); opacity: 1; }
  100% { transform: translateY(0); opacity: 1; }
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; transform: translateY(100%); }
`;

const images = [image1, image2, image3];

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <ArrowForwardIosIcon sx={{ color: "white", fontSize: 40 }} />
    </Box>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <ArrowBackIosNewIcon sx={{ color: "white", fontSize: 40 }} />
    </Box>
  );
};

const Register = () => {
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const adsExistingCart = Cookies.get("facebookAndInstaAdsCart") ? JSON.parse(Cookies.get("facebookAndInstaAdsCart")) : [];
  const existingCart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [];

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
    setTimeout(() => setOpenSnackbar(false), 3000); // Auto-hide after 3 seconds
  };

  const getIcon = () => {
    switch (snackbarSeverity) {
      case "success":
        return <CheckCircleIcon sx={{ fontSize: 26, color: "#fff" }} />;
      case "error":
        return <ErrorIcon sx={{ fontSize: 26, color: "#fff" }} />;
      case "warning":
        return <WarningIcon sx={{ fontSize: 26, color: "#fff" }} />;
      case "info":
        return <InfoIcon sx={{ fontSize: 26, color: "#fff" }} />;
      default:
        return null;
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRegister = async () => {
    setError(null);
    setLoading(true);

    let params = {
      email: email,
      name: fullName,
      phoneNumber: phone,
      password: password,
    };

    try {
      let response = await invokeApi(apiList.signup, params);

      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          navigate("/login");
          showSnackbar("User Registered Successfully", "success");
        } else if (response.data.responseCode === "GM001") {
          showSnackbar(
            "Email already exists.",
            "error"
          );
        }
        else if (response.data.responseCode === "HE001") {
          showSnackbar(
            "Invalid credentials. Please check your email and password.",
            "error"
          );
        } else {
          showSnackbar(
            "Something went wrong while login. Please try again later!",
            "error"
          );
        }
      } else if (response.data.responseCode === "GM001") {
        showSnackbar(
          "Email already exists.",
          "error"
        );
      } else if (
        response.data.responseMessage.includes("Password missMatch", "error")
      ) {
        showSnackbar("Password mismatch. Please check your password.", "error");
      } else if (
        response.data.responseMessage.includes("No user found", "error")
      ) {
        showSnackbar("No user found with the provided email.", "error");
      } else {
        showSnackbar(
          "Something went wrong while login. Please try again later!!",
          "error"
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      showSnackbar("Something went wrong. Please try again later!!", "error");
    } finally {
      setLoading(false);
    }
  };

//   const handleLogin = async (email, password) => {
//     setError(null);
//     setLoading(true);
//     const packageId = sessionStorage.getItem("packageId");


//     let params = {
//       email: email,
//       password: password,
//     };

//     try {
//       let response = await invokeApi(
//         config.getMyCollege + apiList.userLogin,
//         params,
//         cookies
//       );

//       if (response?.status >= 200 && response?.status < 300) {
//         if (response.data.responseCode === "200") {
//           setCookie(
//             config.cookieName,
//             JSON.stringify({
//               token: response.data.token,
//               loginUserId: response.data.userId,
//             }),
//             { path: "/", maxAge: 3000000, sameSite: "strict" }
//           );
//           if (packageId === null) {
//             if (adsExistingCart.length > 0) {
//               navigate("/payment-ads")
//             } else if (existingCart.length > 0) {
//               navigate("/payment-backlinks")
//             } else {
//               navigate("/common-home");
//             }
//           }
//           else {
//             navigate("/payment-page")
//           }
//         } else if (response.data.responseCode === "HE001") {
//           showSnackbar(
//             "Invalid credentials. Please check your email and password.",
//             "error"
//           );
//         } else {
//           showSnackbar(
//             "Something went wrong while login. Please try again later!",
//             "error"
//           );
//         }
//       } else if (
//         response.data.responseMessage.includes("Password missMatch", "error")
//       ) {
//         showSnackbar("Password mismatch. Please check your password.", "error");
//       } else if (
//         response.data.responseMessage.includes("No user found", "error")
//       ) {
//         showSnackbar("No user found with the provided email.", "error");
//       } else {
//         showSnackbar(
//           "Something went wrong while login. Please try again later!!",
//           "error"
//         );
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       showSnackbar("Something went wrong. Please try again later!!", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSuccess = async (response) => {
//     const userObject = jwtDecode(response.credential);
//     console.log(userObject);

//     let params = {
//       email: userObject.email,
//       name: userObject.name,
//       phoneNumber: "9999999998",
//       password: "SeoMitra@2024",
//     };

//     try {
//       let response = await invokeApi(
//         config.getMyCollege + apiList.signup,
//         params,
//         cookies
//       );

//       if (response?.status >= 200 && response?.status < 300) {
//         if (response.data.responseCode === "200") {
//           showSnackbar("User Registered Successfully", "success");
//           handleLogin(userObject.email, "SeoMitra@2024");
//         } else if (response.data.responseCode === "GM001") {
//           showSnackbar(
//             "Email already exists.",
//             "error"
//           );
//         }
//         else if (
//           response.data.responseMessage.includes("Password missMatch", "error")
//         ) {
//           showSnackbar("Password mismatch. Please check your password.", "error");
//         }
//         else if (response.data.responseCode === "HE001") {
//           showSnackbar(
//             "Invalid credentials. Please check your email and password.",
//             "error"
//           );
//         } else {
//           showSnackbar(
//             "Something went wrong while login. Please try again later!",
//             "error"
//           );
//         }
//       }
//       else if (response.data.responseMessage.includes("Email already exists", "error")) {
//         showSnackbar(
//           "Email already exists.",
//           "error"
//         );
//       }
//       else if (
//         response.data.responseMessage.includes("Password missMatch", "error")
//       ) {
//         showSnackbar("Password mismatch. Please check your password.", "error");
//       } else if (
//         response.data.responseMessage.includes("No user found", "error")
//       ) {
//         showSnackbar("No user found with the provided email.", "error");
//       } else {
//         showSnackbar(
//           "Something went wrong while Signup. Please try again later!!",
//           "error"
//         );
//       }
//     } catch (error) {
//       console.error("Error during Signup:", error);
//       showSnackbar("Something went wrong. Please try again later!!", "error");
//     } finally {
//     }
//   };

  // Handle Google login failure
  const handleGoogleFailure = (error) => {
    console.error("Google Sign-In was unsuccessful. Try again later.", error);
  };


  // Validate email pattern
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Validate phone number pattern
  const validatePhone = (phone) => {
    const phonePattern =
      /^[\+]?[(]?[6-9][0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phonePattern.test(phone);
  };


  // Validate password pattern (at least one uppercase, one lowercase, one number, and one special character)
  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  // Update fullName whenever firstName or lastName changes
  useEffect(() => {
    setFullName(`${firstName} ${lastName}`.trim()); // Concatenates first and last name
  }, [firstName, lastName]);

  // Validate if all fields are filled and correct
  useEffect(() => {
    if (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      validateEmail(email) &&
      validatePhone(phone) &&
      validatePassword(password)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [firstName, lastName, email, phone, password]);

  return (
    <GoogleOAuthProvider clientId="1053075396410-7t9jsk8dmlc9gnfinib6600v1l1m9pt0.apps.googleusercontent.com">

      <Grid container style={{ minHeight: "100vh" }}>
        {/* Left side: Registration form */}
        <Grid
          item
          xs={12}
          md={6}
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor:
              theme.palette.mode !== "dark" ? "#19171c" : "#ffffff",
            color: theme.palette.mode !== "dark" ? "#e3e0e6" : "#000000",
          }}
        >
          <Box
            sx={{
              width: 300,
              p: 4,
              borderRadius: 6,
              backgroundColor:
                theme.palette.mode !== "dark" ? "#2a252f" : "#ffff",
              border:
                theme.palette.mode !== "dark" ? "1px solid #4c4452" : "none",
              textAlign: "center",
              boxShadow: theme.palette.mode !== "dark"
                ? 'none'
                : '0 10px 15px rgba(248, 243, 247, 0.15), 0 4px 10px rgba(0, 0, 0, 0.30)',
            }}
          >
            {/* Logo */}
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              color="#00584b"
            >
              COME BACK
              <Typography variant="h4" component="span" sx={{ color: theme.palette.mode !== "dark" ? "#e3e0e6" : "#000000", }}>
                <span> ORGANIC</span>
                <span style={{ color: "#00584b" }}>.</span>
              </Typography>
            </Typography>

            {/* Welcome text */}
            <Typography
              variant="h5"
              fontWeight="bold"
              mt={3}
              mb={1}
              sx={{ color: theme.palette.mode !== "dark" ? "#e3e0e6" : "#000000", }}
            >
              Create Your Account
            </Typography>
            <Typography color="#949494" mb={3}>
              Join us for a better experience.
            </Typography>

            {/* Google Sign-in Button */}
            <GoogleLogin
            //   onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              render={(renderProps) => (
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<GoogleIcon />}
                  onClick={renderProps.onClick}
                  sx={{
                    borderColor: "#2c2a30",
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#f7a800",
                    },
                  }}
                >
                  Sign up with Google
                </Button>
              )}
            />

            {/* Or separator */}
            <Typography color="#949494" my={2} textAlign={"center"}>
              or with
            </Typography>

            {/* Registration fields */}
            <TextField
              label="First Name"
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                disableUnderline: true,
                sx: {
                  // borderRadius: 2,
                  // border: "1px solid #4c4452",
                  color: theme.palette.mode !== "dark" ? "#e3e0e6" : "#000000",
                },
              }}
              InputLabelProps={{
                sx: { color: "#949494" },
              }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{
                mb: 2,
              }}
            />

            <TextField
              label="Last Name"
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                disableUnderline: true,
                sx: {
                  // borderRadius: 2,
                  // border: "1px solid #4c4452",
                  color: theme.palette.mode !== "dark" ? "#e3e0e6" : "#000000",
                },
              }}
              InputLabelProps={{
                sx: { color: "#949494" },
              }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{
                mb: 2,
              }}
            />

            <TextField
              label="Phone Number"
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                disableUnderline: true,
                sx: {
                  // borderRadius: 2,
                  // border: "1px solid #4c4452",
                  color: theme.palette.mode !== "dark" ? "#e3e0e6" : "#000000",
                },
              }}
              InputLabelProps={{
                sx: { color: "#949494" },
              }}
              value={phone}
              // onChange={(e) => setPhone(e.target.value)}
              // error={phone !== "" && !validatePhone(phone)} // Show error if validation fails
              // helperText={
              //   phone !== "" && !validatePhone(phone)
              //     ? "Invalid phone number"
              //     : ""
              // }

              onChange={(e) => {
                const inputPhone = e.target.value;
                if (inputPhone.length <= 10 && /^\d*$/.test(inputPhone)) {
                  setPhone(inputPhone);
                }
              }}
              error={phone !== "" && !validatePhone(phone)} // Show error if validation fails
              helperText={
                phone !== "" && !validatePhone(phone)
                  ? "Invalid phone number"
                  : ""
              }
              sx={{
                mb: 2,
              }}
            />

            <TextField
              label="E-mail"
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                disableUnderline: true,
                sx: {
                  // borderRadius: 2,
                  // border: "1px solid #4c4452",
                  color: theme.palette.mode !== "dark" ? "#e3e0e6" : "#000000",
                },
              }}
              InputLabelProps={{
                sx: { color: "#949494" },
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={email !== "" && !validateEmail(email)} // Show error if validation fails
              helperText={
                email !== "" && !validateEmail(email) ? "Invalid email" : ""
              }
              sx={{
                mb: 2,
              }}
            />

            <TextField
              label="Password"
              variant="outlined"
              size="small"
              type={showPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                disableUnderline: true,
                sx: {
                  // borderRadius: 2,
                  // border: "1px solid #4c4452",
                  color: theme.palette.mode !== "dark" ? "#e3e0e6" : "#000000",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleTogglePasswordVisibility}
                      sx={{
                        color: theme.palette.mode !== "dark" ? "#e3e0e6" : "#000000",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                sx: { color: "#949494" },
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={password !== "" && !validatePassword(password)} // Show error if validation fails
              helperText={
                password !== "" && !validatePassword(password)
                  ? "password - should contain atleast 8 chars with one lowerCase, upperCase, special char and number "
                  : ""
              }
              sx={{
                mb: 2,
              }}
            />

            {/* Register Button */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: isFormValid ? "#00584b" : "#4c4452", // Change button color when valid
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: isFormValid ? "#00584b" : "#4c4452",
                },
              }}
              disabled={!isFormValid} // Disable button if form is not valid
              onClick={handleRegister}
            >
              Register
            </Button>

            {/* Redirect to login */}
            <Typography color="#949494" mt={3}>
              Already have an account?{" "}
              <Typography
                component="span"
                onClick={() => navigate("/login")}
                sx={{
                  cursor: "pointer",
                  color: "#00584b",
                  textDecoration: "none",
                }}
              >
                Login.
              </Typography>
            </Typography>
          </Box>
        </Grid>

        {/* Right side: Image Slider */}
        <Grid
          item
          xs={12}
          md={6}
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor:
              theme.palette.mode !== "dark" ? "#2a252f" : "#f8f3f7",
          }}
        >
          {/* Fixed Icon */}
          {/* <Box
            sx={{
              position: "fixed",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              color: theme.palette.mode === "dark" ? "#fff" : "#b9b9b9",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
              borderRadius: "50%",
              backgroundColor: "#1e1c22",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#161616",
              },
            }}
            onClick={toggleTheme}
          >
            {theme.palette.mode === "dark" ? <DarkModeIcon /> : <WbSunnyIcon />}
          </Box> */}

          {/* Slider Section */}
          <Box sx={{ width: "100%", position: "relative" }}>
            <Slider {...settings}>
              {images.map((image, index) => (
                <Box key={index} sx={{ position: "relative", mt: -20 }}>
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      position: "absolute",
                      bottom: "20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      color: theme.palette.mode === "dark" ? "#fff" : "#fff",
                      backgroundColor: theme.palette.mode === "dark" ? "#19171c" : "#19171c",
                      boxShadow: theme.palette.mode !== "dark"
                        ? 'none'
                        : '0 10px 15px rgba(248, 243, 247, 0.15), 0 4px 10px rgba(0, 0, 0, 0.30)',
                      padding: "10px",
                      borderRadius: "5px",
                      textAlign: "center",
                      width: "80%",
                    }}
                  >
                    {index === 0 && "Organica Oils - Optimize Your Online Presence"}
                    {index === 1 && "Organica Oils - Maximize Your Search Ranking"}
                    {index === 2 && "Organica Oils - Boost Your Website Traffic"}
                  </Typography>
                </Box>
              ))}
            </Slider>
          </Box>
        </Grid>
        {/* <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ width: "auto" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "auto", fontSize: { xs: "14px" } }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar> */}

        {openSnackbar && (
          <Box
            sx={{
              position: "fixed",
              bottom: 20,
              left: 20,
              padding: "6px 18px",
              // backgroundColor: snackbarSeverity === "success" ? "#4caf50" : "#f44336",
              backgroundImage:
                snackbarSeverity === "success"
                  ? "linear-gradient(90deg, #56ab2f, #a8e063)" // Serene Green Gradient
                  : snackbarSeverity === "error"
                    ? "linear-gradient(90deg, #ff512f, #dd2476)" // Bold Red Gradient
                    : snackbarSeverity === "warning"
                      ? "linear-gradient(90deg, #f7971e, #ffd200)" // Amber Glow Gradient
                      : snackbarSeverity === "info"
                        ? "linear-gradient(90deg, #1a2a6c, #b21f1f, #fdbb2d)" // Ocean Breeze Gradient
                        : "linear-gradient(90deg, #a18cd1, #fbc2eb)",
              color: "#fff",
              borderRadius: "12px",
              boxShadow: "0px 8px 16px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              zIndex: 1000,
              animation: `${bounceIn} 0.8s ease-out, ${fadeOut} 0.8s ease-in 3.2s`,
            }}
          >
            {getIcon()}
            <Typography variant="body1" sx={{ fontWeight: "bold", flex: 1 }}>
              {snackbarMessage}
            </Typography>
            <IconButton onClick={handleSnackbarClose} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
      </Grid>
    </GoogleOAuthProvider >

  );
};

export default Register;
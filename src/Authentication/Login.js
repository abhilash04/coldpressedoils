import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Paper,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined, EmailOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../services/apiServices";
import Logo from "../assets/amruthadharee_logo.png";
import SideImg from "../assets/final.png"; // Premium botanical asset

import { useUser } from "../context/UserContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showSnackbar("Please fill in all fields", "warning");
      return;
    }

    setLoading(true);
    let params = { email, password };

    try {
      let response = await invokeApi(apiList.userLogin, params);

      if (response?.status === 200 && response.data.responseCode === "200") {
        login({
          name: response.data.name,
          email,
          id: response.data.userId,
          roles: response.data.roles
        }, response.data.token);
        showSnackbar("Login successful! Welcome to the Admin Portal.", "success");
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        showSnackbar(response?.data?.responseMessage || "Invalid credentials", "error");
      }
    } catch (error) {
      showSnackbar("An unexpected error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", bgcolor: "#F9FAF4" }}>
      <Grid container sx={{ flex: 1 }}>
        {/* Left: Branding & Form */}
        <Grid item xs={12} md={5} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", px: { xs: 4, md: 8 }, py: 4 }}>
          <Box sx={{ mb: 6 }}>
            <img src={Logo} alt="Amrutha Dharee" style={{ height: "60px", marginBottom: "20px" }} />
            <Typography variant="h3" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#2D6A4F", mb: 1 }}>
              Admin Portal
            </Typography>
            <Typography variant="body1" sx={{ color: "#666" }}>
              Secure access for authorized personnel only.
            </Typography>
          </Box>

          <Paper elevation={0} sx={{ border: "1px solid #EAEAEA", p: 4, borderRadius: 0 }}>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email Address"
                placeholder="admin@amruthadharee.com"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined sx={{ color: "#2D6A4F" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: "#2D6A4F" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 4,
                  py: 1.5,
                  bgcolor: "#2D6A4F",
                  borderRadius: 0,
                  fontSize: "1rem",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#1B4332" }
                }}
              >
                {loading ? "AUTHENTICATING..." : "SIGN IN TO DASHBOARD"}
              </Button>
            </form>
          </Paper>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#999" }}>
              © 2026 Amrutha Dharee. All rights reserved.
            </Typography>
          </Box>
        </Grid>

        {/* Right: Premium Imagery */}
        <Grid item xs={false} md={7} sx={{
          backgroundImage: `url(${SideImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}>
          <Box sx={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(to right, rgba(249, 250, 244, 1) 0%, rgba(249, 250, 244, 0) 20%)"
          }} />
        </Grid>
      </Grid>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={snackbarSeverity} sx={{ width: '100%', borderRadius: 0 }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
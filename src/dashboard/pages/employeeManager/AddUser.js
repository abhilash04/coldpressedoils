import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  TextField,
  Button,
  Grid,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import Sidenav from "../../common/Sidenav";
import Header from "../../common/Header";
import { useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";

const AddUser = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    roles: ["Telecaller"], // Initial role
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "roles") {
      setFormData(prev => ({ ...prev, roles: [value] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await invokeApi(config.apiUrl + apiList.userAdd, formData, cookies);
      if (response?.status === 200) {
        setSnackbar({ open: true, message: "User added successfully!", severity: "success" });
        setTimeout(() => navigate("/employee-manager/users"), 1500);
      } else {
        setSnackbar({ open: true, message: response.data.responseMessage || "Failed to add user.", severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Server error occurred.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#F9FAF4", minHeight: "100vh" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Header />
        <Box sx={{ mt: 2, maxWidth: 800, mx: "auto" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
            <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />} sx={{ color: "#2D6A4F" }}>Back</Button>
            <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#2D6A4F" }}>
              Add New Employee
            </Typography>
          </Box>

          <form onSubmit={handleSave}>
            <Card elevation={0} sx={{ p: 4, border: "1px solid #EAEAEA", borderRadius: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth 
                    select 
                    label="Assigned Role" 
                    name="roles" 
                    value={formData.roles[0]} 
                    onChange={handleChange}
                  >
                    <MenuItem value="Telecaller">Telecaller</MenuItem>
                    <MenuItem value="Team Leader">Team Leader</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Super Admin">Super Admin</MenuItem>
                    <MenuItem value="Blog Author">Blog Author</MenuItem>
                    <MenuItem value="SEODataPro">SEO Associate</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Initial Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
                </Grid>
              </Grid>
              
              <Button 
                type="submit" 
                variant="contained" 
                disabled={loading}
                startIcon={<SaveIcon />}
                sx={{ mt: 4, bgcolor: "#2D6A4F", px: 6, py: 1.5, borderRadius: 0, "&:hover": { bgcolor: "#1B4332" } }}
              >
                {loading ? "CREATING..." : "CREATE ACCOUNT"}
              </Button>
            </Card>
          </form>
        </Box>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ borderRadius: 0 }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AddUser;

import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  TextField,
  Button,
  Divider,
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

const AddProduct = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    oldPrice: "",
    category_id: 1,
    description: "",
    howToUse: "",
    is_featured: 0,
    status: "active"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await invokeApi(config.apiUrl + apiList.addProduct, formData, cookies);
      if (response?.status === 200) {
        setSnackbar({ open: true, message: "Product added successfully!", severity: "success" });
        setTimeout(() => navigate("/dashboard/product-list"), 1500);
      } else {
        setSnackbar({ open: true, message: "Failed to add product.", severity: "error" });
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
        <Box sx={{ mt: 2, maxWidth: 1000, mx: "auto" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
            <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />} sx={{ color: "#2D6A4F" }}>Back</Button>
            <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#2D6A4F" }}>
              Add New Product
            </Typography>
          </Box>

          <form onSubmit={handleSave}>
            <Card elevation={0} sx={{ p: 4, border: "1px solid #EAEAEA", borderRadius: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Product Name" name="name" value={formData.name} onChange={handleChange} required variant="outlined" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Slug (URL Friendly)" name="slug" value={formData.slug} onChange={handleChange} required variant="outlined" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Sale Price (₹)" name="price" type="number" value={formData.price} onChange={handleChange} required variant="outlined" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Original Price (₹)" name="oldPrice" type="number" value={formData.oldPrice} onChange={handleChange} variant="outlined" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth select label="Category" name="category_id" value={formData.category_id} onChange={handleChange} variant="outlined">
                    <MenuItem value={1}>Oils</MenuItem>
                    <MenuItem value={2}>Ghee</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={4} label="Product Description" name="description" value={formData.description} onChange={handleChange} required variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={3} label="How to Use" name="howToUse" value={formData.howToUse} onChange={handleChange} variant="outlined" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth select label="Featured Product" name="is_featured" value={formData.is_featured} onChange={handleChange} variant="outlined">
                    <MenuItem value={1}>Yes (Show on Homepage)</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth select label="Status" name="status" value={formData.status} onChange={handleChange} variant="outlined">
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />
              
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={loading}
                  startIcon={<SaveIcon />}
                  sx={{ bgcolor: "#2D6A4F", px: 6, py: 1.5, borderRadius: 0, "&:hover": { bgcolor: "#1B4332" } }}
                >
                  {loading ? "SAVING..." : "SAVE PRODUCT"}
                </Button>
              </Box>
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

export default AddProduct;

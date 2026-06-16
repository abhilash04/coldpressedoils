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
  Chip,
} from "@mui/material";
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import Sidenav from "../../common/Sidenav";
import Header from "../../common/Header";
import { useNavigate } from "react-router-dom";
import { apiList, invokeFormDataApi } from "../../../services/apiServices";
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
    rating: "",
    quantity: "",
    reviews: "",
    weight: "",
    variants: []
  });

  const [variantInput, setVariantInput] = useState({ size: "", price: "", stock: "", originalPrice: "" });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddVariant = () => {
    if (!variantInput.size || !variantInput.price) {
      setSnackbar({ open: true, message: "Please enter size and price", severity: "warning" });
      return;
    }
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, variantInput]
    }));
    setVariantInput({ size: "", price: "", stock: "", originalPrice: "" });
  };

  const handleRemoveVariant = (index) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'variants') {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      });
      if (selectedFile) {
        data.append("image_file", selectedFile);
      }

      const response = await invokeFormDataApi(config.apiUrl + apiList.addProduct, data, cookies);
      if (response?.status === 200) {
        setSnackbar({ open: true, message: "Product added successfully!", severity: "success" });
        setTimeout(() => navigate("/inventory-manager/product-list"), 1500);
      } else {
        const msg = response?.data?.error || "Failed to add product.";
        setSnackbar({ open: true, message: msg, severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Server error: " + error.message, severity: "error" });
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
                    <MenuItem value={1}>Oil Products</MenuItem>
                    <MenuItem value={2}>Spices Powders</MenuItem>
                    <MenuItem value={4}>Gluten Free Flours</MenuItem>
                    <MenuItem value={3}>Jaggery & Sweeteners</MenuItem>
                    <MenuItem value={5}>Rock Salt</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={4} label="Product Description" name="description" value={formData.description} onChange={handleChange} required variant="outlined" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Rating (0.0 – 5.0)"
                    name="rating"
                    type="number"
                    inputProps={{ step: 0.1, min: 0, max: 5 }}
                    value={formData.rating}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Stock Quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Number of Reviews"
                    name="reviews"
                    type="number"
                    value={formData.reviews}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    label="Default Weight (e.g. 1 Liter or 500g)"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                {/* Variants Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: "#2D6A4F", mb: 2, fontWeight: 600 }}>Product Variants (Sizes & Prices)</Typography>
                  <Box sx={{ p: 2, bgcolor: "#f1f3f0", mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={3}>
                        <TextField fullWidth label="Size (e.g. 1L or 500g)" value={variantInput.size} onChange={(e) => setVariantInput({...variantInput, size: e.target.value})} />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <TextField fullWidth label="Sale Price (₹)" type="number" value={variantInput.price} onChange={(e) => setVariantInput({...variantInput, price: e.target.value})} />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <TextField fullWidth label="Original Price (₹)" type="number" value={variantInput.originalPrice} onChange={(e) => setVariantInput({...variantInput, originalPrice: e.target.value})} />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <TextField fullWidth label="Stock" type="number" value={variantInput.stock} onChange={(e) => setVariantInput({...variantInput, stock: e.target.value})} />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Button fullWidth variant="contained" onClick={handleAddVariant} sx={{ bgcolor: "#2D6A4F" }}>Add</Button>
                      </Grid>
                    </Grid>
                  </Box>

                  {formData.variants.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      {formData.variants.map((v, i) => (
                        <Chip 
                          key={i} 
                          label={`${v.size} - Sale: ₹${v.price} ${v.originalPrice ? `(MRP: ₹${v.originalPrice})` : ""} [Stock: ${v.stock}]`} 
                          onDelete={() => handleRemoveVariant(i)}
                          sx={{ m: 0.5, bgcolor: "#E8F5E9", color: "#2D6A4F", fontWeight: 600 }}
                        />
                      ))}
                    </Box>
                  )}
                  <Typography variant="caption" color="textSecondary">* The first variant added will be the default price shown on the grid.</Typography>
                </Grid>

                {/* Image Upload Section */}
                <Grid item xs={12}>
                  <Box sx={{ mb: 3, p: 2, border: '2px dashed #ccc', textAlign: 'center' }}>
                    {previewUrl ? (
                      <Box sx={{ mb: 2 }}>
                        <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }} />
                      </Box>
                    ) : (
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>No image selected</Typography>
                    )}
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{ borderColor: '#2D6A4F', color: '#2D6A4F' }}
                    >
                      {previewUrl ? "Change Image" : "Upload Product Image"}
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </Box>
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

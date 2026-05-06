import React, { useEffect, useState } from "react";
import {
  Box, Typography, Card, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Chip, IconButton, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField,
  MenuItem, Snackbar, Alert,
} from "@mui/material";
import {
  Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Save as SaveIcon, Close as CloseIcon,
} from "@mui/icons-material";
import Sidenav from "../../common/Sidenav";
import Header from "../../common/Header";
import NavigatedComponent from "../NavigatedComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { apiList, invokeGetApi, invokeFormDataApi, invokeDeleteApi } from "../../../services/apiServices";
import { config } from "../../../config/config";

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [variantInput, setVariantInput] = useState({ size: "", price: "", stock: "", originalPrice: "" });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await invokeGetApi(apiList.getAllProducts, {});
      if (response?.status === 200) {
        setProducts(response.data.products || []);
      } else {
        console.error("Failed to fetch products:", response?.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  // ── Open Edit Dialog ────────────────────────────────────────────────
  const handleEditOpen = (product) => {
    // Parse variants if they come as a string
    const parsedVariants = typeof product.variants === 'string' ? JSON.parse(product.variants || '[]') : (product.variants || []);
    setEditProduct({ ...product, variants: parsedVariants });
    setSelectedFile(null);
    setPreviewUrl("");
    setEditOpen(true);
  };

  const handleAddVariant = () => {
    if (!variantInput.size || !variantInput.price) return;
    setEditProduct(prev => ({
      ...prev,
      variants: [...(prev.variants || []), variantInput]
    }));
    setVariantInput({ size: "", price: "", stock: "", originalPrice: "" });
  };

  const handleRemoveVariant = (index) => {
    setEditProduct(prev => ({
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

  // ── Save Edited Product ─────────────────────────────────────────────
  const handleEditSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      Object.keys(editProduct).forEach(key => {
        if (editProduct[key] !== null && editProduct[key] !== undefined) {
          if (key === 'variants') {
            formData.append(key, JSON.stringify(editProduct[key]));
          } else {
            formData.append(key, editProduct[key]);
          }
        }
      });
      if (selectedFile) formData.append("image_file", selectedFile);

      const url = `${config.apiUrl}${apiList.updateProduct}/${editProduct.id}`;
      const response = await invokeFormDataApi(url, formData);

      if (response?.status === 200) {
        setSnackbar({ open: true, message: "Product updated successfully!", severity: "success" });
        setEditOpen(false);
        fetchProducts();
      } else {
        const msg = response?.data?.error || "Failed to update product.";
        setSnackbar({ open: true, message: msg, severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Server error: " + error.message, severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  // ── Delete Product ──────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this product?")) return;
    try {
      const response = await invokeDeleteApi(`${apiList.deleteProduct}/${id}`);
      if (response?.status === 200) {
        setSnackbar({ open: true, message: "Product deleted.", severity: "success" });
        fetchProducts();
      } else {
        setSnackbar({ open: true, message: "Failed to delete product.", severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Server error: " + error.message, severity: "error" });
    }
  };

  const getImageSrc = (image) => {
    if (image && image.startsWith("/uploads")) return `${config.apiUrl}${image}`;
    return `https://via.placeholder.com/40?text=${encodeURIComponent(image?.[0] || "P")}`;
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#F9FAF4", minHeight: "100vh" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Header />
        <Box sx={{ mt: 2 }}>
          <NavigatedComponent pathname={location.pathname} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 3 }}>
            <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#2D6A4F" }}>
              Inventory Manager
            </Typography>
            <Button
              variant="contained" startIcon={<AddIcon />}
              onClick={() => navigate("/inventory-manager/add-new-product")}
              sx={{ bgcolor: "#2D6A4F", borderRadius: 0, "&:hover": { bgcolor: "#1B4332" } }}
            >
              ADD NEW PRODUCT
            </Button>
          </Box>

          <Card elevation={0} sx={{ border: "1px solid #EAEAEA", borderRadius: 0 }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: "#F1F3F4" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>PRODUCT</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>CATEGORY</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>PRICE</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>STATUS</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>QTY</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>RATING</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                        <CircularProgress sx={{ color: "#2D6A4F" }} />
                      </TableCell>
                    </TableRow>
                  ) : products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                        <Typography color="text.secondary">No products found in inventory.</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box
                              component="img"
                              src={getImageSrc(row.image)}
                              alt={row.name}
                              sx={{ width: 40, height: 40, objectFit: "contain", bgcolor: "#eee", borderRadius: 0 }}
                            />
                            <Typography sx={{ fontWeight: 600 }}>{row.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{row.category || "Oils"}</TableCell>
                        <TableCell>₹{row.price}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.quantity > 0 ? "ACTIVE" : "INACTIVE"}
                            size="small"
                            sx={{
                              bgcolor: row.quantity > 0 ? "#E8F5E9" : "#FFEBEE",
                              color: row.quantity > 0 ? "#2E7D32" : "#C62828",
                              fontWeight: 700, borderRadius: 0,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ fontWeight: 600, color: row.quantity === 0 ? "#C62828" : "inherit" }}>
                            {row.quantity ?? 0}
                          </Typography>
                        </TableCell>
                        <TableCell>{row.rating ?? "—"} ⭐</TableCell>
                        <TableCell align="right">
                          <IconButton size="small" sx={{ color: "#2D6A4F" }} onClick={() => handleEditOpen(row)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: "#C62828" }} onClick={() => handleDelete(row.id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Box>

      {/* ── Edit Product Dialog ── */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: "#2D6A4F" }}>
          Edit Product
        </DialogTitle>
        <DialogContent>
          {editProduct && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {/* Image */}
              <Grid item xs={12}>
                <Box sx={{ p: 2, border: "2px dashed #ccc", textAlign: "center", borderRadius: 1 }}>
                  <Box
                    component="img"
                    src={previewUrl || getImageSrc(editProduct.image)}
                    alt="preview"
                    sx={{ width: 120, height: 120, objectFit: "contain", mb: 1 }}
                  />
                  <br />
                  <Button variant="outlined" component="label" size="small"
                    sx={{ borderColor: "#2D6A4F", color: "#2D6A4F" }}>
                    {previewUrl ? "Change Image" : "Upload New Image"}
                    <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Product Name" value={editProduct.name || ""}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Slug" value={editProduct.slug || ""}
                  onChange={(e) => setEditProduct({ ...editProduct, slug: e.target.value })} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={editProduct.category_id || ""}
                  onChange={(e) => setEditProduct({ ...editProduct, category_id: e.target.value })}
                >
                  <MenuItem value={1}>Oil Products</MenuItem>
                  <MenuItem value={2}>Spices Powders</MenuItem>
                  <MenuItem value={4}>Gluten Free Flours</MenuItem>
                  <MenuItem value={3}>Jaggery & Sweeteners</MenuItem>
                  <MenuItem value={5}>Rock Salt</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Sale Price (₹)" type="number" value={editProduct.price || ""}
                  onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Original Price (₹)" type="number" value={editProduct.oldPrice || ""}
                  onChange={(e) => setEditProduct({ ...editProduct, oldPrice: e.target.value })} />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField fullWidth label="Weight (e.g. 1L or 500g)" value={editProduct.weight || ""}
                  onChange={(e) => setEditProduct({ ...editProduct, weight: e.target.value })} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Rating (0-5)" type="number"
                  inputProps={{ step: 0.1, min: 0, max: 5 }}
                  value={editProduct.rating || ""}
                  onChange={(e) => setEditProduct({ ...editProduct, rating: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Stock Qty" type="number"
                  value={editProduct.quantity ?? ""}
                  onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Reviews Count" type="number"
                  value={editProduct.reviews ?? ""}
                  onChange={(e) => setEditProduct({ ...editProduct, reviews: e.target.value })}
                />
              </Grid>

              {/* Variants Manager */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#2D6A4F", mb: 1 }}>
                  Manage Variants (Sizes & Prices)
                </Typography>
                <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={3}>
                      <TextField fullWidth size="small" label="Size (1L or 500g)" value={variantInput.size} onChange={(e) => setVariantInput({ ...variantInput, size: e.target.value })} />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField fullWidth size="small" label="Sale Price" type="number" value={variantInput.price} onChange={(e) => setVariantInput({ ...variantInput, price: e.target.value })} />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField fullWidth size="small" label="Original Price" type="number" value={variantInput.originalPrice} onChange={(e) => setVariantInput({ ...variantInput, originalPrice: e.target.value })} />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField fullWidth size="small" label="Stock" type="number" value={variantInput.stock} onChange={(e) => setVariantInput({ ...variantInput, stock: e.target.value })} />
                    </Grid>
                    <Grid item xs={1}>
                      <Button onClick={handleAddVariant} variant="contained" size="small" sx={{ bgcolor: "#2D6A4F", minWidth: 40 }}>+</Button>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 1 }}>
                    {(editProduct.variants || []).map((v, i) => (
                      <Chip
                        key={i}
                        label={`${v.size}: ₹${v.price} ${v.originalPrice ? `(MRP: ₹${v.originalPrice})` : ""} [Stock: ${v.stock}]`}
                        size="small"
                        onDelete={() => handleRemoveVariant(i)}
                        sx={{ m: 0.5, bgcolor: "#E8F5E9" }}
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={3} label="Description" value={editProduct.description || ""}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditOpen(false)} startIcon={<CloseIcon />}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave} startIcon={<SaveIcon />} disabled={saving}
            sx={{ bgcolor: "#2D6A4F", borderRadius: 0, "&:hover": { bgcolor: "#1B4332" } }}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ borderRadius: 0 }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductList;

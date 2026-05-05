import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Tabs, Tab, Paper, Table, 
  TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Button, IconButton, TextField, Dialog, DialogTitle, 
  DialogContent, DialogActions, Grid, Chip 
} from '@mui/material';
import { Edit, Delete, Add, Save, Close } from '@mui/icons-material';
import axios from 'axios';
import { config } from '../../../config/config';

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ name: '', price: '', slug: '', category_id: 1 });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const prodRes = await axios.get(`${config.apiUrl}/admin/products`);
      setProducts(prodRes.data);
      
      const leadRes = await axios.post(`${config.apiUrl}/getArticles`, { status: 'Active' });
      setBlogs(leadRes.data.blogs || []);

      const inquiriesRes = await axios.post(`${config.apiUrl}/getArticles`, { status: 'Active' }); // Placeholder for leads
      setLeads([]); 
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.keys(currentProduct).forEach(key => {
        if (currentProduct[key] !== null && currentProduct[key] !== undefined) {
          formData.append(key, currentProduct[key]);
        }
      });
      
      if (selectedFile) {
        formData.append('image_file', selectedFile);
      }

      await axios.post(`${config.apiUrl}/admin/save-product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setOpen(false);
      setSelectedFile(null);
      setPreviewUrl('');
      fetchData();
    } catch (error) {
      alert("Error saving product");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this product?")) {
      try {
        await axios.delete(`${config.apiUrl}/admin/product/${id}`);
        fetchData();
      } catch (error) {
        alert("Error deleting product");
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Admin Command Center</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => { 
            setCurrentProduct({ name: '', price: '', slug: '', category_id: 1 }); 
            setSelectedFile(null);
            setPreviewUrl('');
            setOpen(true); 
          }}
        >
          New Product
        </Button>
      </Box>

      <Paper sx={{ width: '100%', mb: 2, borderRadius: 0 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label={`Inventory (${products.length})`} />
          <Tab label={`Blogs (${blogs.length})`} />
          <Tab label="Recent Inquiries" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {tab === 0 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell sx={{ fontWeight: 600 }}>{p.name}</TableCell>
                      <TableCell>{p.category_name}</TableCell>
                      <TableCell>₹{p.price}</TableCell>
                      <TableCell><Chip label={p.status} size="small" color="success" variant="outlined" /></TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => { 
                          setCurrentProduct(p); 
                          setSelectedFile(null);
                          setPreviewUrl('');
                          setOpen(true); 
                        }}><Edit /></IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(p.id)}><Delete /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {tab === 1 && <Typography>Blog Management Coming in next refinement...</Typography>}
          {tab === 2 && <Typography>Lead management linked to your /getLeads route...</Typography>}
        </Box>
      </Paper>

      {/* Product Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{currentProduct.id ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Product Name" 
                value={currentProduct.name} 
                onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})} 
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                fullWidth label="Price" 
                value={currentProduct.price} 
                onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})} 
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                fullWidth label="Slug" 
                value={currentProduct.slug} 
                onChange={(e) => setCurrentProduct({...currentProduct, slug: e.target.value})} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth multiline rows={3} label="Short Description" 
                value={currentProduct.description || ''} 
                onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})} 
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Product Image</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                { (previewUrl || currentProduct.image) && (
                  <Box 
                    component="img" 
                    src={previewUrl || `${config.apiUrl}${currentProduct.image}`} 
                    sx={{ width: 80, height: 80, borderRadius: 1, objectFit: 'cover', border: '1px solid #ddd' }} 
                  />
                )}
                <Button
                  variant="outlined"
                  component="label"
                  size="small"
                >
                  Upload Image
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} startIcon={<Close />}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} startIcon={<Save />}>Save Product</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;

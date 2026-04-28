import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import Sidenav from "../../common/Sidenav";
import Header from "../../common/Header";
import { apiList, invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";

const CategoryList = () => {
  const [cookies] = useCookies();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newCat, setNewCat] = useState({ title: "", slug: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await invokeApi(config.apiUrl + apiList.getAllCategory, {}, cookies);
      if (response?.status === 200) {
        setCategories(response.data.categories || []);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await invokeApi(config.apiUrl + apiList.addCategory, newCat, cookies);
      if (response?.status === 200) {
        setOpen(false);
        fetchCategories();
      }
    } catch (error) {
      console.error("Add category error:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#F9FAF4", minHeight: "100vh" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Header />
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#2D6A4F" }}>
              Category Manager
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={() => setOpen(true)}
              sx={{ bgcolor: "#2D6A4F", borderRadius: 0, "&:hover": { bgcolor: "#1B4332" } }}
            >
              ADD CATEGORY
            </Button>
          </Box>

          <Card elevation={0} sx={{ border: "1px solid #EAEAEA", borderRadius: 0 }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: "#F1F3F4" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>CATEGORY NAME</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>SLUG</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>IMAGE</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 10 }}><CircularProgress sx={{ color: "#2D6A4F" }} /></TableCell>
                    </TableRow>
                  ) : (
                    categories.map((cat) => (
                      <TableRow key={cat.id} hover>
                        <TableCell sx={{ fontWeight: 600 }}>{cat.title}</TableCell>
                        <TableCell>{cat.slug}</TableCell>
                        <TableCell>{cat.image || "N/A"}</TableCell>
                        <TableCell align="right">
                          <IconButton size="small" sx={{ color: "#2D6A4F" }}><EditIcon fontSize="small" /></IconButton>
                          <IconButton size="small" sx={{ color: "#C62828" }}><DeleteIcon fontSize="small" /></IconButton>
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

      {/* Add Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ fontFamily: "Playfair Display", fontWeight: 700 }}>Add New Category</DialogTitle>
        <DialogContent sx={{ minWidth: 400, pt: 1 }}>
          <TextField fullWidth label="Title (e.g. Cold Pressed Oils)" margin="dense" onChange={(e) => setNewCat({...newCat, title: e.target.value})} />
          <TextField fullWidth label="Slug (e.g. oils)" margin="dense" onChange={(e) => setNewCat({...newCat, slug: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: "#666" }}>Cancel</Button>
          <Button onClick={handleAddCategory} variant="contained" sx={{ bgcolor: "#2D6A4F", borderRadius: 0 }}>CREATE CATEGORY</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryList;

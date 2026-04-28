import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import Sidenav from "../../common/Sidenav";
import Header from "../../common/Header";
import NavigatedComponent from "../NavigatedComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../../services/apiServices";

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSideNav, setShowSideNav] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await invokeApi(apiList.getAllProducts, {});
      if (response?.status === 200) {
        setProducts(response.data.products || []);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSideNav = () => setShowSideNav(!showSideNav);

  return (
    <Box sx={{ display: "flex", bgcolor: "#F9FAF4", minHeight: "100vh" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Header toggleSideNav={toggleSideNav} />
        <Box sx={{ mt: 2 }}>
          <NavigatedComponent pathname={location.pathname} />
          
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 3 }}>
            <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#2D6A4F" }}>
              Inventory Manager
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={() => navigate("/dashboard/add-product")}
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
                            <Box sx={{ width: 40, height: 40, bgcolor: "#eee", borderRadius: 0 }} />
                            <Typography sx={{ fontWeight: 600 }}>{row.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{row.category_name || "Oils"}</TableCell>
                        <TableCell>₹{row.price}</TableCell>
                        <TableCell>
                          <Chip 
                            label={row.status?.toUpperCase() || "ACTIVE"} 
                            size="small" 
                            sx={{ bgcolor: row.status === 'active' ? "#E8F5E9" : "#FFF3E0", color: row.status === 'active' ? "#2E7D32" : "#E65100", fontWeight: 700, borderRadius: 0 }} 
                          />
                        </TableCell>
                        <TableCell>{row.rating} ⭐</TableCell>
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
    </Box>
  );
};

export default ProductList;

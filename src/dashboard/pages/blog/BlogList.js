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
  Chip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Preview as PreviewIcon } from "@mui/icons-material";
import Sidenav from "../../common/Sidenav";
import Header from "../../common/Header";
import { useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";

const BlogList = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await invokeApi(config.apiUrl + "/blog/getBlogs", { status: "Active,Inactive" }, cookies);
      if (response?.status === 200) {
        setBlogs(response.data.blogs || []);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
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
              Blog Manager
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={() => navigate("/dashboard/add-blog")}
              sx={{ bgcolor: "#2D6A4F", borderRadius: 0, "&:hover": { bgcolor: "#1B4332" } }}
            >
              WRITE NEW BLOG
            </Button>
          </Box>

          <Card elevation={0} sx={{ border: "1px solid #EAEAEA", borderRadius: 0 }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: "#F1F3F4" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>TITLE</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>CATEGORY</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>URL SLUG</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>STATUS</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                        <CircularProgress sx={{ color: "#2D6A4F" }} />
                      </TableCell>
                    </TableRow>
                  ) : blogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                        <Typography color="text.secondary">No blog posts found.</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    blogs.map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell sx={{ fontWeight: 600 }}>{row.blog_title}</TableCell>
                        <TableCell>{row.category || "General"}</TableCell>
                        <TableCell sx={{ color: "#2D6A4F", fontFamily: "monospace" }}>/{row.og_url}</TableCell>
                        <TableCell>
                          <Chip 
                            label={row.status?.toUpperCase() || "ACTIVE"} 
                            size="small" 
                            sx={{ bgcolor: row.status === 'Active' ? "#E8F5E9" : "#F5F5F5", color: row.status === 'Active' ? "#2E7D32" : "#757575", fontWeight: 700, borderRadius: 0 }} 
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" sx={{ color: "#2D6A4F" }}><PreviewIcon fontSize="small" /></IconButton>
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

export default BlogList;

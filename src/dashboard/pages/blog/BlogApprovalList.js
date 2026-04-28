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
  CircularProgress,
} from "@mui/material";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import Sidenav from "../../common/Sidenav";
import Header from "../../common/Header";
import { invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";

const BlogApprovalList = ({ isApprovedView = false }) => {
  const [cookies] = useCookies();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, [isApprovedView]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const status = isApprovedView ? "Active" : "Pending";
      const response = await invokeApi(config.apiUrl + "/blog/getBlogs", { status }, cookies);
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
          <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#2D6A4F", mb: 4 }}>
            {isApprovedView ? "Approved Articles" : "Awaiting Approval"}
          </Typography>

          <Card elevation={0} sx={{ border: "1px solid #EAEAEA", borderRadius: 0 }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: "#F1F3F4" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>ARTICLE TITLE</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>AUTHOR</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>DATE</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>STATUS</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={5} align="center" sx={{ py: 5 }}><CircularProgress sx={{ color: "#2D6A4F" }} /></TableCell></TableRow>
                  ) : blogs.length === 0 ? (
                    <TableRow><TableCell colSpan={5} align="center" sx={{ py: 5 }}><Typography color="text.secondary">No articles found.</Typography></TableCell></TableRow>
                  ) : (
                    blogs.map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell sx={{ fontWeight: 600 }}>{row.blog_title}</TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell>{row.created_date?.split(' ')[0]}</TableCell>
                        <TableCell>
                          <Chip label={row.status?.toUpperCase()} size="small" sx={{ borderRadius: 0, fontWeight: 700, color: isApprovedView ? "#2E7D32" : "#B7791F", bgcolor: isApprovedView ? "#E8F5E9" : "#FFF8E1" }} />
                        </TableCell>
                        <TableCell align="right">
                          {!isApprovedView && (
                            <Button startIcon={<CheckCircleIcon />} size="small" sx={{ color: "#2D6A4F" }}>APPROVE</Button>
                          )}
                          <Button size="small" sx={{ color: "#666" }}>VIEW DRAFT</Button>
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

export default BlogApprovalList;

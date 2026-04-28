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
  Chip,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import Sidenav from "../../common/Sidenav";
import Header from "../../common/Header";
import { apiList, invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";

const LeadsList = ({ statusFilter = "Fresh" }) => {
  const [cookies] = useCookies();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      // Assuming getLeads API exists or similar structure
      const response = await invokeApi(config.apiUrl + apiList.getLeads, { leadStatus: statusFilter }, cookies);
      if (response?.status === 200) {
        setLeads(response.data.leads || []);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "converted": return { bg: "#E8F5E9", text: "#2E7D32" };
      case "fake": return { bg: "#FFEBEE", text: "#C62828" };
      case "follow-up": return { bg: "#E3F2FD", text: "#1565C0" };
      default: return { bg: "#F5F5F5", text: "#616161" };
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
              {statusFilter} Leads
            </Typography>
            <Button startIcon={<RefreshIcon />} onClick={fetchLeads} sx={{ color: "#2D6A4F" }}>Refresh</Button>
          </Box>

          <Card elevation={0} sx={{ border: "1px solid #EAEAEA", borderRadius: 0 }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: "#F1F3F4" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>CUSTOMER NAME</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>PHONE NUMBER</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>SOURCE</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>DATE</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>STATUS</TableCell>
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
                  ) : leads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                        <Typography color="text.secondary">No {statusFilter.toLowerCase()} leads found.</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    leads.map((row) => {
                      const colors = getStatusColor(row.status);
                      return (
                        <TableRow key={row.id} hover>
                          <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <PhoneIcon fontSize="small" sx={{ color: "#2D6A4F", opacity: 0.7 }} />
                              {row.phone}
                            </Box>
                          </TableCell>
                          <TableCell>{row.source || "Website Popup"}</TableCell>
                          <TableCell>{row.created_at || "2026-04-25"}</TableCell>
                          <TableCell>
                            <Chip 
                              label={row.status?.toUpperCase() || statusFilter.toUpperCase()} 
                              size="small" 
                              sx={{ bgcolor: colors.bg, color: colors.text, fontWeight: 700, borderRadius: 0 }} 
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small" sx={{ color: "#2E7D32" }} title="Mark Converted"><CheckCircleIcon fontSize="small" /></IconButton>
                            <IconButton size="small" sx={{ color: "#C62828" }} title="Mark Fake"><ErrorIcon fontSize="small" /></IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
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

export default LeadsList;

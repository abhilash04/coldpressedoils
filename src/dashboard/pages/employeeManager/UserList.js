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
  Avatar,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import { Add as AddIcon, Person as PersonIcon } from "@mui/icons-material";
import Sidenav from "../../common/Sidenav";
import Header from "../../common/Header";
import { useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";

const UserList = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await invokeApi(config.apiUrl + apiList.getUsers, {}, cookies);
      if (response?.status === 200) {
        setUsers(response.data.users || []);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
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
              Employee Manager
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={() => navigate("/dashboard/add-user")}
              sx={{ bgcolor: "#2D6A4F", borderRadius: 0, "&:hover": { bgcolor: "#1B4332" } }}
            >
              ADD NEW EMPLOYEE
            </Button>
          </Box>

          <Card elevation={0} sx={{ border: "1px solid #EAEAEA", borderRadius: 0 }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: "#F1F3F4" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>EMPLOYEE</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>EMAIL</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>ROLES</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>STATUS</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>JOINED DATE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                        <CircularProgress sx={{ color: "#2D6A4F" }} />
                      </TableCell>
                    </TableRow>
                  ) : users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                        <Typography color="text.secondary">No employees found.</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Avatar sx={{ bgcolor: "#2D6A4F", width: 32, height: 32, fontSize: "0.8rem" }}>
                              {row.name?.charAt(0)}
                            </Avatar>
                            <Typography sx={{ fontWeight: 600 }}>{row.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>
                          {row.roles?.map(role => (
                            <Chip key={role} label={role} size="small" sx={{ mr: 0.5, borderRadius: 0, bgcolor: "#E3F2FD", color: "#1565C0", fontWeight: 600 }} />
                          ))}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={row.status?.toUpperCase() || "ACTIVE"} 
                            size="small" 
                            sx={{ bgcolor: "#E8F5E9", color: "#2E7D32", fontWeight: 700, borderRadius: 0 }} 
                          />
                        </TableCell>
                        <TableCell align="right">{row.createdDate?.split(' ')[0] || "2026-04-25"}</TableCell>
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

export default UserList;

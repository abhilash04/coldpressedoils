import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Link,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Divider,
  Button,
  Dialog,
  Container,
  DialogTitle,
  IconButton,
  DialogContent,
  Grid,
  Paper,
  DialogActions,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import { useCookies } from "react-cookie";
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const AccountPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [productOrderData, setProductOrderData] = useState([]);
  const [openOrderTrack, setOpenOrderTrack] = useState(false);
  const [orderTrackId, setOrderTrackId] = useState(null);
  const [roadMap, setRoadMap] = useState([]);
  const [lineAnimated, setLineAnimated] = useState(false);

  const fetchProductOrderData = async () => {
    const params = {};
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getAllProductOrder,
        params,
        cookies
      );
      if (response?.status === 200) {
        setProductOrderData(response.data.productOrder);
      } else if (response?.status === 400) {
        console.error("Failed to get data. Please try again later!!");
      }
    } catch (error) {
      console.error("Failed to get data. Please try again later!!");
    }
  };

  useEffect(() => {
    fetchProductOrderData();
  }, [])

  const handleOpenOrderTrack = (id) => {
    setOpenOrderTrack(true);
    fetchRoadMapData(id)
    setOrderTrackId(id);
    setLineAnimated(false);
    setTimeout(() => setLineAnimated(true), 100);
  }

  const handleCloseAddTrackDialog = () => {
    setOpenOrderTrack(false);
  }

  const fetchRoadMapData = async (orderId) => {
    const params = { orderId };
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getAllOrderTrack,
        params,
        cookies
      );
      if (response?.status === 200) {
        setRoadMap(response.data.orderTrack);
      } else {
        console.error("Failed to fetch data:", response);
      }
    } catch (error) {
      console.error("Error during data fetch:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: "1250px", mx: "auto" }}>
      <Box sx={{ py: 6, fontFamily: "Roboto, sans-serif" }}>
        {/* Top Row: Account + Logout */}
        <Box display="flex" sx={{ flexDirection: "column" }}>
          <Typography sx={{ fontSize: '32px', fontWeight: 600, color: '#292929' }}>
            Account
          </Typography>
          <Link
            href="/"
            underline="hover"
            color="#064d41"
            display="flex"
            alignItems="center"
            sx={{ fontWeight: 500 }}
          >
            <PersonIcon onClick={() => navigate('/')} sx={{ fontSize: 18, mr: 0.5, color: '#064d41' }} />
            Log out
          </Link>
        </Box>

        {/* Main Content */}
        <Box mt={6} display="flex" justifyContent="space-between" gap={4} flexWrap="wrap">
          {/* Order History */}
          <Box width={{ xs: "100%", md: "76%" }}>
            <Typography variant="h5" mb={2} sx={{ letterSpacing: '0.05rem', fontWeight: 600 }}>
              Order history
            </Typography>

            <Table sx={{ border: "1px solid #eee", borderRadius: 2, overflow: 'hidden' }}>
              <TableHead>
                <TableRow sx={{ borderBottom: '1px solid #ddd' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#333',textAlign:'center' }}>ORDER</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#333',textAlign:'center' }}>DATE</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#333',textAlign:'center' }}>TOTAL</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#333',textAlign:'center' }}>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productOrderData.length > 0 ? productOrderData.map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                      '&:hover': { backgroundColor: "#f1f1f1" }
                    }}
                  >
                    <TableCell sx={{textAlign:'center'}}>
                      <Typography fontWeight={500}>{item.orderId}</Typography>
                    </TableCell>
                    <TableCell sx={{textAlign:'center'}}>
                      <Typography>{item.createdDate}</Typography>
                    </TableCell>
                    <TableCell sx={{textAlign:'center'}}>
                      <Typography>₹{item.payableAmt}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleOpenOrderTrack(item.id)}
                        startIcon={<LocalShippingIcon />}
                        sx={{
                          backgroundColor: '#064d41',
                          textTransform: "none",
                          fontWeight: 500,
                          '&:hover': {
                            backgroundColor: '#053a31',
                          }
                        }}
                      >
                        Track
                      </Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                      <Typography color="text.secondary">No orders found</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

          </Box>

          {/* Account Details */}
          <Box width={{ xs: "100%", md: "20%" }}>
            <Typography variant="h5" mb={1} sx={{ letterSpacing: '0.05rem', fontWeight: 600 }}>
              Account details
            </Typography>
            <Typography sx={{ mb: 0.5 }}>Name</Typography>
            <Typography sx={{ mb: 1 }}>India</Typography>
            <Box mt={2}>
              <Link href="/account/addresses" underline="hover" color="#064d41" sx={{ fontWeight: 500 }}>
                View addresses (0)
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={openOrderTrack}
        onClose={handleCloseAddTrackDialog}
        fullWidth
        maxWidth="xs"
      >
        <Container>
          <DialogTitle
            sx={{
              // mb: 1,
              mx: 8,
              fontSize: 18,
              fontWeight: 600,
              textAlign: "center",
              position: "relative",
            }}
          >
            Track Your Order
            <IconButton
              aria-label="close"
              onClick={handleCloseAddTrackDialog}
              sx={{
                position: 'absolute',
                right: -70,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>


          <DialogContent>
            <Grid container spacing={2} >
              {/* Horizontal Order Track Timeline */}
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                  }}
                >
                  {roadMap.length > 0 ? (
                    <Box
                      sx={{
                        height: '66vh',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        overflowY: "auto",
                        scrollbarWidth: "none",
                        gap: 4,
                        py: 2,
                        px: 1,
                        position: "relative",
                      }}
                    >
                      {roadMap.map((step, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            position: "relative",
                            // pl: 3,
                          }}
                        >
                          {/* Vertical Line (connects to the next dot) */}
                          {index < roadMap.length - 1 && (
                            <Box
                              sx={{
                                position: "absolute",
                                top: "38px",
                                left: "10px",
                                height: "calc(100% + 20px)",
                                width: "4px",
                                backgroundColor: "rgba(6, 77, 65, 0.1)",
                                zIndex: 1,
                                overflow: "hidden",
                              }}
                            >
                              <Box
                                sx={{
                                  height: lineAnimated ? "100%" : "0%",
                                  width: "100%",
                                  background: "linear-gradient(to bottom, #064d41, #38a169)",
                                  transition: "height 1s ease-out",
                                  transitionDelay: `${index * 0.2}s`,
                                }}
                              />
                            </Box>
                          )}

                          {/* Dot */}
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              backgroundColor: "#064d41",
                              zIndex: 2,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: index === roadMap.length - 1 ? 
                                "0 0 0 6px rgba(6, 77, 65, 0.4)" : 
                                "0 0 0 4px rgba(6, 77, 65, 0.2)",
                              mt: "25px",
                              animation: index === roadMap.length - 1 ? 
                                "pulse 1.5s infinite" : "none",
                              "@keyframes pulse": {
                                "0%": {
                                  boxShadow: "0 0 0 0 rgba(6, 77, 65, 0.7)",
                                  transform: "scale(0.95)"
                                },
                                "70%": {
                                  boxShadow: "0 0 0 10px rgba(6, 77, 65, 0)",
                                  transform: "scale(1)"
                                },
                                "100%": {
                                  boxShadow: "0 0 0 0 rgba(6, 77, 65, 0)",
                                  transform: "scale(0.95)"
                                }
                              }
                            }}
                          >
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                backgroundColor: "white",
                                animation: "bounce 1s infinite alternate",
                                "@keyframes bounce": {
                                  "0%": { transform: "scale(0.8)" },
                                  "100%": { transform: "scale(1.2)" },
                                },
                              }}
                            />
                          </Box>

                          {/* Status Card */}
                          <Box
                            sx={{
                              ml: 3,
                              mb: 2,
                              backgroundColor: "#fff",
                              border: "1px solid rgba(6, 77, 65, 0.1)",
                              borderRadius: "12px",
                              p: 2,
                              minWidth: "200px",
                              textAlign: "left",
                              boxShadow: "0 4px 12px rgba(6, 77, 65, 0.08)",
                              transition: "all 0.3s ease",
                              position: "relative",
                              overflow: "hidden",
                              "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: "0 8px 16px rgba(6, 77, 65, 0.12)",
                                borderColor: "rgba(6, 77, 65, 0.3)",
                              },
                              "&:after": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "4px",
                                height: "100%",
                                background: "linear-gradient(to bottom, #064d41, #38a169)",
                              },
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color: "#064d41",
                                mb: 0.5,
                              }}
                            >
                              {step.trackStatus}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                fontSize: "0.75rem",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {new Date(step.createdDate).toLocaleString("en-US", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 4,
                        textAlign: "center",
                        backgroundColor: "rgba(6, 77, 65, 0.04)",
                        borderRadius: "8px",
                        border: "1px dashed rgba(6, 77, 65, 0.2)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.02)",
                          backgroundColor: "rgba(6, 77, 65, 0.08)"
                        }
                      }}
                    >
                      <FolderOutlinedIcon
                        sx={{
                          fontSize: "3rem",
                          color: "#a0b5ad",
                          mb: 1,
                          transition: "all 0.3s ease",
                          animation: "float 3s ease-in-out infinite",
                          "@keyframes float": {
                            "0%, 100%": { transform: "translateY(0)" },
                            "50%": { transform: "translateY(-5px)" }
                          }
                        }}
                      />
                      <Typography variant="body1" sx={{ color: "#4a635c", fontWeight: 500 }}>
                        No tracking info available
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#90a59d", mt: 0.5 }}>
                        Add a tracking status to view timeline
                      </Typography>
                    </Box>
                  )}
                </Paper>

              </Grid>


            </Grid>
          </DialogContent>


        </Container>
      </Dialog>
    </Box>
  );
};

export default AccountPage;
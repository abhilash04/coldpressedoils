import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Drawer,
  IconButton,
  Paper,
  Slide,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Grid,
} from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import img from "../../assets/combo.avif";
import img3 from "../../assets/payment-mathod.jpg";
import CloseIcon from "@mui/icons-material/Close";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckoutDrawer from "./CheckoutDrawer";

const CartDrawer = ({ open, onClose, cartItems, onCartUpdate }) => {
  const [showPriceSummary, setShowPriceSummary] = useState(false);
  const [localCartItems, setLocalCartItems] = useState([]);
  const [openCheckout, setOpenCheckout] = useState(false)


  useEffect(() => {
    // Initialize with empty array if cartItems is undefined
    setLocalCartItems(cartItems || []);
  }, [cartItems]);

  const togglePriceSummary = () => {
    setShowPriceSummary(!showPriceSummary);
  };

  const handleQuantityChange = (productId, value) => {
    const existingItem = localCartItems.find(item => item.id === productId);
    let updatedCart;

    if (!existingItem) return;

    if (existingItem.quantity + value > 0) {
      updatedCart = localCartItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + value } : item
      );
    } else {
      updatedCart = localCartItems.filter(item => item.id !== productId);
    }

    setLocalCartItems(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    if (onCartUpdate) onCartUpdate(updatedCart);
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = localCartItems.filter(item => item.id !== productId);
    setLocalCartItems(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    if (onCartUpdate) onCartUpdate(updatedCart);
  };

  // Calculate total price and discounts
  const calculateTotals = () => {
    // Ensure we're working with an array
    const items = Array.isArray(localCartItems) ? localCartItems : [];

    const subtotal = items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
    const discount = items.reduce(
      (sum, item) => sum + ((item.scratchPrice || 0) - (item.price || 0)) * (item.quantity || 0),
      0
    );
    // const prepaidDiscount = subtotal * 0.02; // 2% prepaid discount
    // const total = subtotal - prepaidDiscount;
    // const savings = discount + prepaidDiscount;
    const total = subtotal;
    const savings = discount;

    return {
      subtotal,
      discount,
      // prepaidDiscount,
      total,
      savings,
    };
  };

  const {
    subtotal,
    discount,
    // prepaidDiscount,
    total,
    savings
  } = calculateTotals();

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box
          sx={{
            width: 450,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocalGroceryStoreIcon
                  sx={{ fontSize: 28, mr: 1, color: "#00695c" }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#004d40",
                    fontSize: "20px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Your Cart ({localCartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </Typography>
              </Box>

              <IconButton onClick={onClose}>
                <CloseIcon sx={{ color: "#444", backgroundColor: "#cec4c41f" }} />
              </IconButton>
            </Box>

            {localCartItems.length === 0 ? (
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="h6">Your cart is empty</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Add some products to your cart
                </Typography>
              </Box>
            ) : (
              <>
                <Box>
                  <img
                    src={img}
                    alt="Promo"
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                </Box>

                {localCartItems.map((item) => (
                  <Box key={item.id} mb={2} sx={{ px: 2 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <img
                          src={item.featuredImage}
                          alt={item.productImage}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            color: "#004d40",
                            fontSize: "16px",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {item.productName}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                          <Typography variant="body1" fontWeight="bold" mr={1}>
                            ₹{item.price}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textDecoration: "line-through",
                              color: "text.secondary",
                              mr: 1,
                            }}
                          >
                            ₹{item.scratchPrice}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#004d40" }}>
                            ({Math.round(((item.scratchPrice - item.price) * 100) / item.scratchPrice)}% off)
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mt: 2,
                          }}
                        >
                          <Paper
                            variant="outlined"
                            size="small"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              borderRadius: 2,
                              overflow: "hidden",
                            }}
                          >
                            <IconButton
                              onClick={() => handleQuantityChange(item.id, -1)}
                              disabled={item.quantity === 1}
                              size="small"
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>

                            <Box sx={{ px: 2, minWidth: 32, textAlign: "center" }}>
                              {item.quantity}
                            </Box>

                            <IconButton
                              onClick={() => handleQuantityChange(item.id, 1)}
                              size="small"
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Paper>

                          <IconButton
                            sx={{ color: "#a3a3a3" }}
                            onClick={() => handleRemoveItem(item.id)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                ))}


                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#242424",
                      fontSize: "18px",
                      letterSpacing: "0.5px",
                      mt: 2.5,
                      px: 1,
                    }}
                  >
                    Available offers for you
                  </Typography>

                  <Box display="flex" gap={1.5} sx={{ px: 4 }}>
                    <List
                      dense
                      sx={{ mb: 0, pb: 0, width: 250, backgroundColor: "#fff8f1" }}
                    >
                      <ListItem alignItems="flex-start" sx={{ px: 1 }}>
                        <ListItemText
                          primary={
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "600",
                                letterSpacing: "0.5px",
                              }}
                            >
                              Upto 30% off
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography
                                sx={{
                                  color: "#606060",
                                  fontSize: "13px",
                                  letterSpacing: "0.5px",
                                }}
                              >
                                • Offer applicable on combos
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#606060",
                                  fontSize: "13px",
                                  letterSpacing: "0.5px",
                                }}
                              >
                                • No coupon needed
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    </List>

                    <List
                      dense
                      sx={{ mb: 0, p: 0, width: 250, backgroundColor: "#fff8f1" }}
                    >
                      <ListItem alignItems="flex-start" sx={{ px: 1 }}>
                        <ListItemText
                          primary={
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "600",
                                letterSpacing: "0.5px",
                              }}
                            >
                              Flat 15% off
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography
                                sx={{
                                  color: "#606060",
                                  fontSize: "13px",
                                  letterSpacing: "0.5px",
                                }}
                              >
                                • Minimum purchase of ₹599
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#606060",
                                  fontSize: "13px",
                                  letterSpacing: "0.5px",
                                }}
                              >
                                • Not applicable on combos
                              </Typography>
                              <Box
                                display="flex"
                                alignItems="center"
                                gap={2}
                                mt={1}
                                sx={{ border: "1px solid #bdb9b9ff" }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{ px: 1, color: "black" }}
                                >
                                  MONSOON15
                                </Typography>
                                <Typography
                                  variant="body2"
                                  component="button"
                                  onClick={() =>
                                    navigator.clipboard.writeText("MONSOON15")
                                  }
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    fontSize: "0.75rem",
                                    backgroundColor: "#004d40",
                                    color: "white",
                                    px: 1,
                                    py: 0.5,
                                    cursor: "pointer",
                                    border: "1px solid #004d40",
                                  }}
                                >
                                  Copy <ContentCopyIcon sx={{ fontSize: "1rem" }} />
                                </Typography>
                              </Box>
                            </>
                          }
                        />
                      </ListItem>
                    </List>
                  </Box>
                </Box>
              </>
            )}
          </Box>

          {localCartItems.length > 0 && (
            <Box sx={{ position: "relative" }}>
              <Slide
                direction="up"
                in={showPriceSummary}
                mountOnEnter
                unmountOnExit
              >
                <Box
                  sx={{
                    backgroundColor: "white",
                    boxShadow: "0 -4px 12px rgba(0,0,0,0.1)",
                    p: 2,
                    borderTop: "1px solid #e0e0e0",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      color: "#212121",
                    }}
                  >
                    Price Summary
                  </Typography>

                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{
                            border: "none",
                            p: "4px 0",
                            color: "#616161",
                          }}
                        >
                          Order Total
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            border: "none",
                            p: "4px 0",
                            fontWeight: "500",
                          }}
                        >
                          ₹{subtotal.toFixed(2)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            border: "none",
                            p: "4px 0",
                            color: "#616161",
                          }}
                        >
                          Items Discount
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            border: "none",
                            p: "4px 0",
                            color: "#388e3c",
                            fontWeight: "500",
                          }}
                        >
                          -₹{discount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            border: "none",
                            p: "4px 0",
                            color: "#616161",
                          }}
                        >
                          Shipping
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            border: "none",
                            p: "4px 0",
                            color: "#388e3c",
                            fontWeight: "500",
                          }}
                        >
                          Free (₹49)
                        </TableCell>
                      </TableRow>
                      {/* <TableRow>
                        <TableCell
                          sx={{
                            border: "none",
                            p: "4px 0",
                            color: "#616161",
                          }}
                        >
                          2% Prepaid Discount
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            border: "none",
                            p: "4px 0",
                            color: "#388e3c",
                            fontWeight: "500",
                          }}
                        >
                          -₹{prepaidDiscount.toFixed(2)}
                        </TableCell>
                      </TableRow> */}
                      <TableRow>
                        <TableCell
                          sx={{
                            border: "none",
                            p: "8px 0",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          To Pay
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            border: "none",
                            p: "8px 0",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          ₹{total.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Typography
                    align="center"
                    sx={{
                      backgroundColor: "#235a49",
                      color: "white",
                      fontWeight: "500",
                      py: 1,
                      borderRadius: 1,
                      fontSize: "15px",
                    }}
                  >
                    🎉 You saved ₹{savings.toFixed(2)} on this order
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={img3}
                      alt="Promo"
                      style={{ width: "100%" }}
                    />
                  </Box>
                </Box>
              </Slide>

              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  p: 1.5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid #e0e0e0",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      mr: 1,
                    }}
                  >
                    ₹{total.toFixed(2)}
                  </Typography>
                  <IconButton
                    onClick={togglePriceSummary}
                    sx={{ color: "#616161" }}
                  >
                    {showPriceSummary ? (
                      <ExpandLessIcon sx={{ fontSize: "24px" }} />
                    ) : (
                      <ExpandMoreIcon sx={{ fontSize: "24px" }} />
                    )}
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  onClick={() => setOpenCheckout(true)}
                  sx={{
                    backgroundColor: "#eeb333ff",
                    color: "#235a49",
                    textTransform: "none",
                    borderRadius: "8px",
                    px: 3,
                    py: 1.5,
                    width: "200px",
                    fontSize: "16px",
                    fontWeight: "600",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#ffc850",
                      boxShadow: "none",
                    },
                  }}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>
      <CheckoutDrawer
        cartItems={cartItems}
        savings={savings}
        payAmount={total}
        openCheckout={openCheckout}
        onCloseCheckout={() => setOpenCheckout(false)}
      />
    </>


  );
};

export default CartDrawer;
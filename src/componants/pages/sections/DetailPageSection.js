import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  Dialog,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import productImage2 from "../../../assets/img2.jpg";
import productImage3 from "../../../assets/img3.jpg";
import productImage4 from "../../../assets/img4.jpg";
import simplLogo from "../../../assets/brand.png";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import offerBanner from "../../../assets/bnr1.png";
import supportImage from "../../../assets/support.png";
import video from "../../../assets/video7.mp4";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { apiList, invokeApi } from "../../../services/apiServices";
import { config } from "../../../config/config";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckoutDrawer from "../CheckoutDrawer";

const DetailPageSection = ({ onCartUpdate }) => {
  const { ogUrl } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(2);
  const [isZoomed, setIsZoomed] = useState(false);
  const [pincode, setPincode] = useState("122002");
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [productData, setProductData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [openCheckout, setOpenCheckout] = useState(false)


  useEffect(() => {
    // Load cart from session storage on initial render
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, [onCartUpdate]);



  const handleFullscreenOpen = () => {
    setFullscreenOpen(true);
  };

  const handleFullscreenClose = () => {
    setFullscreenOpen(false);
  };

  const fetchProductByOgUrl = async (ogUrl) => {
    const params = { ogUrl }
    try {
      const response = await invokeApi(apiList.getProductByOgUrl, params);
      if (response?.status === 200) {
        const product = response.data.products;
        setProductData(product);
        if (product.productGallery && product.productGallery.length > 0) {
          setSelectedImage(product.productGallery[0].imageUrl);
        } else if (product.image) {
          setSelectedImage(product.image);
        }
      } else if (response?.status === 400) {
        console.error("Failed to get data. Please try again later!!");
      }
    } catch (error) {
      console.error("Failed to get data. Please try again later!!");
    }
  };

  useEffect(() => {
    fetchProductByOgUrl(ogUrl);
  }, [])

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    if (onCartUpdate) onCartUpdate(updatedCart);
  };

  const handleBuyProduct = (product) => {
    const updatedCart = [{ ...product, quantity: 1 }];
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    if (onCartUpdate) onCartUpdate(updatedCart);
    setOpenCheckout(true);
  };

  const handleRemoveFromCart = (productId) => {
    const existingItem = cartItems.find(item => item.id === productId);
    let updatedCart;

    if (existingItem.quantity > 1) {
      updatedCart = cartItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    } else {
      updatedCart = cartItems.filter(item => item.id !== productId);
    }

    setCartItems(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    if (onCartUpdate) onCartUpdate(updatedCart);
  };

  const cartItem = cartItems.find(cartItem => cartItem.id === productData.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Calculate total price and discounts
  const calculateTotals = () => {
    // Ensure we're working with an array
    const items = Array.isArray(cartItems) ? cartItems : [];

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
    <Grid container sx={{ minHeight: "100vh", maxWidth: "1400px", mx: "auto" }}>
      {/* Left: Fixed Section */}
      <Grid item xs={12} md={5}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            mt: 6,
            // ml:2,
            // mr:4,
            // height: "100vh",
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: 'center'
          }}
        >
          <Box
            onClick={handleFullscreenOpen}
            sx={{
              position: "relative",
              overflow: "hidden",
              transform: isZoomed ? "scale(1.5)" : "scale(1)",
              transformOrigin: "center",
              zIndex: isZoomed ? 9999 : "auto",
              transition: "all 0.3s ease",
              cursor: "zoom-in",
            }}
          >
            <Box
              component="img"
              src={selectedImage}
              alt="A2 Gir Cow Ghee"
              sx={{
                width: "100%",
                height: "60vh",
                objectFit: "contain",
                transition: "transform 0.3s ease",
              }}
            />
          </Box>

          {/* Fullscreen Dialog */}
          <Dialog
            open={fullscreenOpen}
            onClose={handleFullscreenClose}
            fullScreen
            sx={{
              "& .MuiDialog-paper": {
                backgroundColor: "rgba(0,0,0,0.9)",
                // backgroundColor:"#fff",
                overflow: "hidden",
                // p:4
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // py: 4,
              }}
            >
              <IconButton
                onClick={handleFullscreenClose}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  color: "common.white",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.8)",
                  },
                }}
              >
                <CloseRoundedIcon />
              </IconButton>

              <Box
                component="img"
                src={selectedImage}
                alt="Product Image - Fullscreen"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  cursor: "zoom-out",
                }}
              // onClick={handleFullscreenClose}
              />
            </Box>
          </Dialog>

          {/* Thumbnail Gallery */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 3,
              justifyContent: "center",
            }}
          >
            {productData?.productGallery?.map((image) => (
              <Box
                key={image.id}
                sx={{
                  transition: "all 0.3s ease",
                  transform: "scale(1)",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={image.imageUrl}
                  alt={image.id}
                  sx={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 1,
                    cursor: "pointer",
                    border: selectedImage === image.imageUrl ? 2 : 0,
                    borderColor: "primary.main",
                    opacity: selectedImage === image.imageUrl ? 1 : 0.7,
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => setSelectedImage(image.imageUrl)}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>

      {/* Right: Scrollable Section */}
      <Grid item xs={12} md={7}>
        <Box
          sx={{
            maxHeight: "100vh",
            overflowY: "auto",
            maxWidth: "650px",
            mt: 2,
            p: 3,
            bgcolor: "#fff",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "26px",
            }}
          >
            {productData.productName}
          </Typography>

          <Typography
            color="grey"
            sx={{ fontSize: "16px" }}
            dangerouslySetInnerHTML={{ __html: productData.shortDescription }}
          />


          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 2,
              mb: 1,
            }}
          >
            <Box>
              {/* Dummy star icons - replace with <Rating /> from MUI if needed */}
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  color: "#f5a623",
                }}
              >
                {"★".repeat(5)}
                <span
                  style={{
                    marginLeft: 8,
                    fontWeight: 500,
                    color: "grey",
                    fontSize: "0.95rem",
                  }}
                >
                  241 reviews
                </span>
              </Typography>

              {/* View all reviews link */}
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                View all reviews
              </Typography>
            </Box>
            <Box>
              {/* Price */}
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                ₹{productData.price}
              </Typography>
              <Typography
                component="span"
                variant="body1"
                color="grey"
                sx={{ textDecoration: "line-through", mr: 1 }}
              >
                ₹{productData.scratchPrice}
              </Typography>
              <Typography
                component="span"
                variant="body1"
                color="success.main"
                sx={{ fontWeight: 600 }}
              >
                {Math.round(((productData.scratchPrice - productData.price) * 100) / productData.scratchPrice)}% OFF
              </Typography>
            </Box>
          </Box>

          <Typography
            sx={{ fontSize: "12px", textAlign: "right", color: "grey", mt: -1 }}
          >
            MRP (Incl. of all taxes)
          </Typography>

          {/* <Paper
            elevation={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1.5,
              borderRadius: 3,
              border: "1px solid #f0e8e8ff",
              width: "fit-content",
              maxWidth: "100%",
              boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccountBalanceWalletIcon fontSize="small" />
              <Typography variant="body2">
                Pay{" "}
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ fontWeight: 600, color: "success.main" }}
                >
                  ₹776.68
                </Typography>
                /month in Easy, Interest-Free Installments.
              </Typography>
            </Box>

            <Box
              component="img"
              src={simplLogo}
              alt="Simpl"
              sx={{ height: 20, ml: 2 }}
            />
          </Paper> */}
          {/* <Typography
            variant="body2"
            sx={{
              my: 3,
              color: "success.main",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                bgcolor: "success.light",
                color: "success.dark",
                px: 1,
                borderRadius: 1,
              }}
            >
              ★
            </Box>
            Earn {Math.floor(variants[selectedVariant].price * 0.05)} points on
            this product
          </Typography> */}

          <Typography
            fontWeight={600}
            sx={{ mb: 1, color: "grey", fontSize: "1rem" }}
          >
            Select Variant
          </Typography>

          {/* <Grid
            container
            spacing={1}
            sx={{ mb: 3, flexWrap: "nowrap", overflowX: "auto", pb: 1 }}
          >
            {variants.map((variant, index) => {
              const sizeInLiters = variant.size.includes("500ml")
                ? 0.5
                : variant.size.includes("1L")
                  ? 1
                  : 5;
              const pricePerLiter =
                Math.round((variant.price / sizeInLiters) * 1000) / 1000;

              return (
                <Grid item xs="auto" key={variant.id}>
                  <Paper
                    variant="outlined"
                    sx={{
                      width: 200,
                      p: 0,
                      cursor: "pointer",
                      borderColor:
                        selectedVariant === index ? "#00584b" : "divider",
                      borderWidth: selectedVariant === index ? 1.5 : 1,
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => setSelectedVariant(index)}
                  >
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderBottom: 0.5,
                        color: selectedVariant === index ? "white" : "black",
                        bgcolor:
                          selectedVariant === index ? "#00584b" : "#f1f4fb",
                        borderColor: "divider",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        className="variant-title"
                        sx={{}}
                      >
                        {variant.size}
                      </Typography>
                    </Box>

                    <Box sx={{ px: 1.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          className="price-text"
                        >
                          ₹{variant.price.toLocaleString()}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="price-text"
                          sx={{
                            textDecoration: "line-through",
                            color: "text.secondary",
                          }}
                        >
                          ₹{variant.mrp.toLocaleString()}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "success.main",
                            fontWeight: 600,
                            bgcolor: "success.light",
                            px: 0.5,
                            borderRadius: 0.5,
                          }}
                        >
                          {variant.discount} off
                        </Typography>
                      </Box>

                      <Typography
                        variant="caption"
                        className="price-text"
                        color="text.secondary"
                      >
                        ₹{pricePerLiter}/L
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid> */}

          <Grid
            container
            spacing={1}
            sx={{ mb: 3, flexWrap: "nowrap", overflowX: "auto", pb: 1 }}
          >

            <Grid item xs="auto" >
              <Paper
                variant="outlined"
                sx={{
                  width: 200,
                  p: 0,
                  cursor: "pointer",
                  borderColor:
                    "#00584b",
                  borderWidth: 1.5,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              // onClick={() => setSelectedVariant(index)}
              >
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderBottom: 0.5,
                    color: "white",
                    bgcolor:
                      "#00584b",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    className="variant-title"
                    sx={{}}
                  >
                    500 ml
                  </Typography>
                </Box>

                <Box sx={{ px: 1.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      className="price-text"
                    >
                      ₹{productData.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="price-text"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.secondary",
                      }}
                    >
                      ₹{productData.scratchPrice}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "success.main",
                        fontWeight: 600,
                        bgcolor: "success.light",
                        px: 0.5,
                        borderRadius: 0.5,
                      }}
                    >
                      {Math.round(((productData.scratchPrice - productData.price) * 100) / productData.scratchPrice)}% off
                    </Typography>
                  </Box>

                  <Typography
                    variant="caption"
                    className="price-text"
                    color="text.secondary"
                  >
                    ₹{productData.price * 2}/L
                  </Typography>
                </Box>
              </Paper>
            </Grid>

          </Grid>

          <Box sx={{ mt: 2 }}>
            <Box
              component="img"
              src={offerBanner}
              alt="Offer"
              sx={{ width: "100%", height: '220px', borderRadius: 2 }}
            />
          </Box>

          <Paper
            sx={{
              p: 2,
              my: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              color="success.dark"
              fontWeight="bold"
            >
              Delivery Date
            </Typography>
            <Typography variant="body2">
              Enter Pin code to check <b>delivery date</b>
            </Typography>

            <Box display="flex" alignItems="center">
              <TextField
                placeholder="Enter Pincode"
                value={pincode}
                size="small"
                onChange={(e) => setPincode(e.target.value)}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                color="success"
                sx={{ px: 3, py: 1, backgroundColor: "#00584b" }}
              >
                Check
              </Button>
            </Box>
          </Paper>

          {/* Quantity and Cart Buttons */}
          <Box sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              {quantity > 0 ? (
                <Paper
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromCart(productData.id);
                    }}
                    color="grey"
                  >
                    <RemoveIcon sx={{ backgroundColor: "#f1f2f1" }} />
                  </IconButton>
                  <Box sx={{ px: 2, minWidth: 40, textAlign: "center" }}>
                    {quantity}
                  </Box>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(productData);
                    }}
                    color="grey"
                  >
                    <AddIcon sx={{ backgroundColor: "#f1f2f1" }} />
                  </IconButton>
                </Paper>
              ) : (

                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    borderRadius: 6,
                    backgroundColor: "#00584b",
                    px: 3.5,
                    py: 1,
                    flex: 1,
                    boxShadow: "none",
                    "&:hover": {
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  size="large"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(productData);
                  }}
                >
                  Add to cart
                </Button>
              )}

              <Button
                variant="contained"
                sx={{
                  bgcolor: "warning.main",
                  color: "#00584b",
                  backgroundColor: "#efc905",
                  borderRadius: 6,
                  px: 3.5,
                  py: 1,
                  mb: 1,
                  flex: 1,
                  fontWeight: 600,
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "warning.dark",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
                size="large"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyProduct(productData);
                }}
              >
                Buy Now
              </Button>
            </Box>
          </Box>

          {/* Product Description */}
          <Box sx={{ mb: 3.5 }}>
            <Typography variant="body1" fontWeight={700} sx={{ mb: 2 }}>
              PRODUCT DESCRIPTION
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              dangerouslySetInnerHTML={{ __html: productData.fullDescription }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Box
              component="img"
              src={supportImage}
              alt="Offer"
              sx={{ width: "100%", borderRadius: 2 }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{ my: 3, width: "100%" }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "32px",
            color: "#00584b",
            textAlign: "center", // Optional: for better visual on large screens
          }}
        >
          Where Happy Cows Roam
        </Typography>

        <Box
          sx={{
            mt: 2,
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <Box
            component="iframe"
            src={video}
            title="Product Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sx={{
              width: "100%",
              height: "60vh",
              borderRadius: 2,
              border: 0,
            }}
          />
        </Box>
      </Grid>

      <CheckoutDrawer
        cartItems={cartItems}
        savings={savings}
        payAmount={total}
        openCheckout={openCheckout}
        onCloseCheckout={() => setOpenCheckout(false)}
      />
    </Grid>
  );
};

export default DetailPageSection;

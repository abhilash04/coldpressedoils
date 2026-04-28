import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Typography,
  CardContent,
  CardMedia,
  Button,
  Rating,
  Stack,
  Chip,
  Paper,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import CategoryMenuCollection from "./CategoryMenuCollection";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { config } from "../../../config/config";
import { apiList, invokeApi } from "../../../services/apiServices";
import img from "../../../assets/title-icon.webp";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import CheckoutDrawer from "../CheckoutDrawer";

const AllProductCollection = ({ onCartUpdate }) => {
  const { search } = useLocation();
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const categoryFromURL = queryParams.get("category") || "All";
  const [productsData, setProductsData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [openCheckout, setOpenCheckout] = useState(false)

  const scrollRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);

  // const products = allProducts[categoryFromURL] || [];
  useEffect(() => {
    // Load cart from session storage on initial render
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, [onCartUpdate]);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        // If near the end, reset to start (instantly for smooth looping)
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          scrollRef.current.scrollTo({ left: 0, behavior: "instant" });
        } else {
          scrollRef.current.scrollBy({ left: 10, behavior: "smooth" }); // Small increments
        }
      }
    }, 100); // 0.1s (100ms) interval

    return () => clearInterval(scrollInterval);
  }, []);

  useEffect(() => {
    // Sync URL when selectedCategory changes
    if (selectedCategory !== categoryFromURL) {
      navigate(`?category=${encodeURIComponent(selectedCategory)}`, {
        replace: true,
      });
    }
  }, [selectedCategory, categoryFromURL, navigate]);

  const fetchProductData = async () => {
    const params = {};
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getAllProducts,
        params
      );
      if (response?.status === 200) {
        setProductsData(response.data.products);
      } else if (response?.status === 400) {
        console.error("Failed to get data. Please try again later!!");
      }
    } catch (error) {
      console.error("Failed to get data. Please try again later!!");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    if (categoryFromURL !== selectedCategory) {
      setSelectedCategory(categoryFromURL);
    }
  }, [categoryFromURL]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
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
    const existingItem = cartItems.find((item) => item.id === productId);
    let updatedCart;

    if (existingItem.quantity > 1) {
      updatedCart = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    } else {
      updatedCart = cartItems.filter((item) => item.id !== productId);
    }

    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    if (onCartUpdate) onCartUpdate(updatedCart);
  };

// const filteredProducts = useMemo(() => {
//     if (selectedCategory === "All") return productsData;
//     return productsData.filter((product) => 
//       product.category === selectedCategory || product.subCategory === selectedCategory
//     );
//   }, [productsData, selectedCategory]);


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
    <>
      <CategoryMenuCollection
        onSelectCategory={(label) => setSelectedCategory(label)}
        activeCategory={selectedCategory}
      />
      <Box
        sx={{
          p: 4,
          maxWidth: 1200,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          py: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // centers both text and image horizontally
            textAlign: "center",
            pb: 3.5,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: "1.8rem",
              fontFamily: "var(--font-heading-family)",
              color: "#00584b",
              fontStyle: "var(--font-heading-style)",
              letterSpacing: "calc(var(--font-heading-scale) * 0.06rem)",
              lineHeight: "calc(1 + 0.3 / max(1, var(--font-heading-scale)))",
              wordBreak: "break-word",
            }}
          >
            Top Rated & Most Bought
          </Typography>

          <img
            src={img} // Replace with your actual logo path
            alt="Logo"
            style={{
              width: "80px", // Adjust as needed
              height: "auto",
              mt: 0.5,
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            overflowX: "auto",
            scrollbarWidth: "none",
            gap: 4,
          }}
        >
          {productsData.map((item, idx) => {
            const cartItem = cartItems.find(
              (cartItem) => cartItem.id === item.id
            );
            const quantity = cartItem ? cartItem.quantity : 0;
            return (
              <Box
                key={idx}
                sx={{
                  borderRadius: "10px",
                  position: "relative",
                  overflow: "visible",
                  border: "1px solid #d1d1d1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minWidth: 250,
                  backgroundColor: "#fff",
                }}
                onClick={() => navigate(`/products/${item.ogUrl}`)}
              >
                {/* Labels */}
                <Box sx={{ position: "absolute", top: 0, left: 16 }}>
                  <Chip
                    label="New Launch"
                    sx={{
                      backgroundColor: "#1d639f",
                      color: "white",
                      fontWeight: 600,
                      borderRadius: "0 0 10px 0",
                      fontSize: 12,
                      fontFamily: "var(--font-heading-family)",
                    }}
                  />
                </Box>
                <Box sx={{ position: "absolute", top: 0, right: 16 }}>
                  <Chip
                    label={`${Math.round(
                      ((item.scratchPrice - item.price) * 100) /
                        item.scratchPrice
                    )}% Off`}
                    sx={{
                      backgroundColor: "#00584b",
                      color: "white",
                      fontWeight: 600,
                      borderRadius: "0 0 0 10px",
                      fontSize: 12,
                      fontFamily: "var(--font-heading-family)",
                    }}
                  />
                </Box>

                {/* Image */}
                <CardMedia
                  component="img"
                  image={item.featuredImage}
                  alt={item.productNamae}
                  sx={{
                    objectFit: "contain",
                    height: 260,
                  }}
                />

                {/* Content */}
                <CardContent sx={{ px: 2, py: 1 }}>
                  <Typography
                    color="text.secondary"
                    sx={{
                      fontFamily: "var(--font-heading-family)",
                      fontSize: "14px",
                    }}
                  >
                    {item.category}
                  </Typography>
                  <Typography
                    fontWeight="bold"
                    sx={{
                      my: 0.4,
                      fontFamily: "var(--font-heading-family)",
                      fontSize: "18px",
                    }}
                  >
                    {item.productName}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 0.8,
                      fontFamily: "var(--font-heading-family)",
                      fontSize: "16px",
                    }}
                  >
                    {item.subCategory}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ mb: 0.6 }}
                    >
                      <Rating
                        value={4.5}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontFamily: "var(--font-heading-family)" }}
                      >
                        1088 reviews
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ fontFamily: "var(--font-heading-family)" }}
                      >
                        ₹{item.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          color: "gray",
                          fontFamily: "var(--font-heading-family)",
                        }}
                      >
                        ₹{item.scratchPrice}
                      </Typography>
                    </Stack>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#00715D",
                      fontWeight: 600,
                      fontFamily: "var(--font-heading-family)",
                    }}
                  >
                    Best Price ₹{item.price}{" "}
                    <Typography
                      component="span"
                      color="text.secondary"
                      sx={{ fontFamily: "var(--font-heading-family)" }}
                    >
                      with coupon
                    </Typography>
                  </Typography>
                </CardContent>

                {/* Actions */}
                <Stack
                  spacing={1.5}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: "100%", mb: 1 }}
                >
                  {quantity > 0 ? (
                    <Paper
                      variant="outlined"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 50,
                        overflow: "hidden",
                        // minWidth: 120,
                        px: 1,
                        borderColor: "#00715D",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromCart(item.id);
                        }}
                        sx={{ color: "#00715D" }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ px: 1, fontWeight: 600 }}>
                        {quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        sx={{ color: "#00715D" }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Paper>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCartIcon fontSize="small" />}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                      sx={{
                        px: 2,
                        py: 0.5,
                        minWidth: 120,
                        backgroundColor: "#00715D",
                        color: "#fff",
                        borderRadius: 50,
                        fontFamily: "var(--font-heading-family)",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        "&:hover": { backgroundColor: "#005f4f" },
                      }}
                    >
                      Add to cart
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    startIcon={<FlashOnIcon fontSize="small" />}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyProduct(item);
                    }}
                    sx={{
                      px: 2,
                      py: 0.5,
                      minWidth: 100,
                      borderColor: "#00715D",
                      color: "#00715D",
                      fontFamily: "var(--font-heading-family)",
                      borderRadius: 50,
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      "&:hover": {
                        borderColor: "#005f4f",
                        backgroundColor: "#f4f4f4",
                      },
                    }}
                  >
                    Buy Now
                  </Button>
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Box>
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

export default AllProductCollection;

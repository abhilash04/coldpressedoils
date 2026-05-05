import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  CardContent,
  CardMedia,
  Button,
  Rating,
  Stack,
  Chip,
  IconButton,
  Paper,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { apiList, invokeApi } from "../../services/apiServices";
import { config } from "../../config/config";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import img from "../../assets/title-icon.webp";
import CheckoutDrawer from "./CheckoutDrawer";

const ProductCard = ({ onCartUpdate }) => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [openCheckout, setOpenCheckout] = useState(false)

  const scrollRef = useRef(null);

  useEffect(() => {
    // Load cart from session storage on initial render
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, [onCartUpdate]);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          scrollRef.current.scrollTo({ left: 0, behavior: "instant" });
        } else {
          scrollRef.current.scrollBy({ left: 10, behavior: "smooth" });
        }
      }
    }, 100);

    return () => clearInterval(scrollInterval);
  }, []);

  const fetchProductData = async () => {
    const params = {};
    try {
      const response = await invokeApi(
        config.getMyCollege + apiList.getAllProducts,
        params,
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
      <Box
        sx={{
          py: 4,
          maxWidth: 1400,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
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
            Your Favorites | All in One Place
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
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() =>
              scrollRef.current?.scrollBy({ left: -260, behavior: "smooth" })
            }
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              color: "white",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "#00584b",
              boxShadow: 1,
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <IconButton
            onClick={() =>
              scrollRef.current?.scrollBy({ left: 260, behavior: "smooth" })
            }
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              zIndex: 10,
              color: "white",
              backgroundColor: "#00584b",
              boxShadow: 1,
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "nowrap",
              gap: 2,
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              scrollBehavior: "smooth",
            }}
          >
            {productsData.map((item, idx) => {
              const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
              const quantity = cartItem ? cartItem.quantity : 0;

              const getImageSource = (item) => {
                if (item.featuredImage && item.featuredImage.startsWith('/uploads')) {
                  return `${config.apiUrl}${item.featuredImage}`;
                }
                return item.featuredImage;
              };

              // Local state for variant selection per card
              // We'll use a nested component or handle it inside the map
              return <ProductCardItem 
                        key={idx} 
                        item={item} 
                        cartItems={cartItems} 
                        handleAddToCart={handleAddToCart}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleBuyProduct={handleBuyProduct}
                        getImageSource={getImageSource}
                        navigate={navigate}
                      />;
            })}
          </Box>
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

// Internal component to manage individual product state
const ProductCardItem = ({ item, cartItems, handleAddToCart, handleRemoveFromCart, handleBuyProduct, getImageSource, navigate }) => {
  const parsedVariants = typeof item.variants === 'string' ? JSON.parse(item.variants || '[]') : (item.variants || []);
  const [selectedVariant, setSelectedVariant] = useState(parsedVariants[0] || null);
  
  const currentPrice = selectedVariant ? selectedVariant.price : item.price;
  const currentStock = selectedVariant ? selectedVariant.stock : item.quantity;
  const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <Box
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
      onClick={() => navigate(`/product/${item.ogUrl}`)}
    >
      <Box sx={{ position: "absolute", top: 0, left: 16 }}>
        {currentStock == 0 ? (
          <Chip label="Out of Stock" sx={{ bgcolor: "#C62828", color: "white", fontWeight: 600, borderRadius: "0 0 10px 0", fontSize: 12 }} />
        ) : currentStock <= 10 ? (
          <Chip label={`Only ${currentStock} left`} sx={{ bgcolor: "#F57F17", color: "white", fontWeight: 600, borderRadius: "0 0 10px 0", fontSize: 12 }} />
        ) : (
          <Chip label="In Stock" sx={{ bgcolor: "#2E7D32", color: "white", fontWeight: 600, borderRadius: "0 0 10px 0", fontSize: 12 }} />
        )}
      </Box>
      <Box sx={{ position: "absolute", top: 0, right: 16 }}>
        <Chip
          label={`${Math.round(((item.scratchPrice - currentPrice) * 100) / item.scratchPrice)}% Off`}
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

      <CardMedia
        component="img"
        image={getImageSource(item)}
        alt={item.productName}
        sx={{
          objectFit: "contain",
          width: "100%",
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        }}
      />

      <CardContent sx={{ px: 2, py: 1 }}>
        <Typography color="text.secondary" sx={{ fontSize: "14px" }}>{item.category}</Typography>
        <Typography fontWeight="bold" sx={{ my: 0.4, fontSize: "18px" }}>{item.productName}</Typography>
        
        {/* Variant Selector */}
        {parsedVariants.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ my: 1, flexWrap: 'wrap', gap: 1 }}>
            {parsedVariants.map((v, i) => (
              <Chip
                key={i}
                label={v.size}
                size="small"
                onClick={(e) => { e.stopPropagation(); setSelectedVariant(v); }}
                sx={{
                  cursor: "pointer",
                  bgcolor: selectedVariant?.size === v.size ? "#00584b" : "#f0f0f0",
                  color: selectedVariant?.size === v.size ? "white" : "black",
                  borderRadius: 1,
                  fontSize: '11px'
                }}
              />
            ))}
          </Stack>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.6 }}>
            <Rating value={4.5} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">1088 reviews</Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6" fontWeight="bold">₹{currentPrice}</Typography>
            {item.scratchPrice > currentPrice && (
              <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>₹{item.scratchPrice}</Typography>
            )}
          </Stack>
        </Box>
      </CardContent>

      <Stack spacing={1.5} direction="row" alignItems="center" justifyContent="center" sx={{ width: "100%", mb: 2 }}>
        {quantity > 0 ? (
          <Paper variant="outlined" sx={{ display: "flex", alignItems: "center", borderRadius: 50, px: 1, borderColor: "#00715D" }}>
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleRemoveFromCart(item.id); }}><RemoveIcon fontSize="small" /></IconButton>
            <Typography sx={{ px: 1, fontWeight: 600 }}>{quantity}</Typography>
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}><AddIcon fontSize="small" /></IconButton>
          </Paper>
        ) : (
          <Button
            variant="contained"
            disabled={currentStock == 0}
            onClick={(e) => { e.stopPropagation(); handleAddToCart({...item, price: currentPrice, selectedSize: selectedVariant?.size}); }}
            sx={{ px: 2, bgcolor: "#00715D", borderRadius: 50, textTransform: "none", fontWeight: 600 }}
          >
            {currentStock == 0 ? "Out of Stock" : "Add to cart"}
          </Button>
        )}
        <Button
          variant="outlined"
          onClick={(e) => { e.stopPropagation(); handleBuyProduct({...item, price: currentPrice, selectedSize: selectedVariant?.size}); }}
          sx={{ px: 2, borderColor: "#00715D", color: "#00715D", borderRadius: 50, textTransform: "none", fontWeight: 600 }}
        >
          Buy Now
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductCard;
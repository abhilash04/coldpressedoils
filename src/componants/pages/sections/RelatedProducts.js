import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useParams } from 'react-router-dom';
import { apiList, invokeApi } from '../../../services/apiServices';
import { config } from '../../../config/config';
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import CheckoutDrawer from '../CheckoutDrawer';

const RelatedProducts = ({ onCartUpdate }) => {
  const { ogUrl } = useParams();
  const [productsData, setProductsData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [openCheckout, setOpenCheckout] = useState(false)

  useEffect(() => {
    // Load cart from session storage on initial render
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, [onCartUpdate]);


  const fetchProductData = async () => {
    const params = {}
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

      <Box sx={{ px: 4, maxWidth: 1200, mx: 'auto', display: 'flex', flexDirection: 'column', textAlign: 'center', }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '22px',
            fontFamily: 'var(--font-heading-family)',
            color: '#444444',
            fontStyle: 'var(--font-heading-style)',
            letterSpacing: 'calc(var(--font-heading-scale) * 0.06rem)',
            lineHeight: 'calc(1 + 0.3 / max(1, var(--font-heading-scale)))',
            wordBreak: 'break-word',
            pb: 1.5,
            textAlign: 'left',
          }}
        >
          You may also like
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            gap: 3,
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}
        >
          {productsData.filter((data) => data.ogUrl.trim() !== ogUrl.trim()).map((item, idx) => {
            const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
            const quantity = cartItem ? cartItem.quantity : 0;
            return (
              <Box
                key={idx}
                sx={{
                  borderRadius: '10px  10px 80px 10px ',
                  p: 2,
                  position: 'relative',
                  overflow: 'visible',
                  border: '1px solid #d1d1d1',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minWidth: 240,
                  backgroundColor: '#fff',
                }}
              >
                {/* Labels */}
                <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                  <Chip
                    label="New Launch"
                    sx={{
                      backgroundColor: '#1d639f',
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: '0 0 10px 0',
                      fontSize: 12,
                      fontFamily: 'var(--font-heading-family)'
                    }}
                  />
                </Box>
                <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                  <Chip
                    label={`${Math.round(((item.scratchPrice - item.price) * 100) / item.scratchPrice)}% Off`}
                    sx={{
                      backgroundColor: '#00584b',
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: '0 0 0 10px',
                      fontSize: 12,
                      fontFamily: 'var(--font-heading-family)'
                    }}
                  />
                </Box>

                {/* Image */}
                <CardMedia
                  component="img"
                  image={item.featuredImage}
                  alt={item.productName}
                  sx={{
                    objectFit: 'contain',
                    height: 290,
                  }}
                />

                {/* Content */}
                <CardContent sx={{ px: 0 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'var(--font-heading-family)' }}>
                    {item.category}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5, fontFamily: 'var(--font-heading-family)' }}>
                    {item.productName}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 1, fontFamily: 'var(--font-heading-family)' }}>
                    {item.subCategory}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Rating value={4.5} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'var(--font-heading-family)' }}>
                      1088 reviews
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'var(--font-heading-family)' }}>
                      ₹{item.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ textDecoration: 'line-through', color: 'gray', fontFamily: 'var(--font-heading-family)' }}
                    >
                      ₹{item.scratchPrice}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" sx={{ color: '#00715D', fontWeight: 600, fontFamily: 'var(--font-heading-family)' }}>
                    Best Price ₹{item.price}{' '}
                    <Typography component="span" color="text.secondary" sx={{ fontFamily: 'var(--font-heading-family)' }}>
                      with coupon
                    </Typography>
                  </Typography>
                </CardContent>

                {/* Actions */}
                <Stack
                  spacing={1}
                  mt={2}
                  direction="column"
                  alignItems="center"
                  sx={{ width: 'fit-content', mx: 'auto' }}
                >
                  {quantity > 0 ? (
                    <Paper
                      variant="outlined"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: 50,
                        overflow: "hidden",
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
                      <Typography sx={{ px: 1, fontWeight: 600 }}>{quantity}</Typography>
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
                        px: 0.5,
                        py: 0.3,
                        minWidth: "120px",
                        backgroundColor: "#00715D",
                        color: "#fff",
                        borderRadius: 50,
                        fontFamily: "var(--font-heading-family)",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "0.72rem",
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
                      px: 1.5,
                      py: 0.3,
                      minWidth: '150px',
                      borderColor: '#00715D',
                      color: '#00715D',
                      fontFamily: 'var(--font-heading-family)',
                      borderRadius: 50,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.72rem',
                      '&:hover': {
                        borderColor: '#005f4f',
                        backgroundColor: '#f4f4f4',
                      },
                    }}
                  >
                    Buy Now
                  </Button>
                </Stack>
              </Box>
            )
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

export default RelatedProducts;

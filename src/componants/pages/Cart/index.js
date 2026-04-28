import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
  Divider,
  Paper,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  DeleteOutline,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingBagOutlined
} from '@mui/icons-material';
import { useCart } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';

// Assets
import groundnutImg from '../../../assets/ArtBoard-img-3.jpg';
import gheeImg from '../../../assets/gir-cow-ghee-1L.avif';
import coconutImg from '../../../assets/Artboard_1_copy_2_522bca11-ea72-4152-8063-ddbc6d57fdc7.webp';
import sesameImg from '../../../assets/2(1).png';
import walnutImg from '../../../assets/2(2).png';
import safflowerImg from '../../../assets/2(3).png';

const assetMap = {
  'groundnut': groundnutImg,
  'ghee': gheeImg,
  'coconut': coconutImg,
  'til': sesameImg,
  'walnut': walnutImg,
  'safflower': safflowerImg
};

const CartPage = () => {
  const getMappedImage = (img) => {
    if (assetMap[img]) return assetMap[img];
    return img; // Return the image directly if it's already a solved asset
  };
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();
  const deliveryFee = subtotal > 999 ? 0 : 50;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <Container sx={{ py: 15, textAlign: 'center' }}>
        <ShoppingBagOutlined sx={{ fontSize: 100, color: '#EEE', mb: 4 }} />
        <Typography variant="h4" gutterBottom>Your kitchen is missing the good stuff!</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Your cart is currently empty. Explore our pure cold-pressed oils.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/shop')} size="large">
          START SHOPPING
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" href="/">Home</Link>
        <Typography color="text.primary">Your Cart</Typography>
      </Breadcrumbs>

      <Typography variant="h3" sx={{ mb: 6 }}>Shopping Cart</Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'none', md: 'flex', mb: 2, px: 2 }}>
            <Grid container>
              <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">PRODUCT</Typography></Grid>
              <Grid item xs={2}><Typography variant="subtitle2" color="text.secondary">PRICE</Typography></Grid>
              <Grid item xs={2}><Typography variant="subtitle2" color="text.secondary">QUANTITY</Typography></Grid>
              <Grid item xs={2}><Typography variant="subtitle2" color="text.secondary" align="right">TOTAL</Typography></Grid>
            </Grid>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {cartItems.map((item) => (
            <Box key={`${item.id}-${item.size}`} sx={{ mb: 4 }}>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={getMappedImage(item.image)}
                      sx={{ width: 80, height: 80, backgroundColor: '#F5F5F5', objectFit: 'contain', mixBlendMode: 'multiply' }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">Size: {item.size}</Typography>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteOutline />}
                        onClick={() => removeFromCart(item.id, item.size)}
                        sx={{ mt: 1 }}
                      >
                        REMOVE
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={2}>
                  <Typography variant="body1">₹{item.price}</Typography>
                </Grid>
                <Grid item xs={4} sm={2}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #DDD' }}>
                    <IconButton size="small" onClick={() => updateQuantity(item.id, item.size, -1)}><RemoveIcon fontSize="small" /></IconButton>
                    <Typography sx={{ px: 1.5 }}>{item.quantity}</Typography>
                    <IconButton size="small" onClick={() => updateQuantity(item.id, item.size, 1)}><AddIcon fontSize="small" /></IconButton>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={2}>
                  <Typography variant="body1" align="right" sx={{ fontWeight: 700 }}>₹{item.price * item.quantity}</Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, borderRadius: 0, backgroundColor: '#F9FAF4' }}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>Order Summary</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography sx={{ fontWeight: 700 }}>₹{subtotal}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary">Delivery Fee</Typography>
              <Typography color={deliveryFee === 0 ? 'success.main' : 'text.primary'}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </Typography>
            </Box>
            {deliveryFee > 0 && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                Add ₹{999 - subtotal} more for FREE delivery
              </Typography>
            )}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>₹{total}</Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/checkout')}
            >
              PROCEED TO CHECKOUT
            </Button>
            <Button
              fullWidth
              variant="text"
              color="inherit"
              onClick={() => navigate('/shop')}
              sx={{ mt: 2 }}
            >
              CONTINUE SHOPPING
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;

import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Button,
  IconButton
} from '@mui/material';
import { Favorite, DeleteOutline, ShoppingCart } from '@mui/icons-material';

const Wishlist = () => {
  // Mock data for wishlist
  const wishlistItems = [
    { id: 1, name: 'Wood Pressed Groundnut Oil', price: '₹450.00', image: 'groundnut' },
    { id: 2, name: 'Pure Gir Cow Ghee', price: '₹1,250.00', image: 'ghee' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Favorite sx={{ color: '#2D6A4F' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
          My Wishlist
        </Typography>
      </Box>

      {wishlistItems.length > 0 ? (
        <Grid container spacing={3}>
          {wishlistItems.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <Card sx={{ display: 'flex', borderRadius: 0, border: '1px solid #eee', boxShadow: 'none' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 120 }}
                  image={`/assets/products/${item.image}.jpg`} // Placeholder path
                  alt={item.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent sx={{ flex: '1 0 auto', p: 2 }}>
                    <Typography component="div" variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ color: '#2D6A4F', fontWeight: 700 }}>
                      {item.price}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 1, gap: 1 }}>
                    <Button 
                      variant="contained" 
                      size="small" 
                      startIcon={<ShoppingCart />}
                      sx={{ bgcolor: '#2D6A4F', borderRadius: 0, fontSize: '0.75rem', '&:hover': { bgcolor: '#1B4332' } }}
                    >
                      Add to Cart
                    </Button>
                    <IconButton size="small" color="error">
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography color="text.secondary">Your wishlist is empty.</Typography>
          <Button variant="outlined" sx={{ mt: 2, color: '#2D6A4F', borderColor: '#2D6A4F', borderRadius: 0 }}>
            Start Shopping
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Wishlist;

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Button, Skeleton } from '@mui/material';
import ProductCard from '../../../common/ProductCard';
import { apiList, invokeGetApi } from '../../../../services/apiServices';

const dummyProducts = [
  { id: 11, name: 'Wood Pressed Groundnut Oil', price: 360, oldPrice: 480, image: 'groundnut', slug: 'groundnut-oil', rating: 4.8, badge: '25% OFF', weight: '1 Liter' },
  { id: 12, name: 'Pure Sesame Oil (Gingelly)', price: 440, oldPrice: 650, image: 'til', slug: 'sesame-oil', rating: 4.9, badge: '32% OFF', weight: '1 Liter' },
  { id: 13, name: 'Pure Coconut Oil', price: 540, oldPrice: 800, image: 'coconut', slug: 'coconut-oil', rating: 5.0, badge: '32% OFF', weight: '1 Liter' },
  { id: 14, name: 'Mustard Oil', price: 500, oldPrice: 880, image: 'mustard', slug: 'mustard-oil', rating: 4.7, badge: '43% OFF', weight: '1 Liter' },
  { id: 15, name: 'Wood Pressed Sunflower Oil', price: 360, oldPrice: 470, image: 'walnut', slug: 'sunflower-oil', rating: 4.6, badge: '23% OFF', weight: '1 Liter' },
  { id: 16, name: 'Traditional Safflower Oil', price: 510, oldPrice: 590, image: 'safflower', slug: 'safflower-oil', rating: 4.8, badge: '13% OFF', weight: '1 Liter' },
];

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await invokeGetApi(apiList.featured);
        setProducts(response.data.length > 0 ? response.data : dummyProducts);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={{ py: 10, backgroundColor: '#FFF' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" gutterBottom>
            Our Best Sellers
          </Typography>
          <Box
            sx={{
              width: 80,
              height: 2,
              backgroundColor: 'primary.main',
              margin: '0 auto',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: -4,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 10,
                height: 10,
                backgroundColor: 'primary.main',
                borderRadius: '50%',
              },
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((n) => (
              <Grid item xs={6} sm={4} md={4} key={n}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton variant="text" sx={{ mt: 1 }} />
                <Skeleton variant="text" width="60%" />
              </Grid>
            ))
          ) : (
            products.map((product) => (
              <Grid item xs={6} sm={4} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))
          )}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            href="/shop"
            sx={{ px: 6 }}
          >
            View All Products
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProducts;

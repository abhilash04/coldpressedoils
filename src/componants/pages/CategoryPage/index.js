import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Grid, Skeleton, Breadcrumbs, Link } from '@mui/material';
import ProductCard from '../../common/ProductCard';
import { config } from '../../../config/config';
import axios from 'axios';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryDetails = {
    'cold-pressed-oils': {
      title: 'Cold Pressed Oils',
      description: 'Experience the pure essence of nature with our tradition-pressed oils. Extracted slowly in wooden Ghanis to preserve nutrients, antioxidants, and original flavor.',
      image: '/assets/images/hero_banner.png'
    },
    'flours': {
      title: 'Healthy Flours & Grains',
      description: 'Nutrient-rich, gluten-free flours milled with care to retain fiber and vitamins. Perfect for health-conscious baking and cooking.',
      image: '/assets/images/groundnut_oil.png'
    }
    // Add others as needed
  };

  const details = categoryDetails[category] || { 
    title: category ? category.replace('-', ' ').toUpperCase() : 'Products', 
    description: 'Explore our range of natural and pure health products.',
    image: '/assets/images/hero_banner.png'
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${config.apiUrl}/products`, {
          params: { category }
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [category]);

  return (
    <Box>
      {/* Category Hero */}
      <Box 
        sx={{ 
          height: '300px', 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: '#000',
          mb: 6
        }}
      >
        <Box 
          component="img" 
          src={details.image} 
          sx={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} 
        />
        <Container sx={{ position: 'relative', zIndex: 1, color: '#FFF' }}>
          <Typography variant="h2">{details.title}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, maxWidth: '600px', mt: 1 }}>
            {details.description}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="/">Home</Link>
          <Link underline="hover" color="inherit" href="/shop">Shop</Link>
          <Typography color="text.primary">{details.title}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {loading ? (
            [1, 2, 3, 4].map((n) => (
              <Grid item xs={12} sm={6} md={3} key={n}>
                <Skeleton variant="rectangular" height={250} />
                <Skeleton variant="text" sx={{ mt: 1 }} />
              </Grid>
            ))
          ) : (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default CategoryPage;

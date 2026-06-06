import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Grid, Skeleton, Breadcrumbs, Link } from '@mui/material';
import ProductCard from '../../common/ProductCard';
import { invokeGetApi, apiList } from '../../../services/apiServices';
import coldPressedOilsImg from '../../../assets/images/cold_pressed_oils.png';
import floursImg from '../../../assets/images/gluten_free_flours.png';

// Map URL category slug → database category_id
const CATEGORY_ID_MAP = {
  'cold-pressed-oils': 1,
  'spices-powders': 2,
  'jaggery-sweeteners': 3,
  'gluten-free-flours': 4,
  'rock-salt': 5,
};

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryDetails = {
    'cold-pressed-oils': {
      title: 'Cold Pressed Oils',
      description: 'Experience the pure essence of nature with our tradition-pressed oils. Extracted slowly in wooden Ghanis to preserve nutrients, antioxidants, and original flavor.',
      image: coldPressedOilsImg
    },
    'flours': {
      title: 'Healthy Flours & Grains',
      description: 'Nutrient-rich, gluten-free flours milled with care to retain fiber and vitamins. Perfect for health-conscious baking and cooking.',
      image: floursImg
    },
    'spices-powders': {
      title: 'Spices & Powders',
      description: 'Premium quality authentic spices and powders sourced directly from nature.',
      image: coldPressedOilsImg
    }
  };

  const details = categoryDetails[category] || {
    title: category ? category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Products',
    description: 'Explore our range of natural and pure health products.',
    image: coldPressedOilsImg
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const response = await invokeGetApi(apiList.getAllProducts);
        const allProducts = response?.data?.products || response?.data || [];
        const categoryId = CATEGORY_ID_MAP[category];

        const filtered = categoryId
          ? allProducts.filter(p => Number(p.category_id) === categoryId)
          : allProducts;

        setProducts(filtered);
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
          height: '400px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          mb: 6
        }}
      >
        <Box
          component="img"
          src={details.image}
          sx={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
        />
        <Container sx={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h2" sx={{ color: '#FFF', fontWeight: 700 }}>{details.title}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, maxWidth: '600px', mt: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
            {details.description}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mb: 10 }}>
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

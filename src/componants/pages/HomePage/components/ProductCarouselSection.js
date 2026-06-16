import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Button, Skeleton, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from '../../../common/ProductCard';
import { apiList, invokeGetApi } from '../../../../services/apiServices';

// Category ID mapping based on the database
const CATEGORY_ID_MAP = {
  'oil-products': 1,
  'spices-powders': 2,
  'jaggery-sweeteners': 3,
  'gluten-free-flours': 4,
  'rock-salt': 5,
};

const dummyProducts = [
  { id: 11, name: 'Wood Pressed Groundnut Oil', price: 360, oldPrice: 480, image: 'groundnut', slug: 'groundnut-oil', rating: 4.8, badge: '25% OFF', weight: '1 Liter' },
  { id: 12, name: 'Pure Sesame Oil (Gingelly)', price: 440, oldPrice: 650, image: 'til', slug: 'sesame-oil', rating: 4.9, badge: '32% OFF', weight: '1 Liter' },
  { id: 13, name: 'Pure Coconut Oil', price: 540, oldPrice: 800, image: 'coconut', slug: 'coconut-oil', rating: 5.0, badge: '32% OFF', weight: '1 Liter' },
  { id: 14, name: 'Mustard Oil', price: 500, oldPrice: 880, image: 'mustard', slug: 'mustard-oil', rating: 4.7, badge: '43% OFF', weight: '1 Liter' },
  { id: 15, name: 'Wood Pressed Sunflower Oil', price: 360, oldPrice: 470, image: 'walnut', slug: 'sunflower-oil', rating: 4.6, badge: '23% OFF', weight: '1 Liter' },
];

const ProductCarouselSection = ({ title, categoryId, bgColor = '#FFF', viewAllLink = '/shop' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let response;
        if (categoryId) {
          // Fetch ALL products then filter by category_id on the client side
          response = await invokeGetApi(apiList.getAllProducts);
          if (response?.status === 200 || response?.data?.responseCode === '200') {
            const allProducts = response.data?.products || response.data || [];
            const filtered = allProducts.filter(p => Number(p.category_id) === Number(categoryId));
            setProducts(filtered.length > 0 ? filtered : dummyProducts);
          } else {
            setProducts(dummyProducts);
          }
        } else {
          // No category = "Our Best Sellers": use /featured endpoint
          response = await invokeGetApi(apiList.featured);
          if (Array.isArray(response?.data) && response.data.length > 0) {
            setProducts(response.data);
          } else {
            setProducts(dummyProducts);
          }
        }
      } catch (error) {
        console.error(`Error fetching products for "${title}":`, error);
        setProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, title]);

  const sliderSettings = {
    dots: true,
    infinite: products.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3, slidesToScroll: 1, infinite: products.length > 3 }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: products.length > 1,
          centerMode: true,
          centerPadding: '1px'
        }
      }
    ],
    appendDots: dots => (
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 0.5, mt: isMobile ? 2 : 4, position: 'relative', bottom: -2,
        "& ul": {
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '2px', margin: 0, padding: 0, listStyle: 'none',
          "& li": { margin: '0 !important', padding: '0 !important', width: 'auto !important', height: 'auto !important', display: 'flex', alignItems: 'center' }
        }
      }}>
        {dots}
      </Box>
    ),
    customPaging: i => (
      <Box sx={{
        width: 8, height: 8, borderRadius: "50%",
        backgroundColor: "rgba(0,0,0,0.2)", display: 'flex', alignItems: 'center', justifyContent: 'center',
        ".slick-active &": { backgroundColor: "primary.main", width: 20, borderRadius: 4 },
        transition: "all 0.3s ease"
      }} />
    )
  };

  return (
    <Box sx={{ pt: isMobile ? 6 : 10, pb: isMobile ? 6 : 10, backgroundColor: bgColor, overflow: 'hidden' }}>
      <Container maxWidth="xl">
        <Box sx={{
          position: 'relative', display: 'flex', justifyContent: 'center',
          alignItems: 'center', mb: isMobile ? 4 : 6, minHeight: 60
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant={isMobile ? "h3" : "h3"} gutterBottom sx={{ fontWeight: 800, color: 'primary.dark' }}>
              {title}
            </Typography>
            <Box sx={{ width: 80, height: 3, backgroundColor: 'primary.main', margin: '0 auto' }} />
          </Box>
          <Button
            variant="text" color="primary" size="small" href={viewAllLink}
            sx={{
              position: 'absolute', right: 0, bottom: { xs: -20, md: 0 }, fontWeight: 600,
              textTransform: 'none', fontSize: { xs: '0.85rem', md: '1rem' },
              display: 'flex', alignItems: 'center',
              '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
            }}
          >
            View All &rarr;
          </Button>
        </Box>

        {loading ? (
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((n) => (
              <Grid item xs={isMobile ? 12 : 3} key={n}>
                <Skeleton variant="rectangular" height={300} />
                <Skeleton variant="text" sx={{ mt: 1 }} />
                <Skeleton variant="text" width="60%" />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ position: 'relative', px: { xs: 0, md: 2 } }}>
            {products.length > (isMobile ? 2 : 4) && (
              <>
                <IconButton
                  onClick={() => sliderRef.current?.slickPrev()}
                  sx={{
                    position: 'absolute', left: -20, top: '45%', transform: 'translateY(-50%)',
                    zIndex: 10, backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    color: 'primary.main', '&:hover': { backgroundColor: 'primary.main', color: 'white' },
                    width: 44, height: 44, display: { xs: 'none', md: 'flex' }
                  }}
                >
                  <ArrowBackIosNew sx={{ fontSize: '1.2rem' }} />
                </IconButton>
                <IconButton
                  onClick={() => sliderRef.current?.slickNext()}
                  sx={{
                    position: 'absolute', right: -20, top: '45%', transform: 'translateY(-50%)',
                    zIndex: 10, backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    color: 'primary.main', '&:hover': { backgroundColor: 'primary.main', color: 'white' },
                    width: 44, height: 44, display: { xs: 'none', md: 'flex' }
                  }}
                >
                  <ArrowForwardIos sx={{ fontSize: '1.2rem' }} />
                </IconButton>
              </>
            )}
            <Slider ref={sliderRef} {...sliderSettings}>
              {products.map((product) => (
                <Box key={product.id} sx={{ px: isMobile ? 0.5 : 1.5, pb: 2 }}>
                  <ProductCard product={product} />
                </Box>
              ))}
            </Slider>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductCarouselSection;

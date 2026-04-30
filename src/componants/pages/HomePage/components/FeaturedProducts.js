import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Button, Skeleton, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const sliderRef = useRef(null);

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

  const sliderSettings = {
    dots: true,
    infinite: products.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: products.length > 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: products.length > 1,
        }
      }
    ],
    appendDots: dots => (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        mt: isMobile ? 2 : 4,
        position: 'relative',
        bottom: -2,
        // Override Slick's default li styling
        "& ul": {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px', // Very tight gap
          margin: 0,
          padding: 0,
          listStyle: 'none',
          "& li": {
            margin: '0 !important',
            padding: '0 !important',
            width: 'auto !important',
            height: 'auto !important',
            display: 'flex',
            alignItems: 'center'
          }
        }
      }}>
        {dots}
      </Box>
    ),
    customPaging: i => (
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.2)",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ".slick-active &": {
            backgroundColor: "primary.main",
            width: 20,
            borderRadius: 4
          },
          transition: "all 0.3s ease"
        }}
      />
    )
  };

  return (
    <Box sx={{ pt: isMobile ? 4 : 6, pb: isMobile ? 1 : 2, backgroundColor: '#FFF', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Box sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: isMobile ? 4 : 6,
          minHeight: 60
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant={isMobile ? "h4" : "h3"} gutterBottom sx={{ fontWeight: 700 }}>
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
          <Button
            variant="text"
            color="primary"
            size="small"
            href="/shop"
            sx={{
              position: 'absolute',
              right: 0,
              bottom: isMobile ? -20 : 0, // Adjust for mobile if needed
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
              display: 'flex',
              alignItems: 'center'
            }}
          >
            View All &rarr;
          </Button>
        </Box>

        {loading ? (
          <Grid container spacing={isMobile ? 2 : 4}>
            {[1, 2, 3].map((n) => (
              <Grid item xs={isMobile ? 12 : 4} key={n}>
                <Skeleton variant="rectangular" height={isMobile ? 150 : 200} />
                <Skeleton variant="text" sx={{ mt: 1 }} />
                <Skeleton variant="text" width="60%" />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ position: 'relative', px: isMobile ? 1 : 4, pb: 1 }}>
            <IconButton
              onClick={() => sliderRef.current?.slickPrev()}
              sx={{
                position: 'absolute',
                left: isMobile ? -10 : -20,
                top: '40%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
                width: 40,
                height: 40,
                display: products.length > (isMobile ? 1 : 3) ? 'flex' : 'none'
              }}
            >
              <ArrowBackIosNew sx={{ fontSize: '1.2rem' }} />
            </IconButton>

            <Slider ref={sliderRef} {...sliderSettings}>
              {products.map((product) => (
                <Box key={product.id} sx={{ px: isMobile ? 1 : 2, pb: 1 }}>
                  <ProductCard product={product} />
                </Box>
              ))}
            </Slider>

            <IconButton
              onClick={() => sliderRef.current?.slickNext()}
              sx={{
                position: 'absolute',
                right: isMobile ? -10 : -20,
                top: '40%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
                width: 40,
                height: 40,
                display: products.length > (isMobile ? 1 : 3) ? 'flex' : 'none'
              }}
            >
              <ArrowForwardIos sx={{ fontSize: '1.2rem' }} />
            </IconButton>
          </Box>
        )}


      </Container>
    </Box>
  );
};

export default FeaturedProducts;

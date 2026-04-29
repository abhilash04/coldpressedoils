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
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: dots => (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        mt: 4,
        position: 'relative',
        bottom: -10,
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
        <IconButton
          size="small"
          onClick={() => sliderRef.current?.slickPrev()}
          sx={{
            color: 'primary.main',
            p: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateY(-6px)',
            mr: 2 // Space after left arrow
          }}
        >
          <ArrowBackIosNew sx={{ fontSize: '1.2rem' }} />
        </IconButton>

        {dots}

        <IconButton
          size="small"
          onClick={() => sliderRef.current?.slickNext()}
          sx={{
            color: 'primary.main',
            p: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateY(-6px)'
          }}
        >
          <ArrowForwardIos sx={{ fontSize: '1.2rem', ml: 0.5 }} />
        </IconButton>
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
    <Box sx={{ py: isMobile ? 4 : 6, backgroundColor: '#FFF', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: isMobile ? 4 : 6 }}>
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
          isMobile ? (
            <Box sx={{ px: 1, pb: 6 }}>
              <Slider ref={sliderRef} {...sliderSettings}>
                {products.map((product) => (
                  <Box key={product.id} sx={{ px: 1, pb: 1 }}>
                    <ProductCard product={product} />
                  </Box>
                ))}
              </Slider>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item sm={4} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )
        )}

        <Box sx={{ textAlign: 'center', mt: isMobile ? 2 : 8 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            href="/shop"
            sx={{ px: isMobile ? 4 : 6 }}
          >
            View All Products
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProducts;

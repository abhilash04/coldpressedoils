import React from 'react';
import { Box, Container, Grid, Typography, Button, Card, CardMedia, CardActionArea, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const categories = [
  {
    title: 'Cold Pressed Oils',
    image: '/assets/images/hero_banner.png',
    grid: 6,
    path: '/shop/cold-pressed-oils',
  },
  {
    title: 'Gluten Free Flours',
    image: '/assets/images/groundnut_oil.png',
    grid: 6,
    path: '/shop/flours',
  },
  {
    title: 'Jaggery & Sweeteners',
    image: '/assets/images/hero_banner.png',
    grid: 4,
    path: '/shop/jaggery-sweeteners',
  },
  {
    title: 'Masalas & Spices',
    image: '/assets/images/groundnut_oil.png',
    grid: 4,
    path: '/shop/masalas-spices',
  },
  {
    title: 'Rock Salt',
    image: '/assets/images/hero_banner.png',
    grid: 4,
    path: '/shop/rock-salt-condiments',
  },
];

const CategoryShowcase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ py: isMobile ? 4 : 10, backgroundColor: '#F9FAF4' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            mb: isMobile ? 4 : 6,
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: 800
          }}
        >
          Explore Our Categories
        </Typography>

        <Grid container spacing={isMobile ? 3 : 3}>
          {categories.map((cat, index) => (
            <Grid item xs={12} sm={cat.grid === 4 ? 6 : 12} md={cat.grid} key={index}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card sx={{ borderRadius: 2, position: 'relative', height: isMobile ? 350 : 400, overflow: 'hidden' }}>
                  <CardActionArea href={cat.path} sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      image={cat.image}
                      alt={cat.title}
                      sx={{ height: '100%', objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#FFF',
                        p: 2,
                        transition: 'background-color 0.3s',
                        '&:hover': {
                          backgroundColor: 'rgba(45, 106, 79, 0.6)',
                        },
                      }}
                    >
                      <Typography
                        variant={isMobile ? "h5" : "h3"}
                        sx={{
                          fontWeight: 700,
                          textAlign: 'center',
                          lineHeight: 1.2,
                          mb: isMobile ? 1 : 2
                        }}
                      >
                        {cat.title}
                      </Typography>
                      <Button
                        variant="outlined"
                        size={isMobile ? "medium" : "large"}
                        sx={{
                          mt: 2,
                          color: '#FFF',
                          borderColor: '#FFF',
                          fontSize: isMobile ? '0.9rem' : '1.1rem',
                          px: isMobile ? 3 : 5,
                          py: isMobile ? 1 : 1.5,
                          fontWeight: 600,
                          '&:hover': { backgroundColor: '#FFF', color: 'primary.main' },
                        }}
                      >
                        Explore Now
                      </Button>
                    </Box>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CategoryShowcase;

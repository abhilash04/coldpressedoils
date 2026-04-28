import React from 'react';
import { Box, Container, Grid, Typography, Button, Card, CardMedia, CardActionArea } from '@mui/material';
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
  return (
    <Box sx={{ py: 10, backgroundColor: '#F9FAF4' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
          Explore Our Categories
        </Typography>
        
        <Grid container spacing={3}>
          {categories.map((cat, index) => (
            <Grid item xs={12} sm={cat.grid === 4 ? 6 : 12} md={cat.grid} key={index}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card sx={{ borderRadius: 0, position: 'relative', height: 400, overflow: 'hidden' }}>
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
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#FFF',
                        transition: 'background-color 0.3s',
                        '&:hover': {
                          backgroundColor: 'rgba(45, 106, 79, 0.6)',
                        },
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center' }}>
                        {cat.title}
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{
                          mt: 2,
                          color: '#FFF',
                          borderColor: '#FFF',
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

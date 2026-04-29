import React from 'react';
import { Box, Typography, Button, Container, Grid, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '40vh', md: '80vh' },
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
    >
      {/* Background Image with Overlay */}
      <Box
        component="img"
        src="/assets/images/hero_banner.png"
        alt="Cold Pressed Oil"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.7,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: '#FFF',
                  fontSize: isMobile ? '2.5rem' : '4.5rem',
                  lineHeight: 1.1,
                  mb: 2,
                  fontWeight: 800
                }}
              >
                A Legacy of 75 Years <br />
                <Box component="span" sx={{ color: '#a6cebcff' }}>
                  in Every Drop
                </Box>
              </Typography>

              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 400,
                  fontSize: isMobile ? '1.2rem' : '1.2rem',
                  mb: 4,
                  maxWidth: '500px',
                  fontFamily: '"Inter", sans-serif',
                  lineHeight: 1.6
                }}
              >
                Cold pressed. Chemical free. Pure from nature.
                Experience the authentic taste of tradition.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    px: isMobile ? 3 : 4,
                    py: 1.5,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                  }}
                  href="/shop"
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#FFF',
                    borderColor: '#FFF',
                    px: isMobile ? 3 : 4,
                    py: 1.5,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    '&:hover': {
                      borderColor: 'primary.main',
                      color: 'primary.main',
                    },
                  }}
                  href="/about"
                >
                  Our Story
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;

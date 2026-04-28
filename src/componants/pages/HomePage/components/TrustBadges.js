import React from 'react';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { Verified, Spa, Science, LocalShipping } from '@mui/icons-material';

const TrustBadges = () => {
  const theme = useTheme();

  const badges = [
    { icon: <Verified />, text: '75 Years Legacy' },
    { icon: <Science />, text: 'No Chemicals' },
    { icon: <Spa />, text: 'Wood Pressed' },
    { icon: <LocalShipping />, text: 'Free Delivery over ₹999' },
  ];

  return (
    <Box sx={{ backgroundColor: 'primary.main', pt: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
          {badges.map((badge, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: 'primary.contrastText',
                  textAlign: 'center',
                }}
              >
                <Box sx={{ mb: { md: 1 }, '& svg': { fontSize: { xs: '2rem', md: '2.5rem' }, opacity: 0.9 } }}>
                  {badge.icon}
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, letterSpacing: 1, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                  {badge.text.toUpperCase()}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TrustBadges;

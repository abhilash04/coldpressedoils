import React from 'react';
import { Box, Container, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Verified, Spa, Science, LocalShipping } from '@mui/icons-material';

const TrustBadges = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const badges = [
    { icon: <Verified />, text: '75 Years Legacy' },
    { icon: <Science />, text: 'No Chemicals' },
    { icon: <Spa />, text: 'Wood Pressed' },
    { icon: <LocalShipping />, text: 'Free Delivery over ₹999' },
  ];

  return (
    <Box sx={{ backgroundColor: 'primary.main', pt: isMobile ? 3 : 4, pb: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={isMobile ? 2 : 3} justifyContent="center">
          {badges.map((badge, index) => (
            <Grid item xs={6} md={3} key={index} sx={{ position: 'relative' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <Box sx={{ mb: isMobile ? 0 : 1, '& svg': { fontSize: isMobile ? '1.8rem' : '2.5rem', opacity: 1 } }}>
                  {badge.icon}
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: 1, fontSize: isMobile ? '0.75rem' : '0.875rem', color: 'white' }}>
                  {badge.text.toUpperCase()}
                </Typography>
              </Box>

              {/* Vertical Separator Line */}
              {((!isMobile && index !== 3) || (isMobile && index % 2 === 0)) && (
                <Box
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: '20%',
                    height: '70%',
                    width: '1px',
                    bgcolor: 'rgba(255, 255, 255, 2)',
                  }}
                />
              )}

              {/* Horizontal Separator Line (Mobile only, between rows) */}
              {isMobile && (index === 0 || index === 1) && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -10,
                    left: '15%',
                    width: '75%',
                    height: '1px',
                    bgcolor: 'rgba(255, 255, 255, 2)',
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TrustBadges;

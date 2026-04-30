import React from 'react';
import { Box, Container, Grid, Typography, Button, List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

const HealthEducation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#FFF' }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/assets/images/hero_banner.png"
              alt="Health Benefits"
              sx={{
                width: '100%',
                borderRadius: 0,
                boxShadow: { xs: '10px 10px 0px #2D6A4F', md: '20px 20px 0px #2D6A4F' }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom sx={{ fontSize: { xs: '1.8rem', md: '3rem' } }}>
              Why Cold Pressed Oils are Better for You
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.8, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
              Refined oils are processed at high temperatures and treated with chemicals,
              stripping them of their natural flavor and nutrients. Our wood-pressed oils
              retain the original molecular structure.
            </Typography>

            <List sx={{ mb: 4 }}>
              {[
                'Rich in Omega-3 & Omega-6 Fatty Acids',
                'Packed with Natural Antioxidants & Vitamin E',
                'Zero Trans Fats or Harmful Hexane',
                'Low processing heat preserves aroma and flavor'
              ].map((item, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemIcon sx={{ minWidth: { xs: 30, md: 40 }, color: 'primary.main' }}>
                    <CheckCircleOutline fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{ sx: { fontSize: { xs: '0.875rem', md: '1rem' } } }}
                  />
                </ListItem>
              ))}
            </List>

            <Button variant="contained" color="primary" size="large" href="/blog" fullWidth={isMobile}>
              Read Our Health Blog
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HealthEducation;

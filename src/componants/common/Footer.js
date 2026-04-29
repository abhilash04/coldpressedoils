import React from 'react';
import { Box, Container, Grid, Typography, Link, TextField, Button, Divider, IconButton } from '@mui/material';
import { Instagram, Facebook, YouTube, Phone, Email, LocationOn } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../assets/amruthadharee_logo.png';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1B1F23', color: '#FFFFFF', pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Info */}
          <Grid item xs={12} md={3}>
            <Box
              component="img"
              src={logo}
              alt="Amrutha Dharee"
              sx={{
                height: 100,
                width: 'auto',
                mb: 2,
                // filter: 'brightness(0) invert(1) opacity(0.9)' // Making it white for the dark footer
              }}
            />
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 2, lineHeight: 1.8 }}>
              Pure from Nature. Pressed with Tradition. Bringing you the finest cold-pressed oils
              extracted using the ancient wooden Ghani technique.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: '#FFF' }}><Instagram /></IconButton>
              <IconButton sx={{ color: '#FFF' }}><Facebook /></IconButton>
              <IconButton sx={{ color: '#FFF' }}><YouTube /></IconButton>
            </Box>
          </Grid>

          {/* Shop Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Shop</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/shop/cold-pressed-oils" sx={{ color: '#FFF', opacity: 0.7, '&:hover': { opacity: 1 } }}>Oils</Link>
              <Link component={RouterLink} to="/shop/flours" sx={{ color: '#FFF', opacity: 0.7, '&:hover': { opacity: 1 } }}>Flours</Link>
              <Link component={RouterLink} to="/shop/jaggery-sweeteners" sx={{ color: '#FFF', opacity: 0.7, '&:hover': { opacity: 1 } }}>Sweeteners</Link>
              <Link component={RouterLink} to="/shop/masalas-spices" sx={{ color: '#FFF', opacity: 0.7, '&:hover': { opacity: 1 } }}>Spices</Link>
            </Box>
          </Grid>

          {/* Company Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Company</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/about" sx={{ color: '#FFF', opacity: 0.7, '&:hover': { opacity: 1 } }}>About Us</Link>
              <Link component={RouterLink} to="/our-oils" sx={{ color: '#FFF', opacity: 0.7, '&:hover': { opacity: 1 } }}>Our Oils</Link>
              <Link component={RouterLink} to="/our-process" sx={{ color: '#FFF', opacity: 0.7, '&:hover': { opacity: 1 } }}>Our Process</Link>
              <Link component={RouterLink} to="/blog" sx={{ color: '#FFF', opacity: 0.7, '&:hover': { opacity: 1 } }}>Health Blog</Link>
              <Link component={RouterLink} to="/contact" sx={{ color: '#FFF', opacity: 0.7, '&:hover': { opacity: 1 } }}>Contact Us</Link>
            </Box>
          </Grid>

          {/* Contact & Newsletter */}
          <Grid item xs={12} md={5}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Join our Health Community</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
              Get 10% off your first order and stay updated with health tips.
            </Typography>
            <Box component="form" sx={{ display: 'flex', gap: 1, mb: 4 }}>
              <TextField
                size="small"
                placeholder="Email Address"
                variant="outlined"
                sx={{
                  backgroundColor: '#FFF',
                  borderRadius: 0,
                  flexGrow: 1
                }}
              />
              <Button variant="contained" color="primary">Subscribe</Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Phone fontSize="small" sx={{ color: 'primary.main' }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>+91 9XXXX XXXXX</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Email fontSize="small" sx={{ color: 'primary.main' }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>info@coldpressedoils.in</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            © 2026 Amrutha Dharee (Shree Ram Krishna Oil Mills). All rights reserved. FSSAI: [License Number]
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link component={RouterLink} to="/privacy-policy" sx={{ color: '#FFF', opacity: 0.6, fontSize: '0.75rem' }}>Privacy</Link>
            <Link component={RouterLink} to="/terms-and-conditions" sx={{ color: '#FFF', opacity: 0.6, fontSize: '0.75rem' }}>Terms</Link>
            <Link component={RouterLink} to="/shipping-policy" sx={{ color: '#FFF', opacity: 0.6, fontSize: '0.75rem' }}>Shipping</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

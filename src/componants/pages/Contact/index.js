import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  IconButton,
  Divider,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  WhatsApp,
  Instagram,
  Facebook,
  YouTube
} from '@mui/icons-material';

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Box sx={{ py: isMobile ? 6 : 10, bgcolor: 'primary.main', color: '#FFF', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant={isMobile ? "h3" : "h2"} gutterBottom sx={{ fontWeight: 800 }}>Contact Us</Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.8 }}>
            Have a question about our oils? We're here to help you on your health journey.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: isMobile ? 4 : 6 }}>
        <Grid container spacing={isMobile ? 4 : 8}>
          {/* Left: Contact Form */}
          <Grid item xs={12} md={7}>
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ mb: 4, fontWeight: 700 }}>Send us a Message</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Your Name" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email Address" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone Number" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth select label="Subject" variant="outlined" defaultValue="order">
                  <MenuItem value="order">Order Query</MenuItem>
                  <MenuItem value="product">Product Information</MenuItem>
                  <MenuItem value="wholesale">Wholesale inquiry</MenuItem>
                  <MenuItem value="feedback">Feedback</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={4} label="Your Message" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" size="large" sx={{ px: 6 }}>
                  SEND MESSAGE
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Right: Contact Info Cards */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Paper sx={{ p: 4, borderRadius: 0, bgcolor: '#F9FAF4' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Our Information</Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <IconButton sx={{ bgcolor: 'primary.main', color: '#FFF', width: 48, height: 48, '&:hover': { bgcolor: 'primary.dark' } }}>
                    <Phone />
                  </IconButton>
                  <Box>
                    <Typography variant="caption" color="text.secondary">CALL US</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>+91 9XXXXXXXXX</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <IconButton sx={{ bgcolor: 'secondary.main', color: '#FFF', width: 48, height: 48, '&:hover': { bgcolor: 'secondary.dark' } }}>
                    <WhatsApp />
                  </IconButton>
                  <Box>
                    <Typography variant="caption" color="text.secondary">WHATSAPP CHAT</Typography>
                    <Link href="https://wa.me/919XXXXXXXXX" sx={{ display: 'block', fontWeight: 600, color: 'inherit', textDecoration: 'none' }}>
                      Click to chat with us
                    </Link>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <IconButton sx={{ bgcolor: 'primary.main', color: '#FFF', width: 48, height: 48, '&:hover': { bgcolor: 'primary.dark' } }}>
                    <Email />
                  </IconButton>
                  <Box>
                    <Typography variant="caption" color="text.secondary">EMAIL US</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>info@coldpressedoils.in</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton sx={{ bgcolor: 'primary.main', color: '#FFF', width: 48, height: 48, '&:hover': { bgcolor: 'primary.dark' } }}>
                    <LocationOn />
                  </IconButton>
                  <Box>
                    <Typography variant="caption" color="text.secondary">VISIT US</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>Shree Ram Krishna Oil Mills, Pune, Maharashtra</Typography>
                  </Box>
                </Box>
              </Paper>

              <Box>
                <Typography variant="h6" sx={{ mb: isMobile ? 2 : 2, fontWeight: 700 }}>Follow Us</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton sx={{ color: 'primary.main', width: 48, height: 48, border: '1px solid', borderColor: 'divider' }}><Instagram /></IconButton>
                  <IconButton sx={{ color: 'primary.main', width: 48, height: 48, border: '1px solid', borderColor: 'divider' }}><Facebook /></IconButton>
                  <IconButton sx={{ color: 'primary.main', width: 48, height: 48, border: '1px solid', borderColor: 'divider' }}><YouTube /></IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Map Placeholder */}
      <Box sx={{ height: isMobile ? '300px' : '450px', width: '100%', bgcolor: '#EEE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
          Google Maps Integration Placeholder
        </Typography>
      </Box>
    </Box>
  );
};

export default ContactPage;

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
      <Box sx={{ py: isMobile ? 6 : 10, bgcolor: 'primary.main', color: '#ffffffff', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant={isMobile ? "h3" : "h2"} gutterBottom sx={{ fontWeight: 800, color: '#ffffffff !important' }}>Contact Us</Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.8, color: '#ffffffff !important' }}>
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
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>+91 99722 80728</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <IconButton sx={{ bgcolor: 'secondary.main', color: '#FFF', width: 48, height: 48, '&:hover': { bgcolor: 'secondary.dark' } }}>
                    <WhatsApp />
                  </IconButton>
                  <Box>
                    <Typography variant="caption" color="text.secondary">WHATSAPP CHAT</Typography>
                    <Link href="https://wa.me/919972280728" target="_blank" sx={{ display: 'block', fontWeight: 600, color: 'inherit', textDecoration: 'none' }}>
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
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>rajrajeshwarienterprises721@gmail.com</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton sx={{ bgcolor: 'primary.main', color: '#FFF', width: 48, height: 48, '&:hover': { bgcolor: 'primary.dark' } }}>
                    <LocationOn />
                  </IconButton>
                  <Box>
                    <Typography variant="caption" color="text.secondary">VISIT US</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>31/12, 4th Main Road, Puttenahalli,<br />J. P. Nagar, 7th Phase, Bengaluru - 560078</Typography>
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

      <Box sx={{ height: isMobile ? '300px' : '450px', width: '100%' }}>
        <iframe
          title="Amrutha Dharee Location"
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3889.171164455281!2d77.57992207507517!3d12.896712987411837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDUzJzQ4LjIiTiA3N8KwMzQnNTcuMCJF!5e0!3m2!1sen!2sin!4v1777893738927!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>
    </Box>
  );
};

export default ContactPage;

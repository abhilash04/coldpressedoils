import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, Box, Typography, TextField,
  Button, IconButton, useTheme, useMediaQuery
} from '@mui/material';
import { Close as CloseIcon, Phone as PhoneIcon, Person as PersonIcon } from '@mui/icons-material';
import Cookies from 'js-cookie';
import { invokeApi, apiList } from '../../services/apiServices';
import { config } from '../../config/config';

const LeadPopup = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Check if user has already submitted or closed the popup recently
    const hasInteracted = Cookies.get('amrutha_lead_interacted');
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 5000); // 5 second delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = (permanent = false) => {
    setOpen(false);
    if (permanent) {
      // Set cookie for 30 days so they don't see it again
      Cookies.set('amrutha_lead_interacted', 'true', { expires: 30 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    try {
      const response = await invokeApi(
        config.apiUrl + apiList.addLead,
        {
          name,
          phone,
          personType: 'Website Visitor'
        }
      );

      if (response?.status === 200) {
        // Success!
        Cookies.set('amrutha_lead_interacted', 'true', { expires: 365 });
        setOpen(false);
        alert('Thank you! Our health expert will contact you shortly.');
      }
    } catch (error) {
      console.error('Lead submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #FFF 0%, #F9FAF4 100%)',
          position: 'relative'
        }
      }}
    >
      {/* <IconButton
        onClick={() => handleClose(true)}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'grey.500',
          zIndex: 1
        }}
      >
        <CloseIcon />
      </IconButton> */}

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
          {/* Left Column - Image/Branding */}
          <Box
            sx={{
              width: { xs: '100%', sm: '40%' },
              display: { xs: 'none', sm: 'flex' },
              bgcolor: 'primary.main',
              p: 4,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>10% OFF</Typography>
            <Typography variant="subtitle1">On your first order today!</Typography>
            <Box sx={{ mt: 3, opacity: 0.8 }}>
              <Typography variant="caption">Authentic. Pure. Traditional.</Typography>
            </Box>
          </Box>

          {/* Right Column - Form */}
          <Box sx={{ p: 4, flex: 1 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: '#2D3436' }}>
              Let's Personalize Your Health Journey
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Leave your details and get a free consultation with our oil specialist.
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                InputProps={{
                  startAdornment: <PersonIcon sx={{ color: 'primary.main', mr: 1 }} />
                }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                InputProps={{
                  startAdornment: <PhoneIcon sx={{ color: 'primary.main', mr: 1 }} />
                }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: 700,
                  boxShadow: '0 10px 20px rgba(0,88,75,0.2)'
                }}
              >
                {loading ? 'Submitting...' : 'Claim My Discount'}
              </Button>
            </form>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LeadPopup;

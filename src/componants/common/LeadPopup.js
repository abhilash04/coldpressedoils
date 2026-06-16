import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, Box, Typography, TextField,
  Button, IconButton, useTheme, useMediaQuery
} from '@mui/material';
import { Close as CloseIcon, Phone as PhoneIcon, Person as PersonIcon } from '@mui/icons-material';
import Cookies from 'js-cookie';
import { invokeApi, apiList } from '../../services/apiServices';
import { config } from '../../config/config';
import popupImg from '../../assets/pop-up.png';

const LeadPopup = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000); // 5 second delay
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
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
      onClose={handleClose}
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
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          zIndex: 10,
          backgroundColor: 'rgba(255,255,255,0.9)',
          color: '#333',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          '&:hover': { backgroundColor: '#fff', color: '#E53935' },
          width: 32,
          height: 32,
        }}
      >
        <CloseIcon sx={{ fontSize: '1.1rem' }} />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
          {/* Left Column - Image */}
          <Box
            sx={{
              width: { xs: '100%', sm: '40%' },
              display: { xs: 'none', sm: 'block' },
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={popupImg}
              alt="Special Offer"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
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

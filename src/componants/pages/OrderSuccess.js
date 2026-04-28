import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { CheckCircleOutline, LocalShipping } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 15, textAlign: 'center' }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <CheckCircleOutline sx={{ fontSize: 120, color: 'success.main', mb: 4 }} />
      </motion.div>
      
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>Thank You!</Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>Your order has been placed successfully.</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
        We have received your order. Our team will start pressing your fresh oil right away. 
        You will receive an email confirmation with your order number shortly.
      </Typography>

      <Box sx={{ p: 4, bgcolor: '#F9FAF4', display: 'flex', alignItems: 'center', gap: 3, mb: 6, textAlign: 'left' }}>
        <LocalShipping color="primary" sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Estimated Delivery</Typography>
          <Typography variant="body2" color="text.secondary">Your pure oils will arrive within 3-5 business days.</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/shop')} size="large">
          CONTINUE SHOPPING
        </Button>
        <Button variant="outlined" color="primary" onClick={() => navigate('/account/orders')} size="large">
          TRACK ORDER
        </Button>
      </Box>
    </Container>
  );
};

export default OrderSuccess;

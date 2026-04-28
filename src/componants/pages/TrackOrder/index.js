import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Stepper, Step, StepLabel, Divider, CircularProgress } from '@mui/material';
import { LocalShipping, Search } from '@mui/icons-material';
import { apiList, invokeGetApi } from '../../../services/apiServices';

const TrackOrder = () => {
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const steps = ['Order Received', 'Processing', 'In Transit', 'Delivered'];

  const handleTrack = async () => {
    if (!phone) return;
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const response = await invokeGetApi(apiList.trackOrder + "/" + phone);
      if (response.status === 200) {
          setOrder(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getActiveStep = (status) => {
    return steps.indexOf(status);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <LocalShipping sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" sx={{ fontWeight: 800 }}>Track Your Order</Typography>
        <Typography color="text.secondary">Enter your registered phone number to see live status.</Typography>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 0, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField 
            fullWidth 
            label="Phone Number" 
            placeholder="e.g. 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button 
            variant="contained" 
            size="large" 
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Search />}
            onClick={handleTrack}
            disabled={loading}
          >
            Track
          </Button>
        </Box>

        {error && <Typography color="error" align="center">{error}</Typography>}

        {order && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 4 }} />
            <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 700 }}>
              Status: <Box component="span" sx={{ color: 'primary.main' }}>{order.consumer_status}</Box>
            </Typography>
            
            <Stepper activeStep={getActiveStep(order.consumer_status)} alternativeLabel sx={{ mt: 6 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ mt: 6, p: 3, bgcolor: '#F9FAF4', border: '1px dashed #DDD' }}>
              <Typography variant="subtitle2" color="text.secondary">Details:</Typography>
              <Typography variant="body1">Customer: <strong>{order.name}</strong></Typography>
              <Typography variant="body2" color="text.secondary">Order Date: {new Date(order.created_date).toDateString()}</Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default TrackOrder;

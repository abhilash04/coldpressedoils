import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  TextField,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider
} from '@mui/material';
import { useCart } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const steps = ['Delivery Info', 'Payment', 'Order Review'];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Simulate Order Placement
      clearCart();
      navigate('/order-success');
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom mb={6}>Checkout</Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 8 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, borderRadius: 0 }}>
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Shipping Address</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="First Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Last Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Street Address" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="City" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Pincode" variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Mobile Number" variant="outlined" />
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Choose Payment Method</Typography>
                <RadioGroup defaultValue="cod">
                  <FormControlLabel
                    value="razorpay"
                    disabled
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.6 }}>
                        <Typography sx={{ fontWeight: 600 }}>Online Payment (Razorpay)</Typography>
                        <Typography variant="caption" color="error">Currently Unavailable</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontWeight: 600 }}>Cash on Delivery (COD)</Typography>
                        <Typography variant="caption" color="success.main">Available</Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </Box>
            )}

            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Review Your Order</Typography>
                {cartItems.map((item) => (
                  <Box key={`${item.id}-${item.size}`} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>{item.name} (x{item.quantity})</Typography>
                    <Typography sx={{ fontWeight: 700 }}>₹{item.price * item.quantity}</Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  By placing this order, you agree to our terms and conditions.
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 6, gap: 2 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} variant="text">Back</Button>
              )}
              <Button onClick={handleNext} variant="contained" color="primary" size="large">
                {activeStep === steps.length - 1 ? 'PLACE ORDER' : 'NEXT STEP'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, borderRadius: 0, backgroundColor: '#F9FAF4' }}>
            <Typography variant="h6" sx={{ mb: 4, fontWeight: 700 }}>Cart Summary</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary">Items Total</Typography>
              <Typography sx={{ fontWeight: 700 }}>₹{subtotal}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary">Shipping</Typography>
              <Typography sx={{ fontWeight: 700 }}>{subtotal > 999 ? 'FREE' : '₹50'}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Estimated Total</Typography>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>₹{subtotal > 999 ? subtotal : subtotal + 50}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;

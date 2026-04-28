import React from 'react';
import { Box, Typography, Card, Grid, Chip, Button, Divider } from '@mui/material';

const OrdersList = () => {
  const orders = [
    { id: '#AD-98241', date: 'April 20, 2026', total: 1245, status: 'Shipped', items: 'Groundnut Oil (1L), Coconut Oil (500ml)' },
    { id: '#AD-97103', date: 'March 15, 2026', total: 699, status: 'Delivered', items: 'Black Sesame Oil (500ml)' },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>Your Orders</Typography>
      {orders.map((order) => (
        <Card key={order.id} sx={{ p: 3, mb: 3, borderRadius: 0, boxShadow: 'none', border: '1px solid #EEE' }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={3}>
              <Typography variant="caption" color="text.secondary">ORDER ID</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{order.id}</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="caption" color="text.secondary">DATE</Typography>
              <Typography variant="subtitle1">{order.date}</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="caption" color="text.secondary">TOTAL</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>₹{order.total}</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Chip 
                label={order.status} 
                size="small" 
                color={order.status === 'Delivered' ? 'success' : 'primary'} 
                sx={{ borderRadius: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={2} sx={{ textAlign: 'right' }}>
              <Button size="small" variant="outlined">DETAILS</Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="text.secondary">{order.items}</Typography>
        </Card>
      ))}
    </Box>
  );
};

export default OrdersList;

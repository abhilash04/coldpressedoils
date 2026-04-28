import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Button 
} from '@mui/material';
import { 
  ShoppingBag, 
  CardGiftcard 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProfileOverview = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
        Welcome back, {user?.name ? user.name.split(' ')[0] : 'Member'}!
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', borderRadius: 0, border: '1px solid #eee', transition: 'all 0.3s', '&:hover': { bgcolor: '#F9FAF4' } }}>
            <ShoppingBag fontSize="large" sx={{ mb: 2, color: '#2D6A4F' }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Recent Orders</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Track your purchases & invoices</Typography>
            <Button variant="outlined" sx={{ color: '#2D6A4F', borderColor: '#2D6A4F', borderRadius: 0 }} onClick={() => navigate('/account/orders')}>View History</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', borderRadius: 0, border: '1px solid #eee', transition: 'all 0.3s', '&:hover': { bgcolor: '#F9FAF4' } }}>
            <CardGiftcard fontSize="large" sx={{ mb: 2, color: '#2D6A4F' }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Reward Wallet</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Redeem points for discounts</Typography>
            <Typography variant="caption" sx={{ color: '#2D6A4F', fontWeight: 600 }}>Apply points at checkout</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6, p: 4, bgcolor: '#F9FAF4', borderLeft: '4px solid #2D6A4F' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Account Security</Typography>
        <Typography variant="body2" color="text.secondary">
          Keep your account secure by updating your password regularly. 
          Manage your active sessions and two-factor authentication from the profile settings.
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileOverview;

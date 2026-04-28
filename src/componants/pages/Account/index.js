import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Button
} from '@mui/material';
import { 
  ShoppingBag, 
  Favorite, 
  LocationOn, 
  Person, 
  Logout, 
  CardGiftcard 
} from '@mui/icons-material';
import { useUser } from '../../../context/UserContext';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import ProfileOverview from './ProfileOverview';

const AccountDashboard = () => {
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'My Profile', icon: <Person />, path: '/account' },
    { label: 'Order History', icon: <ShoppingBag />, path: '/account/orders' },
    { label: 'Wishlist', icon: <Favorite />, path: '/account/wishlist' },
    { label: 'Addresses', icon: <LocationOn />, path: '/account/address' },
  ];

  if (!user) return (
    <Container sx={{ py: 15, textAlign: 'center' }}>
      <Typography variant="h5">Please login to view your account.</Typography>
      <Button variant="contained" component={Link} to="/login" sx={{ mt: 3 }}>Login</Button>
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 0, borderRadius: 0, border: '1px solid #eee' }} elevation={0}>
            <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#F9FAF4' }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{user.name || 'User'}</Typography>
              <Typography variant="body2" color="text.secondary">{user.email}</Typography>
              
              <Box sx={{ mt: 3, p: 2, bgcolor: '#2D6A4F', color: '#FFF' }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 0.5, letterSpacing: 1.5 }}>LOYALTY POINTS</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{user.loyaltyPoints || 0}</Typography>
              </Box>
            </Box>
            <List sx={{ py: 2 }}>
              {menuItems.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton 
                    component={Link} 
                    to={item.path} 
                    selected={location.pathname === item.path}
                    sx={{
                      '&.Mui-selected': { 
                        bgcolor: 'rgba(45, 106, 79, 0.08)',
                        color: '#2D6A4F',
                        borderRight: '3px solid #2D6A4F',
                        '& .MuiListItemIcon-root': { color: '#2D6A4F' }
                      }
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider sx={{ my: 1 }} />
              <ListItem disablePadding>
                <ListItemButton onClick={logout} sx={{ color: 'error.main' }}>
                  <ListItemIcon><Logout color="error" /></ListItemIcon>
                  <ListItemText primary="Log Out" primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Content Area */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 4, borderRadius: 0, minHeight: '500px', border: '1px solid #eee' }} elevation={0}>
            {/* The Outlet renders the child routes defined in App.js */}
            <Outlet context={{ user }} />
            
            {/* Fallback for direct /account access if index route is not matched (though index is defined) */}
            {location.pathname === '/account' && <ProfileOverview user={user} />}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountDashboard;

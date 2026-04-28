import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper,
  Button,
  IconButton,
  Chip
} from '@mui/material';
import { LocationOn, Edit, Delete, Add } from '@mui/icons-material';

const AddressBook = () => {
  // Mock data for addresses
  const addresses = [
    { 
      id: 1, 
      type: 'Home', 
      isDefault: true,
      name: 'John Doe',
      address: '123, Green Valley Apt, Bannerghatta Road',
      city: 'Bangalore',
      pincode: '560076',
      phone: '9876543210'
    },
    { 
      id: 2, 
      type: 'Office', 
      isDefault: false,
      name: 'John Doe',
      address: 'Sproad Tower, 4th Floor, HSR Layout',
      city: 'Bangalore',
      pincode: '560102',
      phone: '9876543210'
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LocationOn sx={{ color: '#2D6A4F' }} />
          <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
            My Addresses
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          sx={{ bgcolor: '#2D6A4F', borderRadius: 0, '&:hover': { bgcolor: '#1B4332' } }}
        >
          Add New
        </Button>
      </Box>

      <Grid container spacing={3}>
        {addresses.map((addr) => (
          <Grid item xs={12} sm={6} key={addr.id}>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 3, 
                borderRadius: 0, 
                border: '1px solid #eee',
                position: 'relative',
                transition: 'all 0.3s',
                '&:hover': { borderColor: '#2D6A4F' }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{addr.type}</Typography>
                  {addr.isDefault && (
                    <Chip label="Default" size="small" sx={{ bgcolor: '#2D6A4F', color: '#fff', fontSize: '10px', height: '18px' }} />
                  )}
                </Box>
                <Box>
                  <IconButton size="small"><Edit fontSize="small" /></IconButton>
                  <IconButton size="small" color="error"><Delete fontSize="small" /></IconButton>
                </Box>
              </Box>
              
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>{addr.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{addr.address}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{addr.city} - {addr.pincode}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 600 }}>Phone: {addr.phone}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AddressBook;

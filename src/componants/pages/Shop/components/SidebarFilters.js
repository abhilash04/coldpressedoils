import React from 'react';
import { 
  Box, 
  Typography, 
  FormGroup, 
  FormControlLabel, 
  Checkbox, 
  Slider, 
  Divider, 
  List, 
  ListItem, 
  ListItemText,
  ListItemButton
} from '@mui/material';

const SidebarFilters = ({ filters, setFilters }) => {
  const categories = [
    { name: 'all', label: 'All Products' },
    { name: 'cold-pressed-oils', label: 'Cold Pressed Oils' },
    { name: 'flours', label: 'Flours & Grains' },
    { name: 'jaggery-sweeteners', label: 'Jaggery & Sweeteners' },
    { name: 'masalas-spices', label: 'Masalas & Spices' },
    { name: 'rock-salt-condiments', label: 'Rock Salt' },
  ];

  const handleCategoryChange = (cat) => {
    setFilters({ ...filters, category: cat === 'all' ? '' : cat });
  };

  const handlePriceChange = (event, newValue) => {
    setFilters({ ...filters, priceRange: newValue });
  };

  return (
    <Box>
      {/* Category List */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1rem' }}>CATEGORIES</Typography>
      <List dense sx={{ mb: 4 }}>
        {categories.map((cat) => (
          <ListItem key={cat.name} disablePadding>
            <ListItemButton 
              selected={(filters.category === cat.name) || (cat.name === 'all' && !filters.category)}
              onClick={() => handleCategoryChange(cat.name)}
              sx={{ 
                py: 0.5,
                '&.Mui-selected': { 
                  backgroundColor: 'transparent', 
                  color: 'primary.main',
                  '& .MuiTypography-root': { fontWeight: 600 }
                }
              }}
            >
              <ListItemText primary={cat.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ mb: 4 }} />

      {/* Price Range */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: '1rem' }}>PRICE RANGE</Typography>
      <Box sx={{ px: 1, mb: 4 }}>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={2000}
          sx={{ color: 'primary.main' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption">₹{filters.priceRange[0]}</Typography>
          <Typography variant="caption">₹{filters.priceRange[1]}</Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Volume/Weight (Mock) */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1rem' }}>VOLUME / WEIGHT</Typography>
      <FormGroup>
        {['250ml', '500ml', '1L', '5L', '250g', '500g', '1kg'].map((v) => (
          <FormControlLabel 
            key={v} 
            control={<Checkbox size="small" />} 
            label={v} 
            sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default SidebarFilters;

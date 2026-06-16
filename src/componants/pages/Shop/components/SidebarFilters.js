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
    { name: '', label: 'All Products' },
    { name: 1, label: 'Cold Pressed Oils' },
    { name: 2, label: 'Spices & Powders' },
    { name: 3, label: 'Jaggery & Sweeteners' },
    { name: 4, label: 'Healthy Flours' },
    { name: 5, label: 'Rock Salt' },
  ];

  const handleCategoryChange = (cat) => {
    setFilters({ ...filters, category: cat });
  };

  const handlePriceChange = (event, newValue) => {
    setFilters({ ...filters, priceRange: newValue });
  };

  const handleVolumeToggle = (volume) => {
    const currentVolumes = filters.volumes || [];
    const newVolumes = currentVolumes.includes(volume)
      ? currentVolumes.filter(v => v !== volume)
      : [...currentVolumes, volume];
    setFilters({ ...filters, volumes: newVolumes });
  };

  return (
    <Box>
      {/* Category List */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1rem' }}>CATEGORIES</Typography>
      <List dense sx={{ mb: 4 }}>
        {categories.map((cat) => (
          <ListItem key={cat.label} disablePadding>
            <ListItemButton
              selected={filters.category === cat.name}
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

      {/* Volume/Weight */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1rem' }}>VOLUME / WEIGHT</Typography>
      <FormGroup>
        {['100ml', '250ml', '500ml', '1L', '5L', '100g', '200g', '250g', '500g', '1kg'].map((v) => (
          <FormControlLabel
            key={v}
            control={
              <Checkbox
                size="small"
                checked={(filters.volumes || []).includes(v)}
                onChange={() => handleVolumeToggle(v)}
              />
            }
            label={v}
            sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default SidebarFilters;

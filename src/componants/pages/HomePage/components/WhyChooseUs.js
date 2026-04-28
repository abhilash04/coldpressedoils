import React from 'react';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { 
  EnergySavingsLeaf, 
  History, 
  CleanHands, 
  LocalFlorist 
} from '@mui/icons-material';

const WhyChooseUs = () => {
  const pillars = [
    {
      icon: <History sx={{ fontSize: 40 }} />,
      title: '75+ Years Legacy',
      description: 'Generations of expertise in extracting the purest oils using traditional methods.',
    },
    {
      icon: <EnergySavingsLeaf sx={{ fontSize: 40 }} />,
      title: 'Wood Cold Pressed',
      description: 'Extracted in wooden Ghanis at low temperatures to preserve natural nutrients.',
    },
    {
      icon: <CleanHands sx={{ fontSize: 40 }} />,
      title: 'Zero Chemicals',
      description: 'No hexane, no bleaching, no preservatives. Just pure, natural goodness.',
    },
    {
      icon: <LocalFlorist sx={{ fontSize: 40 }} />,
      title: 'Nutrient Rich',
      description: 'Retains all essential antioxidants, Omega fatty acids, and original aroma.',
    },
  ];

  return (
    <Box sx={{ py: 10, backgroundColor: '#F9FAF4' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 8 }}>
          Why Amrutha Dharee?
        </Typography>
        <Grid container spacing={6}>
          {pillars.map((pillar, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    mb: 3, 
                    color: 'primary.main',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.1)' }
                  }}
                >
                  {pillar.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  {pillar.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {pillar.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;

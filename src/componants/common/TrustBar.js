import React from 'react';
import { Box, Container, Grid, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { VerifiedUser, Public, Recycling, WorkspacePremium } from '@mui/icons-material';
import { motion } from 'framer-motion';

const TrustBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const trustItems = [
    { 
      icon: <WorkspacePremium />, 
      title: "ISO & FSSAI Certified", 
      desc: "Meeting the highest safety standards." 
    },
    { 
      icon: <VerifiedUser />, 
      title: "100% Wood Pressed", 
      desc: "Traditional Vaagai wood extraction." 
    },
    { 
      icon: <Public />, 
      title: "Direct from Farmers", 
      desc: "Sustainably sourced premium seeds." 
    },
    { 
      icon: <Recycling />, 
      title: "Zero Waste Process", 
      desc: "Eco-friendly production & packaging." 
    }
  ];

  return (
    <Box sx={{ bgcolor: '#F9FAF4', borderY: '1px solid #EEE', py: isMobile ? 3 : 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={isMobile ? 2 : 4}>
          {trustItems.map((item, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <Paper 
                elevation={isMobile ? 1 : 0}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                sx={{ 
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: isMobile ? 2 : 0,
                  bgcolor: isMobile ? 'white' : 'transparent',
                  borderRadius: 2,
                  height: '100%',
                  border: isMobile ? 'none' : 'none'
                }}
              >
                <Box sx={{ color: 'primary.main', mb: isMobile ? 1 : 2 }}>
                  {React.cloneElement(item.icon, { sx: { fontSize: isMobile ? 32 : 40 } })}
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, fontSize: isMobile ? '0.85rem' : '1.1rem', lineHeight: 1.2 }}>
                  {item.title}
                </Typography>
                {!isMobile && (
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3, display: 'block' }}>
                    {item.desc}
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TrustBar;

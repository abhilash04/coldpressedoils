import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { VerifiedUser, Public, Recycling, WorkspacePremium } from '@mui/icons-material';
import { motion } from 'framer-motion';

const TrustBar = () => {
  const trustItems = [
    { 
      icon: <WorkspacePremium sx={{ fontSize: 40 }} />, 
      title: "ISO & FSSAI Certified", 
      desc: "Meeting the highest safety standards." 
    },
    { 
      icon: <VerifiedUser sx={{ fontSize: 40 }} />, 
      title: "100% Wood Pressed", 
      desc: "Traditional Vaagai wood extraction." 
    },
    { 
      icon: <Public sx={{ fontSize: 40 }} />, 
      title: "Direct from Farmers", 
      desc: "Sustainably sourced premium seeds." 
    },
    { 
      icon: <Recycling sx={{ fontSize: 40 }} />, 
      title: "Zero Waste Process", 
      desc: "Eco-friendly production & packaging." 
    }
  ];

  return (
    <Box sx={{ bgcolor: '#F9FAF4', borderY: '1px solid #EEE', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {trustItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box 
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
                  px: 2
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {item.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1.1rem' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TrustBar;

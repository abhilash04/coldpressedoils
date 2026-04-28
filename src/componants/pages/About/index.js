import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const milestones = [
    { year: '1949', title: 'The Beginning', desc: 'Started with a single traditional wooden Ghani in Pune.' },
    { year: '1975', title: 'Expanding Quality', desc: 'Introduced cold pressing for seeds across the region.' },
    { year: '2010', title: 'Digital Era', desc: 'Launched our first online delivery service for pure oils.' },
    { year: '2026', title: 'Modern Legacy', desc: '50,000+ families trust Amrutha Dharee today.' },
  ];

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ py: 12, backgroundColor: 'primary.main', color: '#FFF', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom>Our Story</Typography>
          <Typography variant="h5" sx={{ fontWeight: 400, opacity: 0.9 }}>
            Since 1949, we've pressed oils the way our ancestors did — slowly, gently, and without a single chemical.
          </Typography>
        </Container>
      </Box>

      {/* Narrative */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box 
              component="img" 
              src="/assets/images/hero_banner.png" 
              sx={{ width: '100%', borderRadius: 0, boxShadow: '20px 20px 0px #F9FAF4' }} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>A Legacy of Purity</Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              At Amrutha Dharee, we believe that the secret to good health lies in the simplicity of tradition. 
              For over 75 years, our family has been committed to the art of wood cold pressing.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Unlike modern refined oils that use high heat and hazardous chemicals, our process is slow, natural, 
              and chemical-free. We source the finest seeds directly from farmers and press them in wooden 
              mortars to ensure every drop is as pure as nature intended.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Timeline */}
      <Box sx={{ py: 10, backgroundColor: '#F9FAF4' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 8 }}>Our Journey</Typography>
          <Grid container spacing={4}>
            {milestones.map((m, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card sx={{ height: '100%', textAlign: 'center', p: 2, borderRadius: 0 }}>
                    <CardContent>
                      <Typography variant="h2" color="primary.main" sx={{ fontWeight: 800, opacity: 0.2 }}>{m.year}</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, mt: -4, mb: 2 }}>{m.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{m.desc}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUs;

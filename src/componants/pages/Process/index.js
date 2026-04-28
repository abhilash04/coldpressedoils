import React from 'react';
import { Box, Container, Typography, Grid, Paper, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle, Cancel, FilterAlt, WaterDrop, WbSunny, Agriculture } from '@mui/icons-material';

const OurProcess = () => {
  const steps = [
    { icon: <Agriculture />, title: 'Ethical Sourcing', desc: 'Pre-vetted, non-GMO seeds sourced directly from sustainable farms.' },
    { icon: <WbSunny />, title: 'Natural Sun Drying', desc: 'Seeds are sun-dried to reduce moisture without damaging nutrients.' },
    { icon: <WaterDrop />, title: 'Wooden Ghani Press', desc: 'Pressed at < 40°C in wooden mortars to prevent nutrient loss.' },
    { icon: <FilterAlt />, title: 'Sedimentation', desc: 'Natural filtration through cloth to remove impurities, no chemicals.' },
  ];

  return (
    <Box>
      <Box sx={{ py: 10, backgroundColor: '#1B4332', color: '#FFF' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom>How We Make It</Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.8 }}>
            Transparency in every drop. Witness the journey from the farm to your kitchen.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {steps.map((s, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ width: 80, height: 80, margin: '0 auto', bgcolor: 'primary.main', mb: 3 }}>
                  {React.cloneElement(s.icon, { sx: { fontSize: 40 } })}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{s.title}</Typography>
                <Typography variant="body2" color="text.secondary">{s.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 10 }} />

        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, bgcolor: '#F1F8E9', borderRadius: 0 }}>
              <Typography variant="h4" sx={{ mb: 4, color: 'primary.main', fontWeight: 700 }}>What We Do (The Pure Way)</Typography>
              <List>
                {['Single-press extraction', 'Room temperature processing', 'Manual labor and love', 'Recyclable packaging'].map((text) => (
                  <ListItem key={text}>
                    <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, bgcolor: '#FFEBEE', borderRadius: 0 }}>
              <Typography variant="h4" sx={{ mb: 4, color: '#C62828', fontWeight: 700 }}>What We Never Do</Typography>
              <List>
                {['No Hexane Extraction', 'No Bleaching', 'No Hydrogenation', 'No Chemical Preservatives'].map((text) => (
                  <ListItem key={text}>
                    <ListItemIcon><Cancel sx={{ color: '#C62828' }} /></ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OurProcess;

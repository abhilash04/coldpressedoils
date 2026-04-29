import { Box, Container, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const ProcessWalkthrough = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const steps = [
    {
      title: "1. Premium Seeds",
      desc: "We source the highest quality sun-dried seeds directly from local farmers.",
      icon: "🌱"
    },
    {
      title: "2. Wooden Ghani",
      desc: "Seeds are crushed in traditional Vaagai (Albizia Lebbeck) wood churners.",
      icon: "🪵"
    },
    {
      title: "3. Heat-Free",
      desc: "Extraction happens at room temperature (< 45°C) to keep nutrients intact.",
      icon: "❄️"
    },
    {
      title: "4. Sedimentary Filtering",
      desc: "Oil is left to settle naturally for 48 hours. No chemical filters.",
      icon: "⏳"
    }
  ];

  return (
    <Box sx={{ py: { xs: 3, md: 6 }, bgcolor: '#ffffff' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 800,
            mb: 2,
            fontSize: { xs: '1.8rem', md: '3rem' }
          }}
        >
          From Farm to Bottle: The Wooden Ghani Way
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: { xs: 4, md: 8 }, maxWidth: 700, mx: 'auto', px: { xs: 2, md: 0 } }}>
          Witness the ancient art of cold-pressing that preserves every drop of nature's goodness.
        </Typography>

        <Grid container spacing={{ xs: 2, md: 4 }}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    textAlign: 'center',
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    bgcolor: '#F9FAF4',
                    border: '1px solid #EAEAEA',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4rem' }, mb: 2 }}>
                    {step.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'primary.main', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {step.desc}
                  </Typography>

                  {/* Connector Arrow for Desktop */}
                  {index < 3 && (
                    <Box
                      sx={{
                        display: { xs: 'none', md: 'block' },
                        position: 'absolute',
                        top: '50%',
                        right: -30,
                        zIndex: 1,
                        color: '#DDD'
                      }}
                    >
                      <Typography variant="h4">→</Typography>
                    </Box>
                  )}
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Traditional USP Badge */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          sx={{
            mt: { xs: 6, md: 10 },
            p: { xs: 3, md: 4 },
            textAlign: 'center',
            border: '2px solid #B7791F',
            bgcolor: 'rgba(183, 121, 31, 0.05)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#B7791F', fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
            "Wooden Ghani oils are not just food, they are a legacy of health."
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.8, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
            Our Vaagai wood churners neutralize heat, ensuring zero carcinogenic properties in your oil.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ProcessWalkthrough;

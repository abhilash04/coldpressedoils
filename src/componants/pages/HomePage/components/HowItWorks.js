import { Box, Container, Grid, Typography, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses, styled, useTheme, useMediaQuery } from '@mui/material';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.vertical}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      width: 3,
      height: '100%',
      minHeight: 40,
    },
    marginLeft: 23,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.primary.main,
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>{icon}</Typography>
    </ColorlibStepIconRoot>
  );
}

const steps = [
  {
    label: 'Select Seeds',
    description: 'We source the highest quality seeds from trusted farmers.',
  },
  {
    label: 'Sun Drying',
    description: 'Seeds are naturally sun-dried to remove moisture and preserve oil quality.',
  },
  {
    label: 'Wooden Ghani Press',
    description: 'Pressed at low speeds in wooden mortars to avoid heat friction.',
  },
  {
    label: 'Bottle & Deliver',
    description: 'Freshly pressed oil is filtered and bottled directly for your kitchen.',
  },
];

const HowItWorks = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#FFF' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ 
            mb: { xs: 4, md: 8 },
            fontSize: { xs: '1.8rem', md: '3rem' },
            fontWeight: 800
          }}
        >
          Our Slow-Pressed Process
        </Typography>
        
        <Stepper 
          alternativeLabel={!isMobile} 
          activeStep={4} 
          orientation={isMobile ? 'vertical' : 'horizontal'}
          connector={<ColorlibConnector />}
          sx={{ 
            '& .MuiStep-root': {
              mb: isMobile ? 4 : 0
            }
          }}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel StepIconComponent={ColorlibStepIcon} icon={index + 1}>
                <Box sx={{ ml: isMobile ? 2 : 0, textAlign: isMobile ? 'left' : 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mt: isMobile ? 0 : 1 }}>
                    {step.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: isMobile ? '100%' : 250, mx: 'auto' }}>
                    {step.description}
                  </Typography>
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Box>
  );
};

export default HowItWorks;

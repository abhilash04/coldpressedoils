import {
  Box,
  Container,
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  styled,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import {
  Grass,
  WbSunny,
  PrecisionManufacturing,
  LocalShipping
} from '@mui/icons-material';
import { motion } from 'framer-motion';

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

  // Find the step by index (icon is 1-based index here)
  const step = steps[icon - 1];

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {step?.icon || <Typography variant="h6" sx={{ fontWeight: 700 }}>{icon}</Typography>}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  {
    label: 'Select Seeds',
    description: 'We source the highest quality seeds from trusted farmers.',
    icon: <Grass sx={{ fontSize: 24 }} />
  },
  {
    label: 'Sun Drying',
    description: 'Seeds are naturally sun-dried to remove moisture and preserve oil quality.',
    icon: <WbSunny sx={{ fontSize: 24 }} />
  },
  {
    label: 'Wooden Ghani',
    description: 'Pressed at low speeds in wooden mortars to avoid heat friction.',
    icon: <PrecisionManufacturing sx={{ fontSize: 24 }} />
  },
  {
    label: 'Bottle & Deliver',
    description: 'Freshly pressed oil is filtered and bottled directly for your kitchen.',
    icon: <LocalShipping sx={{ fontSize: 24 }} />
  },
];

const HowItWorks = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ pt: { xs: 8, md: 10 }, pb: { xs: 0, md: 10 }, backgroundColor: '#FFF' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            mb: { xs: 6, md: 10 },
            fontSize: { xs: '2.2rem', md: '3rem' },
            fontWeight: 800,
            color: 'primary.dark'
          }}
        >
          Our Slow-Pressed Process
        </Typography>

        {isMobile ? (
          <Box sx={{ px: 2, ml: 2, pb: 4 }}>
            {steps.map((step, index) => (
              <Box
                key={index} 
                sx={{ 
                  position: 'relative', 
                  display: 'flex', 
                  gap: 3,
                  pb: index === steps.length - 1 ? 0 : 4 // Reduced gap between steps
                }}
              >
                {/* Connector Line with Continuous Flow */}
                {index < steps.length - 1 && (
                  <Box 
                    sx={{
                      position: 'absolute',
                      left: 21, // Centered for 2px line
                      top: 48,
                      bottom: 0,
                      width: 2, // Reduced line width
                      bgcolor: 'rgba(46, 125, 50, 0.1)',
                      zIndex: 0,
                      overflow: 'hidden',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(to bottom, 
                          transparent 0%, 
                          ${theme.palette.primary.main} 20%, 
                          ${theme.palette.primary.main} 80%, 
                          transparent 100%)`,
                        backgroundSize: '100% 50px',
                        backgroundRepeat: 'no-repeat',
                        animation: 'travelingFlow 3s infinite linear',
                      }
                    }}
                  />
                )}

                {/* Step Icon Container (Static) */}
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(46, 125, 50, 0.2)',
                      border: '4px solid #F9FAF4',
                      outline: `2px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    {step.icon}
                  </Box>
                </Box>

                <Box sx={{ pt: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.dark', mb: 0 }}>
                    {step.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Stepper
            alternativeLabel
            activeStep={4}
            connector={<ColorlibConnector />}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel StepIconComponent={ColorlibStepIcon} icon={index + 1}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mt: 1, color: 'primary.dark' }}>
                      {step.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 250, mx: 'auto' }}>
                      {step.description}
                    </Typography>
                  </Box>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </Container>

      <style>
        {`
          @keyframes travelingFlow {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
        `}
      </style>
    </Box>
  );
};

export default HowItWorks;

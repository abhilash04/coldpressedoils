import React, { useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import './SnackbarNotification.css'; // custom styles

const getGradient = (severity) => {
  switch (severity) {
    case 'success':
      return 'linear-gradient(90deg, #56ab2f, #a8e063)';
    case 'error':
      return 'linear-gradient(90deg, #ff512f, #dd2476)';
    case 'warning':
      return 'linear-gradient(90deg, #f7971e, #ffd200)';
    case 'info':
      return 'linear-gradient(90deg, #1a2a6c, #b21f1f, #fdbb2d)';
    default:
      return 'linear-gradient(90deg, #a18cd1, #fbc2eb)';
  }
};

const getIcon = (severity) => {
  switch (severity) {
    case 'success':
      return <CheckCircleIcon />;
    case 'error':
      return <ErrorIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'info':
      return <InfoIcon />;
    default:
      return <InfoIcon />;
  }
};

const SnackbarNotification = ({ open, message, severity = 'info', onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 4000); // Auto close after 4s
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Box
      className="snackbar-notification"
      sx={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        padding: '6px 18px',
        backgroundImage: getGradient(severity),
        color: '#fff',
        borderRadius: '12px',
        boxShadow: '0px 8px 16px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 1000,
        animation: 'bounceIn 0.8s ease-out, fadeOut 0.8s ease-in 3.2s',
      }}
    >
      {getIcon(severity)}
      <Typography variant="body1" sx={{ fontWeight: 'bold', flex: 1 }}>
        {message}
      </Typography>
      <IconButton onClick={onClose} sx={{ color: '#fff' }}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default SnackbarNotification;

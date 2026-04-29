import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const announcements = [
  '🚚 Free Delivery on orders above ₹999 | Pan India Shipping',
  '🛡️ 100% Natural & Chemical-Free | FSSAI Certified',
  '💰 Cash on Delivery Available | Order with Confidence',
  '🌿 75+ Years of Wooden Ghani Tradition | Amrutha Dharee',
  '🎁 Order on WhatsApp for exclusive offers!',
];

const AnnouncementBar = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <Box
      sx={{
        bgcolor: '#2D6A4F',
        color: '#fff',
        py: isMobile ? 0.6 : 0.8,
        px: isMobile ? 0 : 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: isMobile ? 32 : 36,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          style={{
            textAlign: 'center',
            width: '100%',
            padding: isMobile ? '0 30px' : '0'
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              letterSpacing: 0.2,
              fontSize: isMobile ? '0.62rem' : '0.82rem',
              display: 'block',
              lineHeight: 1.5,
            }}
          >
            {announcements[current]}
          </Typography>
        </motion.div>
      </AnimatePresence>

      <IconButton
        size="small"
        onClick={() => setVisible(false)}
        sx={{
          position: 'absolute',
          right: isMobile ? 6 : 6,
          color: 'rgba(255,255,255,0.75)',
          p: 0.3
        }}
      >
        <Close sx={{ fontSize: isMobile ? 14 : 15 }} />
      </IconButton>
    </Box>
  );
};

export default AnnouncementBar;

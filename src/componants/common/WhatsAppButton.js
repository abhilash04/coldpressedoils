import React, { useState } from 'react';
import { Box, Fab, Tooltip, Typography, Paper, IconButton } from '@mui/material';
import { WhatsApp, Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '919XXXXXXXXX'; // Amrutha Dharee number

const quickMessages = [
  { label: '🛒 Place an Order', msg: 'Hi! I want to place an order for your Cold Pressed Oils.' },
  { label: '📦 Track My Order', msg: 'Hi! I want to track my recent order.' },
  { label: '💬 Ask a Question', msg: 'Hi! I have a question about your products.' },
];

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);

  const sendMessage = (msg) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setOpen(false);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 20, md: 30 },
        right: { xs: 16, md: 30 },
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 1,
      }}
    >
      {/* Quick Message Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <Paper
              elevation={8}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                width: { xs: 220, md: 260 },
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              }}
            >
              {/* Header */}
              <Box sx={{ bgcolor: '#25D366', px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#fff', fontWeight: 700 }}>Amrutha Dharee</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                    🟢 Typically replies in minutes
                  </Typography>
                </Box>
                <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: '#fff', p: 0.3 }}>
                  <Close fontSize="small" />
                </IconButton>
              </Box>

              {/* Options */}
              <Box sx={{ p: 1.5, bgcolor: '#f0f0f0', display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="caption" sx={{ color: '#555', px: 0.5, pb: 0.5 }}>How can we help you?</Typography>
                {quickMessages.map((item, idx) => (
                  <Box
                    key={idx}
                    onClick={() => sendMessage(item.msg)}
                    sx={{
                      bgcolor: '#fff',
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: '1px solid #e0e0e0',
                      '&:hover': { bgcolor: '#e8f5e9', borderColor: '#25D366' },
                      transition: 'all 0.2s',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.82rem' }}>
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <Box component={motion.div} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: 'spring' }}>
        <Tooltip title={open ? '' : 'Chat on WhatsApp'} placement="left" arrow>
          <Fab
            onClick={() => setOpen(!open)}
            sx={{
              width: { xs: 52, md: 60 },
              height: { xs: 52, md: 60 },
              bgcolor: '#25D366',
              '&:hover': { bgcolor: '#128C7E', transform: 'scale(1.08)' },
              boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
              transition: 'all 0.25s',
            }}
          >
            <WhatsApp sx={{ fontSize: { xs: 28, md: 34 }, color: '#fff' }} />
          </Fab>
        </Tooltip>

        {/* Pulse ring */}
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.5, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          sx={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: '50%',
            bgcolor: '#25D366',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />
      </Box>
    </Box>
  );
};

export default WhatsAppButton;

import React from 'react';
import {
  Box,
  Fab,
  Tooltip,
  Zoom,
  Drawer,
  Typography,
  IconButton,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import {
  WhatsApp as WhatsAppIcon,
  Close as CloseIcon,
  DeleteOutline
} from "@mui/icons-material";
import { motion, useScroll, useSpring } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';
import { useCart } from '../../context/CartContext';
import LeadPopup from './LeadPopup';

// Assets for Sidebar Mapping
import groundnutImg from '../../assets/ArtBoard-img-3.jpg';
import gheeImg from '../../assets/gir-cow-ghee-1L.avif';
import coconutImg from '../../assets/Artboard_1_copy_2_522bca11-ea72-4152-8063-ddbc6d57fdc7.webp';
import sesameImg from '../../assets/2(1).png';
import mustardImg from '../../assets/anveshan-girghee-5ltr-dolchi.jpg';
import walnutImg from '../../assets/2(2).png';
import safflowerImg from '../../assets/2(3).png';

const assetMap = {
  'groundnut': groundnutImg,
  'ghee': gheeImg,
  'coconut': coconutImg,
  'til': sesameImg,
  'mustard': mustardImg,
  'walnut': walnutImg,
  'safflower': safflowerImg
};

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { cartItems, isCartOpen, setCartOpen, subtotal, removeFromCart } = useCart();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const getMappedImage = (img) => assetMap[img] || img;

  const whatsappMessage = encodeURIComponent("Namaste! I'm interested in Amrutha Dharee pure oils. Can you help me with my purchase?");
  const whatsappNumber = "912";

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: '#B7791F',
          transformOrigin: '0%',
          zIndex: 2000
        }}
      />

      <AnnouncementBar />
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
      <LeadPopup />

      {/* Express Cart Sidebar (Luxury Tier Enhancement) */}
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setCartOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 400 }, p: 3, bgcolor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)' } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Your Bag</Typography>
          <IconButton onClick={() => setCartOpen(false)}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ mb: 3 }} />

        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography color="text.secondary">Your bag is empty.</Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => { setCartOpen(false); navigate('/shop'); }}>Start Shopping</Button>
          </Box>
        ) : (
          <>
            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
              {cartItems.map((item) => (
                <ListItem key={`${item.id}-${item.size}`} sx={{ px: 0, mb: 2 }}>
                  <Box component="img" src={getMappedImage(item.image)} sx={{ width: 70, height: 70, objectFit: 'contain', bgcolor: '#F5F5F5', mr: 2 }} />
                  <ListItemText
                    primary={item.name}
                    secondary={`Size: ${item.size} | ₹${item.price}`}
                    primaryTypographyProps={{ fontWeight: 700 }}
                  />
                  <IconButton color="error" size="small" onClick={() => removeFromCart(item.id, item.size)}><DeleteOutline /></IconButton>
                </ListItem>
              ))}
            </List>
            <Box sx={{ mt: 'auto', pt: 3 }}>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Subtotal</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>₹{subtotal}</Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => { setCartOpen(false); navigate('/checkout'); }}
                sx={{ py: 2, fontWeight: 700 }}
              >
                CHECKOUT NOW
              </Button>
              <Button fullWidth onClick={() => { setCartOpen(false); navigate('/cart'); }} sx={{ mt: 1 }}>View Full Cart</Button>
            </Box>
          </>
        )}
      </Drawer>

      {/* Floating WhatsApp Button */}
      <Box
        component={motion.div}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 1500
        }}
      >
        <Tooltip title="Talk to our Oil Expert" arrow placement="left" TransitionComponent={Zoom}>
          <Fab
            component="a"
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            size="large"
            sx={{
              bgcolor: '#25D366', color: 'white',
              '&:hover': { bgcolor: '#128C7E', transform: 'scale(1.1)' },
              boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)'
            }}
          >
            <WhatsAppIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Layout;

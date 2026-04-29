import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton, Rating, Chip, useTheme, useMediaQuery } from '@mui/material';
import { FavoriteBorder, AddShoppingCart } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

import { Link } from 'react-router-dom';

// Assets
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
  'safflower': safflowerImg,
  'sunflower': walnutImg // Using this as a placeholder for sunflower
};

const ProductCard = ({ product }) => {
  const { addToCart, setCartOpen } = useCart();
  const { name, price, oldPrice, rating, reviews, image, badge, weight, slug } = product;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1, weight || '1L');
    setCartOpen(true);
  };

  const getImageSource = () => {
    if (assetMap[image]) return assetMap[image];
    if (typeof image === 'string' && image.startsWith('http')) return image;
    return groundnutImg;
  };

  const productPath = `/product/${slug || 'cold-pressed-groundnut-oil'}`;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      style={{ height: '100%' }}
    >
      <Card sx={{ position: 'relative', height: '100%', borderRadius: 0, overflow: 'visible', maxWidth: isMobile ? '280px' : '100%', mx: 'auto' }}>
        {badge && (
          <Chip
            label={badge}
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 2,
              backgroundColor: 'secondary.main',
              color: '#FFF',
              fontWeight: 700,
              borderRadius: 0,
              fontSize: isMobile ? '0.65rem' : '0.75rem',
              height: isMobile ? '20px' : '24px'
            }}
          />
        )}
        
        <IconButton
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 2,
            backgroundColor: 'rgba(255,255,255,0.8)',
            '&:hover': { backgroundColor: '#FFF' },
            padding: isMobile ? '4px' : '8px'
          }}
        >
          <FavoriteBorder fontSize={isMobile ? "inherit" : "small"} />
        </IconButton>

        <Link to={productPath}>
          <Box sx={{ p: isMobile ? 1.5 : 2, backgroundColor: '#F5F5F5' }}>
            <CardMedia
              component="img"
              image={getImageSource()}
              alt={name}
              sx={{
                height: isMobile ? 140 : 200,
                objectFit: 'contain',
                mixBlendMode: 'multiply',
              }}
            />
          </Box>
        </Link>

        <CardContent sx={{ textAlign: 'center', pb: 1, px: isMobile ? 1 : 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, fontSize: isMobile ? '0.65rem' : '0.75rem' }}>
            {weight}
          </Typography>
          <Typography 
            component={Link} 
            to={productPath}
            sx={{ 
              mt: 0.5, 
              mb: 1, 
              height: '2.8em', 
              overflow: 'hidden', 
              display: '-webkit-box', 
              WebkitBoxOrient: 'vertical', 
              WebkitLineClamp: 2,
              textDecoration: 'none',
              color: 'inherit',
              fontSize: isMobile ? '0.9rem' : '1.1rem',
              fontWeight: 600,
              lineHeight: 1.4,
              '&:hover': { color: 'primary.main' }
            }}
          >
            {name}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.5, mb: 1 }}>
            <Rating value={rating} precision={0.5} size="small" sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }} readOnly />
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}>
              ({reviews || 0})
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 1 }}>
            <Typography color="primary.main" sx={{ fontWeight: 700, fontSize: isMobile ? '1.1rem' : '1.25rem' }}>
              ₹{price}
            </Typography>
            {oldPrice && (
              <Typography color="text.secondary" sx={{ textDecoration: 'line-through', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                ₹{oldPrice}
              </Typography>
            )}
          </Box>
        </CardContent>

        <Box sx={{ px: isMobile ? 1.5 : 2, pb: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddShoppingCart sx={{ fontSize: isMobile ? '1rem !important' : 'inherit' }} />}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              py: isMobile ? 0.8 : 1,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: '#FFF',
              },
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
};

export default ProductCard;

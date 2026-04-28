import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton, Rating, Chip } from '@mui/material';
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

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating if wrapped in a link (though it is not here, good practice)
    addToCart(product, 1, weight || '1L');
    setCartOpen(true);
  };

  // Function to determine image source (handle both imported assets and paths)
  const getImageSource = () => {
    if (assetMap[image]) return assetMap[image];
    if (typeof image === 'string' && image.startsWith('http')) return image;
    return groundnutImg; // Fallback
  };

  const productPath = `/product/${slug || 'cold-pressed-groundnut-oil'}`;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ position: 'relative', height: '100%', borderRadius: 0, overflow: 'visible' }}>
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
          }}
        >
          <FavoriteBorder fontSize="small" />
        </IconButton>

        <Link to={productPath}>
          <Box sx={{ p: 2, backgroundColor: '#F5F5F5' }}>
            <CardMedia
              component="img"
              image={getImageSource()}
              alt={name}
              sx={{
                height: 200,
                objectFit: 'contain',
                mixBlendMode: 'multiply',
              }}
            />
          </Box>
        </Link>

        <CardContent sx={{ textAlign: 'center', pb: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            {weight}
          </Typography>
          <Typography 
            variant="h6" 
            component={Link} 
            to={productPath}
            sx={{ 
              mt: 0.5, 
              mb: 1, 
              height: '3.6em', 
              overflow: 'hidden', 
              lineClamp: 2, 
              display: '-webkit-box', 
              WebkitBoxOrient: 'vertical', 
              WebkitLineClamp: 2,
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {name}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 1 }}>
            <Rating value={rating} precision={0.5} size="small" readOnly />
            <Typography variant="caption" color="text.secondary">
              ({reviews})
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 1 }}>
            <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
              ₹{price}
            </Typography>
            {oldPrice && (
              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                ₹{oldPrice}
              </Typography>
            )}
          </Box>
        </CardContent>

        <Box sx={{ px: 2, pb: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddShoppingCart />}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
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

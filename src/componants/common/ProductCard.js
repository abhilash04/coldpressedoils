import React, { useState, useEffect } from 'react';
import {
  Card, CardMedia, CardContent, Typography, Button, Box,
  IconButton, Rating, Chip, useTheme, useMediaQuery, Select, MenuItem
} from '@mui/material';
import { FavoriteBorder, Add, Remove, ShoppingCart } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { config } from '../../config/config';
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
  groundnut: groundnutImg,
  ghee: gheeImg,
  coconut: coconutImg,
  til: sesameImg,
  mustard: mustardImg,
  walnut: walnutImg,
  safflower: safflowerImg,
  sunflower: walnutImg,
};

const ProductCard = ({ product }) => {
  const { addToCart, setCartOpen, cartItems } = useCart();
  const { name, price, oldPrice, rating, reviews, image, featuredImage, badge, weight, slug, ogUrl, variants } = product;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Parse variants safely
  const parsedVariants = (() => {
    try {
      if (!variants) return [];
      return typeof variants === 'string' ? JSON.parse(variants) : variants;
    } catch { return []; }
  })();
  const hasVariants = parsedVariants && parsedVariants.length > 0;

  const [selectedVariant, setSelectedVariant] = useState(hasVariants ? parsedVariants[0] : null);
  const [quantity, setQuantity] = useState(1);

  // Update selected variant when selectedVolumes changes
  useEffect(() => {
    if (hasVariants && selectedVolumes && selectedVolumes.length > 0) {
      const matchingVariant = parsedVariants.find(v => {
        const cleanVSize = v.size.toLowerCase().replace(/\s+/g, '');
        return selectedVolumes.some(sv => {
          const cleanSv = sv.toLowerCase().replace(/\s+/g, '');
          if (cleanVSize === cleanSv) return true;
          if (cleanVSize.includes(cleanSv) || cleanSv.includes(cleanVSize)) return true;

          // Handle common equivalents
          if ((cleanSv === '1l' || cleanSv === '1liter' || cleanSv === '1litre' || cleanSv === '1000ml') &&
            (cleanVSize === '1l' || cleanVSize === '1liter' || cleanVSize === '1litre' || cleanVSize === '1000ml')) return true;
          if ((cleanSv === '5l' || cleanSv === '5liter' || cleanSv === '5litre' || cleanSv === '5000ml') &&
            (cleanVSize === '5l' || cleanVSize === '5liter' || cleanVSize === '5litre' || cleanVSize === '5000ml')) return true;
          if ((cleanSv === '500ml' || cleanSv === '0.5l' || cleanSv === '0.5liter') &&
            (cleanVSize === '500ml' || cleanVSize === '0.5l' || cleanVSize === '0.5liter')) return true;
          if ((cleanSv === '250ml' || cleanSv === '0.25l') &&
            (cleanVSize === '250ml' || cleanVSize === '0.25l')) return true;
          if ((cleanSv === '1kg' || cleanSv === '1000g' || cleanSv === '1kilo') &&
            (cleanVSize === '1kg' || cleanVSize === '1000g' || cleanVSize === '1kilo')) return true;

          return false;
        });
      });
      if (matchingVariant) {
        setSelectedVariant(matchingVariant);
      } else {
        setSelectedVariant(parsedVariants[0]);
      }
    } else if (hasVariants) {
      setSelectedVariant(parsedVariants[0]);
    }
  }, [selectedVolumes, variants]);

  const displayPrice = selectedVariant ? selectedVariant.price : price;
  const displaySize = selectedVariant ? selectedVariant.size : (weight || '1L');

  // Stock: from selected variant or product.quantity field
  const availableStock = selectedVariant
    ? Number(selectedVariant.stock ?? 999)
    : Number(product.quantity ?? 999);
  const isOutOfStock = availableStock === 0;
  const isLowStock = !isOutOfStock && availableStock > 0 && availableStock <= 5;

  // Check if this product+size is already in cart
  const isInCart = cartItems.some(
    item => item.id === product.id && item.size === displaySize
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    if (isInCart) {
      // Already in cart — just open the cart drawer
      setCartOpen(true);
      return;
    }
    const safeQty = Math.min(quantity, availableStock);
    addToCart({ ...product, price: displayPrice, size: displaySize, image: featuredImage || image, stock: availableStock }, safeQty, displaySize);
    setCartOpen(true);
  };

  const handleVariantChange = (e) => {
    e.stopPropagation();
    const v = parsedVariants.find(v => v.size === e.target.value);
    setSelectedVariant(v);
    setQuantity(1); // reset qty when variant changes
  };

  const incrementQty = (e) => {
    e.preventDefault(); e.stopPropagation();
    setQuantity(q => Math.min(q + 1, availableStock || 1));
  };

  const decrementQty = (e) => {
    e.preventDefault(); e.stopPropagation();
    setQuantity(q => Math.max(q - 1, 1));
  };

  const getImageSource = () => {
    const imgSrc = featuredImage || image;
    if (!imgSrc) return groundnutImg;
    if (assetMap[imgSrc]) return assetMap[imgSrc];
    if (typeof imgSrc === 'string' && imgSrc.startsWith('http')) return imgSrc;
    if (typeof imgSrc === 'string' && imgSrc.startsWith('/')) return `${config.apiUrl}${imgSrc}`;
    return groundnutImg;
  };

  const productPath = `/product/${slug || ogUrl || 'product'}`;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }} style={{ height: '100%' }}>
      <Card sx={{
        position: 'relative',
        height: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        maxWidth: '100%',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #EFEFEF',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.25s ease',
        '&:hover': { boxShadow: '0 8px 28px rgba(0,0,0,0.12)' }
      }}>

        {/* Badge */}
        {badge && (
          <Chip label={badge} size="small" sx={{
            position: 'absolute', top: 10, left: 10, zIndex: 3,
            backgroundColor: '#222', color: '#FFF', fontWeight: 700,
            borderRadius: '4px', fontSize: '0.7rem', height: '22px'
          }} />
        )}

        {/* Wishlist */}
        <IconButton sx={{
          position: 'absolute', top: 8, right: 8, zIndex: 3,
          backgroundColor: 'rgba(255,255,255,0.88)',
          '&:hover': { backgroundColor: '#FFF', color: 'error.main' },
          padding: '5px',
        }}>
          <FavoriteBorder sx={{ fontSize: '1.1rem' }} />
        </IconButton>

        {/* ── FULL-WIDTH IMAGE (covers entire top, no padding) ── */}
        <Link to={productPath} style={{ display: 'block', flexShrink: 0 }}>
          <CardMedia
            component="img"
            image={getImageSource()}
            alt={displayName}
            sx={{
              height: isMobile ? 280 : 300,
              width: '100%',
              objectFit: 'cover',
              display: 'block',
              backgroundColor: '#F8F8F5',
            }}
          />
        </Link>

        {/* ── CARD CONTENT BELOW IMAGE ── */}
        <CardContent sx={{
          px: 1.5, pt: 1.2, pb: 1.5,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}>

          {/* ① SIZE SELECTOR — top of content */}
          <Select
            size="small"
            value={selectedVariant?.size || displaySize}
            onChange={handleVariantChange}
            onClick={e => e.stopPropagation()}
            disabled={!hasVariants}
            displayEmpty
            sx={{
              fontSize: '0.78rem',
              height: 30,
              borderRadius: '4px',
              backgroundColor: '#F5F5F5',
              '.MuiSelect-select': { py: 0.4, px: 1, color: '#444' },
              '& fieldset': { borderColor: '#E0E0E0' },
              '&:hover fieldset': { borderColor: '#BDBDBD' },
            }}
          >
            {hasVariants
              ? parsedVariants.map((v, idx) => (
                <MenuItem key={idx} value={v.size} sx={{ fontSize: '0.8rem' }}>
                  {v.size} — ₹{v.price}
                  {Number(v.stock) === 0 && <Typography component="span" sx={{ ml: 1, color: '#E53935', fontSize: '0.72rem' }}>(Out of Stock)</Typography>}
                </MenuItem>
              ))
              : <MenuItem value={displaySize} sx={{ fontSize: '0.8rem' }}>{displaySize}</MenuItem>
            }
          </Select>

          {/* ② TITLE (left) + PRICE & RATING (right) */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            {/* Title — left */}
            <Typography
              component={Link}
              to={productPath}
              sx={{
                flex: 1,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                textDecoration: 'none',
                color: '#111',
                fontSize: isMobile ? '0.88rem' : '0.95rem',
                fontWeight: 700,
                lineHeight: 1.4,
                '&:hover': { color: 'primary.main' }
              }}
            >
              {displayName}
            </Typography>

            {/* Price + Rating — right */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
              <Typography sx={{ color: '#1B813E', fontWeight: 800, fontSize: isMobile ? '1rem' : '1.1rem', lineHeight: 1.2 }}>
                ₹{displayPrice}
              </Typography>
              {oldPrice && !hasVariants && (
                <Typography sx={{ color: '#999', textDecoration: 'line-through', fontSize: '0.75rem', lineHeight: 1 }}>
                  ₹{oldPrice}
                </Typography>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, mt: 0.3 }}>
                <Rating value={Number(rating) || 5} precision={0.5} size="small"
                  sx={{ color: '#F59E0B', fontSize: '0.8rem' }} readOnly />
                <Typography sx={{ fontSize: '0.68rem', color: '#888' }}>({reviews || 0})</Typography>
              </Box>
            </Box>
          </Box>

          {/* ③ LOW STOCK WARNING */}
          {isLowStock && (
            <Typography sx={{ fontSize: '0.72rem', color: '#E65100', fontWeight: 600 }}>
              ⚠ Only {availableStock} left in stock!
            </Typography>
          )}

          {/* ③ QUANTITY STEPPER + ADD TO CART */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 'auto' }}>
            {/* Stepper — hidden when out of stock */}
            {!isOutOfStock && (
              <Box sx={{
                display: 'flex', alignItems: 'center',
                border: '1px solid #E0E0E0', borderRadius: '4px',
                height: 34, flexShrink: 0, backgroundColor: '#FAFAFA'
              }}>
                <IconButton onClick={decrementQty} sx={{ borderRadius: 0, p: 0, height: 34, width: 28 }}>
                  <Remove sx={{ fontSize: '0.85rem', color: '#555' }} />
                </IconButton>
                <Typography sx={{ minWidth: 26, textAlign: 'center', fontWeight: 600, fontSize: '0.9rem', userSelect: 'none' }}>
                  {quantity}
                </Typography>
                <IconButton onClick={incrementQty} disabled={quantity >= availableStock} sx={{ borderRadius: 0, p: 0, height: 34, width: 28 }}>
                  <Add sx={{ fontSize: '0.85rem', color: quantity >= availableStock ? '#ccc' : '#555' }} />
                </IconButton>
              </Box>
            )}

            {/* Add to Cart / Go to Cart / Out of Stock */}
            <Button
              fullWidth
              variant="contained"
              size="small"
              disabled={isOutOfStock}
              startIcon={
                isOutOfStock ? null
                  : isInCart
                    ? <ShoppingCart sx={{ fontSize: '0.95rem !important' }} />
                    : <ShoppingCart sx={{ fontSize: '0.95rem !important' }} />
              }
              onClick={handleAddToCart}
              sx={{
                backgroundColor: isOutOfStock
                  ? '#9E9E9E'
                  : isInCart
                    ? '#3949AB'   // indigo — already in cart
                    : '#1B813E',  // green — add to cart
                color: '#FFF',
                fontWeight: 600,
                fontSize: isMobile ? '0.72rem' : '0.78rem',
                height: 34,
                borderRadius: '4px',
                textTransform: 'none',
                boxShadow: 'none',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.25s ease',
                '&:hover': {
                  backgroundColor: isOutOfStock
                    ? '#9E9E9E'
                    : isInCart
                      ? '#283593'
                      : '#146030',
                  boxShadow: 'none',
                },
                '&.Mui-disabled': { backgroundColor: '#9E9E9E', color: '#FFF' },
              }}
            >
              {isOutOfStock ? 'Out of Stock' : isInCart ? 'Go to Cart' : 'Add to Cart'}
            </Button>
          </Box>

        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;

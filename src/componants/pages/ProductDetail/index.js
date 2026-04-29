import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Rating,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Breadcrumbs,
  Link,
  Skeleton
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  FavoriteBorder,
  Share,
  LocalShipping,
  CheckCircle,
  KeyboardArrowRight,
  PlayCircleFilled,
  Close
} from '@mui/icons-material';
import { Modal, Backdrop, Fade, IconButton as MuiIconButton } from '@mui/material';
import videoSource from '../../../assets/video1.mp4';
import SEO from '../../common/SEO';
import { apiList, invokeGetApi } from '../../../services/apiServices';

// Assets
import groundnutImg from '../../../assets/ArtBoard-img-3.jpg';
import gheeImg from '../../../assets/gir-cow-ghee-1L.avif';
import coconutImg from '../../../assets/Artboard_1_copy_2_522bca11-ea72-4152-8063-ddbc6d57fdc7.webp';
import sesameImg from '../../../assets/2(1).png';
import walnutImg from '../../../assets/2(2).png';
import safflowerImg from '../../../assets/2(3).png';

const assetMap = {
  'groundnut': groundnutImg,
  'ghee': gheeImg,
  'coconut': coconutImg,
  'til': sesameImg,
  'walnut': walnutImg,
  'safflower': safflowerImg
};

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, setCartOpen } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState('1L');
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity, size);
    setCartOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => setShowStickyBar(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await invokeGetApi("/" + slug);
        setProduct(response.data);
        if (response.data.variants && response.data.variants.length > 0) {
          setSize(response.data.variants[2] || response.data.variants[0]);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const getMappedImage = (imgKey) => {
    return assetMap[imgKey] || groundnutImg;
  };

  if (loading) return (
    <Container sx={{ py: 10 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}><Skeleton variant="rectangular" height={500} /></Grid>
        <Grid item xs={12} md={6}><Skeleton variant="text" height={60} /><Skeleton variant="text" width="60%" /></Grid>
      </Grid>
    </Container>
  );

  if (!product) return <Typography>Product not found.</Typography>;

  return (
    <Box sx={{ py: 6 }}>
      {/* Sticky Buy Now Bar */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          bgcolor: '#fff',
          borderTop: '1px solid #eee',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
          px: { xs: 2, md: 4 },
          py: 1.5,
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          transition: 'transform 0.3s ease',
          transform: showStickyBar ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product?.name}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1B1F23', lineHeight: 1 }}>
            ₹{product?.price}
            {product?.oldPrice && (
              <Typography component="span" variant="caption" sx={{ textDecoration: 'line-through', color: '#999', ml: 1 }}>
                ₹{product?.oldPrice}
              </Typography>
            )}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleAddToCart}
          sx={{ borderRadius: 0, px: 3, py: 1.2, fontWeight: 700, flexShrink: 0 }}
        >
          ADD TO CART
        </Button>
      </Box>
      <SEO
        title={product.name}
        description={`${product.name} - ₹${product.price}. ${product.description?.substring(0, 130) || ''} Buy pure wood pressed oils online. Free delivery over ₹999.`}
        ogImage={getMappedImage(product.images?.[0])}
        product={{
          name: product.name,
          price: product.price,
          currency: 'INR',
          inStock: product.stockStatus !== 'Out of Stock',
        }}
      />
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="/">Home</Link>
          <Link underline="hover" color="inherit" href="/shop">Shop</Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={8}>
          {/* Left: Image Gallery */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={getMappedImage(product.images?.[selectedImage])}
                  sx={{ width: '100%', height: 'auto', backgroundColor: '#F5F5F5', mb: 2 }}
                />

                {/* Watch Process Button Overlay */}
                <Button
                  variant="contained"
                  startIcon={<PlayCircleFilled />}
                  onClick={() => setVideoOpen(true)}
                  sx={{
                    position: 'absolute',
                    bottom: 30,
                    right: 20,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    color: 'primary.main',
                    '&:hover': { bgcolor: '#FFF' },
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}
                >
                  Watch Extraction
                </Button>
              </Box>

              <Grid container spacing={2}>
                {product.images?.map((imgKey, idx) => (
                  <Grid item xs={3} key={idx}>
                    <Box
                      component="img"
                      src={getMappedImage(imgKey)}
                      onClick={() => setSelectedImage(idx)}
                      sx={{
                        width: '100%',
                        cursor: 'pointer',
                        border: selectedImage === idx ? '2px solid' : '1px solid #EEE',
                        borderColor: selectedImage === idx ? 'primary.main' : '#EEE'
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Right: Product Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>{product.name}</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">({product.reviewsCount} reviews)</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>{product.stockStatus}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 1 }}>
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700 }}>₹{product.price}</Typography>
              {product.oldPrice && (
                <Typography variant="h5" color="text.secondary" sx={{ textDecoration: 'line-through' }}>₹{product.oldPrice}</Typography>
              )}
            </Box>

            {/* Loyalty Points UI */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4, bgcolor: '#F9FAF4', p: 1.5, border: '1px dashed #B7791F' }}>
              <Box component="span" sx={{ fontSize: '1.2rem' }}>🏆</Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Earn {Math.floor(product.price / 10)} Loyalty Points with this order
              </Typography>
            </Box>

            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>SELECT SIZE</Typography>
            <ToggleButtonGroup
              value={size}
              exclusive
              onChange={(e, nextSize) => nextSize && setSize(nextSize)}
              sx={{ mb: 4 }}
            >
              {product.variants?.map((v) => (
                <ToggleButton key={v} value={v} sx={{ px: 3 }}>{v}</ToggleButton>
              ))}
            </ToggleButtonGroup>

            <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #DDD' }}>
                <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}><RemoveIcon /></IconButton>
                <Typography sx={{ px: 3 }}>{quantity}</Typography>
                <IconButton onClick={() => setQuantity(quantity + 1)}><AddIcon /></IconButton>
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ flexGrow: 1 }}
                onClick={handleAddToCart}
              >
                ADD TO CART
              </Button>
              <IconButton border="1px solid #DDD"><FavoriteBorder /></IconButton>
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <LocalShipping color="primary" />
                <Typography variant="body2">Free delivery on orders above ₹999</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <CheckCircle color="primary" />
                <Typography variant="body2">Freshly pressed every batch. 100% Pure.</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Product Details Tabs */}
        <Box sx={{ mt: 10 }}>
          <Tabs
            value={tabValue}
            onChange={(e, v) => setTabValue(v)}
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}
          >
            <Tab label="DESCRIPTION" />
            <Tab label="NUTRITION & BENEFITS" />
            <Tab label="HOW TO USE" />
          </Tabs>

          <Box sx={{ minHeight: 200 }}>
            {tabValue === 0 && (
              <Typography variant="body1" sx={{ lineHeight: 1.8, maxWidth: '800px' }}>
                {product.description || "Detailed description coming soon..."}
              </Typography>
            )}

            {tabValue === 1 && (
              <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                  <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #EEE' }}>
                    <Table size="small">
                      <TableBody>
                        {product.nutrition?.map((row) => (
                          <TableRow key={row.label}>
                            <TableCell sx={{ fontWeight: 600 }}>{row.label}</TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>KEY BENEFITS</Typography>
                  {product.benefits?.map((b, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <KeyboardArrowRight color="primary" />
                      <Typography variant="body2">{b}</Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            )}

            {tabValue === 2 && (
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                {product.howToUse}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Comparison Section Enhancement */}
        <Box sx={{ mt: 15 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 800 }}>
            Choose the Right Oil for Your Kitchen
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Understand why wood pressed oils are superior for your health.
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: 0, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            <Table>
              <TableHead sx={{ bgcolor: '#F9FAF4' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>FEATURE</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main' }}>AMRUTHA DHAREE (WOOD PRESSED)</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>REFINED OILS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { feature: 'Extraction Temp', amrutha: '< 45°C (Cold)', refined: '> 200°C (High Heat)' },
                  { feature: 'Chemical Processing', amrutha: 'Zero Chemicals', refined: 'Bleaching & Hexane used' },
                  { feature: 'Antioxidants', amrutha: '100% Retained', refined: 'Mostly Destroyed' },
                  { feature: 'Natural Flavor', amrutha: 'Authentic & Rich', refined: 'Odorless / Bland' },
                  { feature: 'Smoke Point', amrutha: 'Perfect for Traditional Cooking', refined: 'Chemically stabilized' },
                ].map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell sx={{ fontWeight: 600 }}>{row.feature}</TableCell>
                    <TableCell align="center" sx={{ color: 'primary.main', fontWeight: 600 }}>{row.amrutha}</TableCell>
                    <TableCell align="center" sx={{ opacity: 0.6 }}>{row.refined}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Verified Reviews Section Enhancement */}
        <Box sx={{ mt: 15 }}>
          <Grid container spacing={8}>
            {/* Sidebar: Overall Rating */}
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Customer Reviews</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography variant="h2" sx={{ fontWeight: 800 }}>{product.rating}</Typography>
                <Box>
                  <Rating value={product.rating} precision={0.1} readOnly sx={{ color: 'primary.main' }} />
                  <Typography variant="body2" color="text.secondary">Based on {product.reviewsCount} reviews</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Rating Bars */}
              {[5, 4, 3, 2, 1].map((star) => (
                <Box key={star} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                  <Typography variant="body2" sx={{ width: 60 }}>{star} Stars</Typography>
                  <Box sx={{ flexGrow: 1, height: 6, bgcolor: '#EEE', borderRadius: 3 }}>
                    <Box sx={{ width: star > 3 ? '85%' : '15%', height: '100%', bgcolor: 'primary.main', borderRadius: 3 }} />
                  </Box>
                  <Typography variant="body2" sx={{ width: 40, textAlign: 'right' }}>{star > 3 ? '85%' : '5'}%</Typography>
                </Box>
              ))}
            </Grid>

            {/* Main: Review List */}
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 4 }}>Featured Reviews</Typography>

              {[
                { name: "Priya S.", rating: 5, date: "April 15, 2026", comment: "The aroma of this groundnut oil reminds me of my grandmother's kitchen! So glad I finally found real wood-pressed oil online.", location: "Bengaluru" },
                { name: "Rahul M.", rating: 5, date: "March 28, 2026", comment: "Using the Extra Virgin Coconut oil for a month now. The texture is amazing and the mild coconut fragrance is very authentic.", location: "Mumbai" },
                { name: "Ananya K.", rating: 4, date: "March 10, 2026", comment: "Great quality, clear and pure. Delivery was on time. Could use slightly better seal on the cap but the oil itself is 10/10.", location: "Hyderabad" }
              ].map((rev, i) => (
                <Box key={i} sx={{ mb: 6 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 45,
                          height: 45,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700
                        }}
                      >
                        {rev.name[0]}
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 700 }}>{rev.name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CheckCircle sx={{ color: 'primary.main', fontSize: 14 }} />
                          <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>Verified Purchaser</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary">{rev.date}</Typography>
                  </Box>
                  <Rating value={rev.rating} size="small" readOnly sx={{ mb: 1 }} />
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    "{rev.comment}"
                  </Typography>
                  <Typography variant="caption" sx={{ mt: 1, display: 'block', fontWeight: 600 }}>Purchased in {rev.location}</Typography>
                  <Divider sx={{ mt: 4 }} />
                </Box>
              ))}

              <Button variant="outlined" sx={{ mt: 2 }}>View All {product.reviewsCount} Reviews</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/* Video Modal Enhancement */}
      <Modal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500, sx: { backgroundColor: 'rgba(0,0,0,0.9)' } }}
      >
        <Fade in={videoOpen}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95vw', md: '80vw' },
            maxWidth: 1000,
            bgcolor: 'black',
            boxShadow: 24,
            outline: 'none'
          }}>
            <MuiIconButton
              onClick={() => setVideoOpen(false)}
              sx={{ position: 'absolute', top: -45, right: 0, color: 'white' }}
            >
              <Close />
            </MuiIconButton>
            <video
              width="100%"
              controls
              autoPlay
              style={{ display: 'block' }}
            >
              <source src={videoSource} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ProductDetail;

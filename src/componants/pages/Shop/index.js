import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Breadcrumbs,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  Skeleton
} from '@mui/material';
import { FilterList as FilterIcon, Close as CloseIcon } from '@mui/icons-material';
import SidebarFilters from './components/SidebarFilters';
import ProductCard from '../../common/ProductCard';
import SEO from '../../common/SEO';
import { apiList, invokeGetApi } from '../../../services/apiServices';

// Assets
import groundnutImg from '../../../assets/ArtBoard-img-3.jpg';
import gheeImg from '../../../assets/gir-cow-ghee-1L.avif';
import coconutImg from '../../../assets/Artboard_1_copy_2_522bca11-ea72-4152-8063-ddbc6d57fdc7.webp';
import sesameImg from '../../../assets/2(1).png';
import walnutImg from '../../../assets/2(2).png';
import safflowerImg from '../../../assets/2(3).png';

const allDummyProducts = [
  { id: 1, name: 'Wood Pressed Groundnut Oil', price: 450, oldPrice: 520, image: groundnutImg, slug: 'groundnut-oil', rating: 4.8, category: 'oils' },
  { id: 2, name: 'Pure Gir Cow Ghee', price: 1250, oldPrice: 1500, image: gheeImg, slug: 'gir-cow-ghee', rating: 5.0, category: 'ghee' },
  { id: 3, name: 'Extra Virgin Coconut Oil', price: 650, oldPrice: 750, image: coconutImg, slug: 'virgin-coconut-oil', rating: 4.7, category: 'oils' },
  { id: 4, name: 'Traditional Black Til Oil', price: 580, oldPrice: 650, image: sesameImg, slug: 'black-til-oil', rating: 4.9, category: 'oils' },
  { id: 6, name: 'Premium Walnut Oil', price: 950, oldPrice: 1100, image: walnutImg, slug: 'walnut-oil', rating: 4.8, category: 'specialty' },
  { id: 7, name: 'Natural Safflower Oil', price: 480, oldPrice: 550, image: safflowerImg, slug: 'safflower-oil', rating: 4.7, category: 'oils' },
];

const ShopPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 2000],
    sortBy: 'relevance'
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await invokeGetApi(apiList.allProducts, {
        category: filters.category,
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1]
      });

      let finalProducts = response.data.length > 0 ? response.data : allDummyProducts;

      // Filter dummy data if needed
      if (filters.category && response.data.length === 0) {
        finalProducts = allDummyProducts.filter(p => p.category === filters.category);
      }

      setProducts(finalProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      let finalProducts = allDummyProducts;
      if (filters.category) {
        finalProducts = allDummyProducts.filter(p => p.category === filters.category);
      }
      setProducts(finalProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <Box sx={{ py: 4 }}>
      <SEO
        title={filters.category ? `${filters.category.replace('-', ' ').toUpperCase()} Shop` : "Shop All Natural Products"}
        description="Browse our wide range of organic, wood-pressed oils, gluten-free flours, and natural sweeteners. Pure health delivered at your doorstep."
      />
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="/">Home</Link>
          <Typography color="text.primary">Shop</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Desktop Sidebar */}
          {!isMobile && (
            <Grid item md={3}>
              <SidebarFilters filters={filters} setFilters={setFilters} />
            </Grid>
          )}

          {/* Product Grid Area */}
          <Grid item xs={12} md={9}>
            {isMobile ? (
              /* Premium Mobile Layout */
              <Box sx={{ mb: 6 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 4,
                    textAlign: 'center'
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 900,
                      color: 'primary.main',
                      letterSpacing: -1,
                      textTransform: 'uppercase',
                      lineHeight: 1.1
                    }}
                  >
                    {filters.category ? filters.category.replace('-', ' ').toUpperCase() : 'ALL PRODUCTS'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1.5 }}>
                    <Box sx={{ width: 40, height: 2, bgcolor: '#B7791F' }} />
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 800,
                        letterSpacing: 2,
                        textTransform: 'uppercase'
                      }}
                    >
                      {products.length} AUTHENTIC PRODUCTS
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    bgcolor: '#FFF',
                    border: '1px solid #EAEAEA',
                    borderRadius: 0,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                    overflow: 'hidden'
                  }}
                >
                  <Button
                    fullWidth
                    startIcon={<FilterIcon />}
                    onClick={handleDrawerToggle}
                    sx={{
                      flex: 1,
                      py: 2,
                      color: 'text.primary',
                      fontWeight: 700,
                      borderRadius: 0,
                      borderRight: '1px solid #EAEAEA',
                      '&:hover': { bgcolor: '#F9FAF4' },
                      fontSize: '0.8rem'
                    }}
                  >
                    FILTER
                  </Button>
                  <Box sx={{ flex: 1.2, position: 'relative' }}>
                    <Select
                      fullWidth
                      value={filters.sortBy}
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                      displayEmpty
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>
                            {selected ? selected.replace('-', ' ').toUpperCase() : 'RELEVANCE'}
                          </Typography>
                        </Box>
                      )}
                      sx={{
                        height: '100%',
                        borderRadius: 0,
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '& .MuiSelect-select': { py: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }
                      }}
                    >
                      <MenuItem value="relevance">Relevance</MenuItem>
                      <MenuItem value="price-low">Price: Low to High</MenuItem>
                      <MenuItem value="price-high">Price: High to Low</MenuItem>
                    </Select>
                  </Box>
                </Box>
              </Box>
            ) : (
              /* Original Desktop Layout */
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {filters.category ? filters.category.replace('-', ' ').toUpperCase() : 'ALL PRODUCTS'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 400, display: 'block' }}>
                    Showing {products.length} results
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <FormControl size="small" sx={{ minWidth: 170 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={filters.sortBy}
                      label="Sort By"
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    >
                      <MenuItem value="relevance">Relevance</MenuItem>
                      <MenuItem value="price-low">Price: Low to High</MenuItem>
                      <MenuItem value="price-high">Price: High to Low</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            )}

            <Grid container spacing={3}>
              {loading ? (
                [1, 2, 3, 4, 5, 6].map((n) => (
                  <Grid item xs={12} sm={6} md={4} key={n}>
                    <Skeleton variant="rectangular" height={250} />
                    <Skeleton variant="text" sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="60%" />
                  </Grid>
                ))
              ) : products.length > 0 ? (
                products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', py: 10 }}>
                    <Typography variant="h6">No products found for the selected filters.</Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="bottom"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ '& .MuiDrawer-paper': { height: '80vh', p: 3 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={handleDrawerToggle}><CloseIcon /></IconButton>
        </Box>
        <SidebarFilters filters={filters} setFilters={setFilters} mobile />
      </Drawer>
    </Box>
  );
};

export default ShopPage;

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
  { id: 1, name: 'Wood Pressed Groundnut Oil', price: 450, oldPrice: 520, image: groundnutImg, slug: 'groundnut-oil', rating: 4.8, category_id: 1 },
  { id: 2, name: 'Pure Gir Cow Ghee', price: 1250, oldPrice: 1500, image: gheeImg, slug: 'gir-cow-ghee', rating: 5.0, category_id: 1 },
  { id: 3, name: 'Extra Virgin Coconut Oil', price: 650, oldPrice: 750, image: coconutImg, slug: 'virgin-coconut-oil', rating: 4.7, category_id: 1 },
  { id: 4, name: 'Organic Turmeric Powder', price: 180, oldPrice: 220, image: sesameImg, slug: 'turmeric-powder', rating: 4.9, category_id: 2 },
  { id: 5, name: 'Natural Jaggery Blocks', price: 120, oldPrice: 150, image: coconutImg, slug: 'natural-jaggery', rating: 4.8, category_id: 3 },
  { id: 6, name: 'Gluten Free Bajra Flour', price: 95, oldPrice: 120, image: walnutImg, slug: 'bajra-flour', rating: 4.8, category_id: 4 },
  { id: 7, name: 'Pink Himalayan Salt', price: 80, oldPrice: 100, image: safflowerImg, slug: 'rock-salt', rating: 4.7, category_id: 5 },
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
    volumes: [],
    sortBy: 'relevance'
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await invokeGetApi(apiList.getAllProducts);

      let allFetched = [];
      if (response?.data?.products && Array.isArray(response.data.products)) {
        allFetched = response.data.products;
      } else if (Array.isArray(response?.data)) {
        allFetched = response.data;
      }

      // Apply client-side filters
      let filtered = allFetched.length > 0 ? allFetched : allDummyProducts;
      if (filters.category) {
        filtered = filtered.filter(p =>
          p.category === filters.category ||
          Number(p.category_id) === Number(filters.category)
        );
      }
      if (filters.priceRange) {
        filtered = filtered.filter(p => Number(p.price) >= filters.priceRange[0] && Number(p.price) <= filters.priceRange[1]);
      }
      if (filters.volumes && filters.volumes.length > 0) {
        filtered = filtered.filter(p => {
          const pVolumes = [];
          if (p.weight) pVolumes.push(p.weight.toLowerCase());
          if (p.variants) {
            try {
              const vars = typeof p.variants === 'string' ? JSON.parse(p.variants) : p.variants;
              vars.forEach(v => pVolumes.push(v.size.toLowerCase()));
            } catch (e) { }
          }
          return filters.volumes.some(v => pVolumes.includes(v.toLowerCase()));
        });
      }
      if (filters.sortBy === 'price-low') filtered = [...filtered].sort((a, b) => Number(a.price) - Number(b.price));
      if (filters.sortBy === 'price-high') filtered = [...filtered].sort((a, b) => Number(b.price) - Number(a.price));

      setProducts(filtered);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts(allDummyProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const categoryLabels = {
    1: 'Cold Pressed Oils',
    2: 'Spices & Powders',
    3: 'Jaggery & Sweeteners',
    4: 'Healthy Flours',
    5: 'Rock Salt'
  };

  const currentCategoryLabel = filters.category 
    ? (categoryLabels[filters.category] || String(filters.category).replace('-', ' ').toUpperCase())
    : 'ALL PRODUCTS';

  return (
    <Box sx={{ py: 4 }}>
      <SEO
        title={filters.category ? `${currentCategoryLabel} Shop` : "Shop All Natural Products"}
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
                    {currentCategoryLabel}
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
                    {currentCategoryLabel}
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

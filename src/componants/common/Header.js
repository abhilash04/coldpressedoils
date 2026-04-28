import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  useScrollTrigger,
  Slide,
  Menu,
  MenuItem,
  Fade,
  Paper,
  ClickAwayListener,
  Grid,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  FavoriteBorder as FavoriteIcon,
  ShoppingBagOutlined as CartIcon,
  PersonOutline as AccountIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import logo from '../../assets/amruthadharee_logo.png';

// Assets for Mega Menu
import groundnutImg from '../../assets/ArtBoard-img-3.jpg';
import gheeImg from '../../assets/gir-cow-ghee-1L.avif';
import coconutImg from '../../assets/Artboard_1_copy_2_522bca11-ea72-4152-8063-ddbc6d57fdc7.webp';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopAnchor, setShopAnchor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user } = useUser();

  const handleShopClick = (event) => setShopAnchor(event.currentTarget);
  const handleShopClose = () => setShopAnchor(null);

  const shopCategories = [
    { label: 'Cold Pressed Oils', path: '/shop' },
    { label: 'Traditional Ghee', path: '/shop' },
    { label: 'Organic Flours', path: '/shop' },
    { label: 'Natural Sweeteners', path: '/shop' },
  ];

  const allProducts = [
    { id: 1, name: 'Cold Pressed Groundnut Oil', price: 450, path: '/product/groundnut-oil' },
    { id: 2, name: 'Wooden Pressed Coconut Oil', price: 650, path: '/product/coconut-oil' },
  ];

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      const filtered = allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${searchQuery}`);
      setShowSuggestions(false);
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Our Oils', path: '/our-oils' },
    { label: 'Shop', path: '/shop' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  const renderShopMenu = (
    <Menu
      anchorEl={shopAnchor}
      open={Boolean(shopAnchor)}
      onClose={handleShopClose}
      TransitionComponent={Fade}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: 900,
          mt: { md: 2 },
          p: 3,
          borderRadius: 0,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}>COLD PRESSED OILS</Typography>
          <Box sx={{ position: 'relative', overflow: 'hidden', height: 120, mb: 1, backgroundColor: '#F5F5F5' }}>
            <Box component="img" src={groundnutImg} sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </Box>
          <List dense sx={{ p: 0 }}>
            <ListItem button onClick={handleShopClose} component={Link} to="/shop"><ListItemText primary="Groundnut Oil" /></ListItem>
            <ListItem button onClick={handleShopClose} component={Link} to="/shop"><ListItemText primary="Coconut Oil" /></ListItem>
            <ListItem button onClick={handleShopClose} component={Link} to="/shop"><ListItemText primary="Mustard Oil" /></ListItem>
          </List>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}>TRADITIONAL GHEE</Typography>
          <Box sx={{ position: 'relative', overflow: 'hidden', height: 120, mb: 1, backgroundColor: '#F5F5F5' }}>
            <Box component="img" src={gheeImg} sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </Box>
          <List dense sx={{ p: 0 }}>
            <ListItem button onClick={handleShopClose} component={Link} to="/shop"><ListItemText primary="A2 Gir Cow Ghee" /></ListItem>
            <ListItem button onClick={handleShopClose} component={Link} to="/shop"><ListItemText primary="Traditional Bilona" /></ListItem>
          </List>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}>WHOLESOME GOODS</Typography>
          <Box sx={{ position: 'relative', overflow: 'hidden', height: 120, mb: 1, backgroundColor: '#F5F5F5' }}>
            <Box component="img" src={coconutImg} sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </Box>
          <List dense sx={{ p: 0 }}>
            <ListItem button onClick={handleShopClose} component={Link} to="/shop"><ListItemText primary="Gluten Free Flour" /></ListItem>
            <ListItem button onClick={handleShopClose} component={Link} to="/shop"><ListItemText primary="Natural Sweeteners" /></ListItem>
          </List>
        </Grid>
      </Grid>
    </Menu>
  );

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main', fontWeight: 700 }}>AMRUTHA DHAREE</Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItem sx={{ textAlign: 'center' }} button component={Link} to={item.path} onClick={handleDrawerToggle}>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItem>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #EAEAEA' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }}>
              <MenuIcon />
            </IconButton>

            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component="img" src={logo} alt="Amrutha Dharee" sx={{ height: { xs: 45, md: 70 }, width: 'auto' }} />
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={item.label === 'Shop' ? handleShopClick : () => navigate(item.path)}
                  sx={{ color: 'text.primary', fontWeight: 600, '&:hover': { color: 'primary.main' } }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box sx={{ position: 'relative', display: { xs: 'none', lg: 'block' } }}>
                <ClickAwayListener onClickAway={() => setShowSuggestions(false)}>
                  <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F5F5F5', px: 2 }}>
                    <input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyPress={handleSearchSubmit}
                      style={{ border: 'none', background: 'transparent', padding: '10px', width: '150px', outline: 'none' }}
                    />
                    <SearchIcon fontSize="small" color="action" />
                  </Box>
                </ClickAwayListener>
              </Box>
              <IconButton color="inherit" onClick={() => navigate('/cart')}>
                <Badge badgeContent={totalItems} color="secondary">
                  <CartIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit" onClick={() => navigate(user ? '/account' : '/login')}>
                <AccountIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderShopMenu}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: 280 } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;

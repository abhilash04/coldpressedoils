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
  ListItemIcon,
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
  useMediaQuery,
  useTheme
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  FavoriteBorder as FavoriteIcon,
  ShoppingBagOutlined as CartIcon,
  PersonOutline as AccountIcon,
  Home as HomeIcon,
  Opacity as OilIcon,
  Storefront as ShopIcon,
  Article as BlogIcon,
  Message as ContactIcon
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
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { totalItems } = useCart();
  const { user } = useUser();



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
    { label: 'Home', path: '/', icon: <HomeIcon fontSize="small" /> },
    { label: 'Our Oils', path: '/our-oils', icon: <OilIcon fontSize="small" /> },
    { label: 'Shop', path: '/shop', icon: <ShopIcon fontSize="small" /> },
    // { label: 'Blog', path: '/blog', icon: <BlogIcon fontSize="small" /> },
    { label: 'Contact', path: '/contact', icon: <ContactIcon fontSize="small" /> },
  ];



  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box sx={{ p: isMobile ? 1 : 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: isMobile ? 1 : 2, px: 1 }}>
        <Box component="img" src={logo} alt="Amrutha Dharee" sx={{ height: "60px", width: "auto" }} />
        <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: 0.5, lineHeight: 1.2 }}>
          AMRUTHA <br />DHAREE
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItem
              button
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                textAlign: 'left',
                py: 1.5,
                px: 2,
                borderRadius: '8px',
                mb: 0.5,
                '&:hover': { bgcolor: '#F9FAF4', color: 'primary.main' }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary' }}
              />
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ display: { md: 'none' }, mr: isMobile ? 0 : 0.5 }}>
                <MenuIcon />
              </IconButton>

              <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', py: isMobile ? 1 : 1 }}>
                <Box component="img" src={logo} alt="Amrutha Dharee" sx={{ height: isMobile ? "55px" : "90px", width: "auto" }} />
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    '&:hover': { color: 'primary.main' },
                    textTransform: 'capitalize'
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box sx={{ position: 'relative', display: { xs: 'none', lg: 'block' }, mt: 1 }}>
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
                  <CartIcon sx={{ fontSize: 30 }} />
                </Badge>
              </IconButton>
              <IconButton color="inherit" onClick={() => navigate(user ? '/account' : '/login')}>
                <AccountIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: 240 } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;

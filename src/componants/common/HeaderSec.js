import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Badge,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import logo from "../../assets/organicoils imgs/logo1.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Import custom icons
import RedeemIcon from "@mui/icons-material/Redeem";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useNavigate } from "react-router-dom";
import CartDrawer from "../pages/CartDrawer";
import { useCookies } from "react-cookie";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { CloseRounded, Search } from "@mui/icons-material";

//Search Images
import search_img_1 from "../../assets/search-img-1.png";
import search_img_2 from "../../assets/search-img-2.png";
import search_img_3 from "../../assets/search-img-3.png";
import search_img_4 from "../../assets/search-img-4.png";
import search_img_5 from "../../assets/search-img-5.png";

const menuItems = [
  {
    label: "Shop",
    icon: <AllInclusiveIcon sx={{ color: "#c4a857ff" }} />,
    path: "/collections/all-products",
  },
  {
    label: "Gau Seva Offline",
    icon: <FavoriteIcon sx={{ color: "#c4a857ff" }} />,
  },
  { label: "Farm Training", icon: <RedeemIcon sx={{ color: "#c4a857ff" }} /> },
  {
    label: "Blogs",
    icon: <ArticleOutlinedIcon sx={{ color: "#c4a857ff" }} />,
  },
  {
    label: "Booking ",
    icon: <EmojiFoodBeverageIcon sx={{ color: "#c4a857ff" }} />,
    hasArrow: true,
  },
];

const suggestions = [
  "Sesame Oil",
  "Sunflower oil",
  "coconut oil",
  "groundnut oil",
  "mustard oil",
];
const products = [
  {
    title: "Wood-Pressed Black Mustard Oil",
    price: 2468,
    oldPrice: 2598,
    image: search_img_1,
    rating: 5,
  },
  {
    title: "Wood-Pressed Groundnut Oil",
    price: 2896,
    oldPrice: 3048,
    image: search_img_2,
    rating: 5,
  },
  {
    title: "Wood-Pressed Black Sesame Oil",
    price: 713,
    oldPrice: 750,
    image: search_img_3,
    rating: 5,
  },
];
const blogs = [
  { title: "Oil Pulling with Coconut Oil", image: search_img_4 },
  { title: "Is Coconut Oil Healthy?", image: search_img_5 },
];

const HeaderSec = ({ cartItems, onCartUpdate }) => {
  const theme = useTheme();
  const [cookies, setCookie, removeCookie] = useCookies(["org_user"]);
  const isLoggedIn = cookies["org_user"]?.token;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openBookingMenu = Boolean(anchorEl);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const isAccountMenuOpen = Boolean(accountAnchorEl);

  const handleOpenCartDrawer = () => {
    setOpenCart(true);
  };

  const handleCloseCartDrawer = () => {
    setOpenCart(false);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountAnchorEl(null);
  };

  const handleBookingClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBookingClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClick = (path) => {
    navigate(path);
    handleBookingClose();
  };
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      {searchBarOpen ? (
        <Box
          component="header"
          sx={{
            position: "relative",
            backgroundColor: "#fff",
            boxShadow: 1,
            width: "100%",
            py: 0.5,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "56px",
              position: "relative",
            }}
          >
            {/* Search Box Wrapper */}
            <Box
              sx={{
                width: { xs: "100%", sm: "60%", md: "42%" },
                position: "relative",
              }}
            >
              <TextField
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products, blogs..."
                size="small"
                InputProps={{
                  endAdornment: <Search sx={{ color: "grey.500" }} />,
                }}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  boxShadow: 1,
                }}
              />

              {/* Dropdown */}
              {searchTerm && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "44px", // aligns exactly below the input
                    left: 0,
                    width: "95%",
                    backgroundColor: "#fff",
                    boxShadow: 3,
                    borderRadius: "4px",
                    p: 2,
                    maxHeight: "80vh",
                    overflowY: "auto",
                    zIndex: 9999,
                  }}
                >
                  {/* Suggestions */}
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Suggestions
                  </Typography>
                  <Box
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}
                  >
                    {suggestions.map((s, i) => (
                      <Chip key={i} label={s} size="small" clickable />
                    ))}
                  </Box>

                  {/* Products */}
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Products
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    {products.map((p, i) => (
                      <Grid item xs={12} sm={4} key={i}>
                        <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                          <CardMedia>
                            <img
                              src={p.image}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                              }}
                              alt={p.title}
                            />
                          </CardMedia>
                          <CardContent sx={{ p: 1 }}>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500 }}
                            >
                              {p.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <s>₹{p.oldPrice}</s> <b>₹{p.price}</b>
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  <Divider sx={{ my: 1 }} />

                  {/* Blogs */}
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Blogs
                  </Typography>
                  <Grid container spacing={2}>
                    {blogs.map((b, i) => (
                      <Grid item xs={12} sm={6} key={i}>
                        <Card
                          sx={{
                            display: "flex",
                            borderRadius: 2,
                            boxShadow: 1,
                          }}
                        >
                          <CardMedia>
                            <img
                              src={b.image}
                              style={{
                                width: 80,
                                height: "100%",
                                objectFit: "cover",
                                borderTopLeftRadius: 8,
                                borderBottomLeftRadius: 8,
                              }}
                              alt={b.title}
                            />
                          </CardMedia>
                          <CardContent sx={{ p: 1 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {b.title}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
            {/* Close Button */}
            <IconButton
              onClick={() => setSearchBarOpen(false)}
              sx={{ left: 1 }}
            >
              <CloseRounded />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box
          component="header"
          sx={{
            position: "static",
            backgroundColor: "transparent",
            boxShadow: theme.shadows[1],
            width: "100%",
            py: 0.5,
          }}
        >
          <Container maxWidth="xl">
            <Grid container alignItems="center" justifyContent="space-between">
              {isMobile ? (
                <>
                  {/* Mobile View Header */}
                  <Grid item xs={12}>
                    <Grid
                      container
                      alignItems="center"
                      spacing={0.5}
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <IconButton
                          onClick={toggleDrawer(true)}
                          sx={{ color: "#000" }}
                        >
                          <MenuIcon />
                        </IconButton>
                      </Grid>

                      <Grid item xs sx={{ textAlign: "center" }}>
                        <Box
                          component="img"
                          src={logo}
                          alt="anveshan"
                          sx={{ height: 40 }}
                        />
                      </Grid>

                      <Grid item>
                        <Grid container alignItems="center">
                          <Grid item>
                            <IconButton>
                              <SearchIcon sx={{ color: "#c4a857ff" }} />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <IconButton>
                              <AccountCircleIcon sx={{ color: "#c4a857ff" }} />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <IconButton>
                              <ShoppingCartOutlinedIcon
                                sx={{ color: "#c4a857ff" }}
                              />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Custom Mobile Drawer */}
                  <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                  >
                    <Box sx={{ width: 300 }}>
                      {/* Top Drawer Header */}
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        p={2}
                        sx={{ borderBottom: "1px solid #ddd" }}
                      >
                        <Grid item>
                          <IconButton onClick={toggleDrawer(false)}>
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <Box
                            component="img"
                            src={logo}
                            alt="anveshan"
                            sx={{ height: 30 }}
                          />
                        </Grid>
                        <Grid item></Grid>
                      </Grid>

                      {/* Drawer Menu List */}
                      <List>
                        {menuItems.map((item, index) => (
                          <ListItem
                            button
                            key={index}
                            sx={{ px: 3 }}
                            onClick={() => item.path && navigate(item.path)}
                          >
                            {item.icon}
                            <ListItemText
                              primary={item.label}
                              sx={{ ml: 2 }}
                              primaryTypographyProps={{
                                fontSize: 16,
                                fontWeight: 400,
                              }}
                            />
                            {item.hasArrow && (
                              <ArrowForwardIosIcon
                                sx={{ fontSize: 14, color: "#999" }}
                              />
                            )}
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Drawer>
                </>
              ) : (
                <>
                  {/* Desktop View */}
                  <Grid item>
                    <Box
                      component="img"
                      src={logo}
                      alt="anveshan"
                      sx={{ height: "80px", cursor: "pointer", width: "100%", borderRadius: '5px' }}
                      onClick={() => navigate("/")}
                    />
                  </Grid>

                  <Grid item>
                    <Grid container spacing={4}>
                      {menuItems.map((item) => (
                        <Grid item key={item.label}>
                          {item.label === "Booking " ? (
                            <>
                              <Box
                                onClick={handleBookingClick}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: 16,
                                    color: "rgb(34, 34, 34)",
                                    fontWeight: 600,
                                    fontFamily: "inherit",
                                    mr: 0.5,
                                  }}
                                >
                                  {item.label}
                                </Typography>
                                <ArrowDropDownIcon
                                  sx={{
                                    fontSize: 26,
                                    color: "rgb(34, 34, 34)",
                                  }}
                                />
                              </Box>

                              <Menu
                                anchorEl={anchorEl}
                                open={openBookingMenu}
                                onClose={handleBookingClose}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "left",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                              >
                                <MenuItem
                                  onClick={() =>
                                    handleSubMenuClick("/gau-pooja")
                                  }
                                >
                                  Gau Pooja
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    handleSubMenuClick("/yagyas-homas")
                                  }
                                >
                                  Yagyas & Homas
                                </MenuItem>
                              </Menu>
                            </>
                          ) : (
                            <Typography
                              sx={{
                                fontSize: 16,
                                color: "rgb(34, 34, 34)",
                                cursor: "pointer",
                                fontWeight: 600,
                                fontFamily: "inherit",
                              }}
                              onClick={() => item.path && navigate(item.path)}
                            >
                              {item.label}
                            </Typography>
                          )}
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container spacing={0.5} alignItems="center">
                      <Grid item>
                        <IconButton onClick={() => setSearchBarOpen(true)}>
                          <SearchIcon
                            sx={{ color: "#c4a857ff", fontSize: "30px" }}
                          />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={handleAccountMenuOpen}>
                          <AccountCircleIcon
                            sx={{ color: "#c4a857ff", fontSize: "30px" }}
                          />
                        </IconButton>
                        <Menu
                          anchorEl={accountAnchorEl}
                          open={isAccountMenuOpen}
                          onClose={handleAccountMenuClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          PaperProps={{
                            sx: {
                              mt: 1,
                              borderRadius: 2,
                              minWidth: 180,
                              boxShadow: 3,
                            },
                          }}
                        >
                          {isLoggedIn ? (
                            <>
                              <MenuItem
                                onClick={() => {
                                  handleAccountMenuClose();
                                  navigate("/account");
                                }}
                              >
                                <AccountCircleIcon
                                  sx={{
                                    mr: 1,
                                    fontSize: 20,
                                    color: "#c4a857ff",
                                  }}
                                />
                                Profile
                              </MenuItem>

                              <Divider />

                              <MenuItem
                                onClick={() => {
                                  removeCookie("org_user");
                                  handleAccountMenuClose();
                                  navigate("/");
                                }}
                              >
                                <LogoutIcon
                                  sx={{ mr: 1, fontSize: 20, color: "#d32f2f" }}
                                />
                                Logout
                              </MenuItem>
                            </>
                          ) : (
                            <>
                              <MenuItem
                                onClick={() => {
                                  navigate("/login");
                                  handleAccountMenuClose();
                                }}
                              >
                                <LoginIcon
                                  sx={{
                                    mr: 1,
                                    fontSize: 20,
                                    color: "#c4a857ff",
                                  }}
                                />
                                Login
                              </MenuItem>

                              <MenuItem
                                onClick={() => {
                                  navigate("/register");
                                  handleAccountMenuClose();
                                }}
                              >
                                <PersonAddAltIcon
                                  sx={{
                                    mr: 1,
                                    fontSize: 20,
                                    color: "#c4a857ff",
                                  }}
                                />
                                Signup
                              </MenuItem>
                            </>
                          )}
                        </Menu>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={handleOpenCartDrawer}>
                          <Badge
                            badgeContent={
                              cartItems?.reduce(
                                (sum, item) => sum + item.quantity,
                                0
                              ) || 0
                            }
                            color="error" // Red color
                            overlap="circular"
                            sx={{
                              "& .MuiBadge-badge": {
                                fontSize: "0.7rem",
                                height: 18,
                                minWidth: 18,
                                padding: "0 6px",
                              },
                            }}
                          >
                            <ShoppingCartOutlinedIcon
                              sx={{ color: "#c4a857ff", fontSize: "30px" }}
                            />
                          </Badge>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </Container>
          <CartDrawer
            open={openCart}
            onClose={handleCloseCartDrawer}
            cartItems={cartItems}
            onCartUpdate={onCartUpdate}
          />
        </Box>
      )}
    </>
  );
};

export default HeaderSec;

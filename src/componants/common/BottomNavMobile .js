import React from "react";
import { Box, Typography, Badge, useMediaQuery, useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useNavigate } from "react-router-dom";

const BottomNavMobile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  if (!isMobile) return null;

  const navItems = [
    {
      label: "Home",
      icon: <HomeIcon fontSize="medium" sx={{ color: "#004D40" }} />,
      path: "/",
    },
    {
      label: "All",
      icon: (
        <img
          src="/assets/all-icon.png" // Replace with your own "All" icon path
          alt="All"
          style={{ width: 24, height: 24 }}
        />
      ),
      path: "/collections/all-products?category=All",
    },
    {
      label: "Combo-Deal",
      icon: <LocalOfferIcon fontSize="medium" sx={{ color: "#444" }} />,
      path: "/combo-deals",
    },
    {
      label: "Cart",
      icon: (
        <Badge badgeContent={1} color="warning" sx={{ "& .MuiBadge-badge": { fontSize: "0.7rem" } }}>
          <ShoppingCartIcon fontSize="medium" sx={{ color: "#222" }} />
        </Badge>
      ),
      path: "/cart",
    },
    {
      label: "More",
      icon: <MenuIcon fontSize="medium" sx={{ color: "#222" }} />,
      path: "/more",
    },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        bgcolor: "#fff",
        borderTop: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: 64,
        boxShadow: "0px -1px 5px rgba(0,0,0,0.1)",
      }}
    >
      {navItems.map((item, idx) => (
        <Box
          key={idx}
          onClick={() => navigate(item.path)}
          sx={{
            textAlign: "center",
            minWidth: 60,
            cursor: "pointer",
            "&:hover": { opacity: 0.8 },
          }}
        >
          {item.icon}
          <Typography
            variant="caption"
            sx={{
              fontSize: "12px",
              mt: 0.5,
              display: "block",
              color: "#333",
            }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default BottomNavMobile;

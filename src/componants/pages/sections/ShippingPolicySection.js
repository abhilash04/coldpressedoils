import React from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import bgImage from "../../../assets/breadcrumb-bg.webp";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const ShippingPolicySection = () => {
      const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <Box
      component="main"
      sx={{ backgroundColor: "#f5f5f5" }}
      className="innerpage-bg"
    >
      {/* Page Title & Breadcrumbs */}
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography
              sx={{ fontSize: "35px", fontWeight: 600, color: "#27272f " }}
            >
              Shipping Policy
            </Typography>
          </Box>

          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ justifyContent: "center", display: "flex" }}
          >
            <Link
              href="/"
              sx={{ display: "flex", alignItems: "center",color:'#c24300',fontSize:'24px' }}
            >
              Home
            </Link>
            <Typography sx={{color:'#00584b',fontSize:'24px'}}>Shipping Policy:</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Content Section */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              backgroundColor: "#f5f7ef",
              p: 4,
              borderRadius: 1,
              boxShadow: 1,
              color:' #6a6a6dff'
            }}
          >
            <Typography paragraph>
              Free Shipping across Bangalore and Hyderabad on Order above ₹ 899 /-
            </Typography>

            <Typography paragraph>
              Items will be shipped within 24 hours and delivery will take up to days depending on the delivery address.
            </Typography>

            <Typography paragraph>
             Our Customer Care service informs you same at the earliest.
            </Typography>

            <Typography paragraph>
              We reserve the right to cancel an order within 24 hours from the time of order
            </Typography>

            <Typography paragraph>
              We ship all over India
            </Typography>

          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ShippingPolicySection;

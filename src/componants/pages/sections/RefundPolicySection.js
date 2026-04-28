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
const RefundPolicySection = () => {
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
              Refund & Return Policy
            </Typography>
          </Box>

          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ justifyContent: "center", display: "flex" }}
          >
            <Link
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#c24300",
                fontSize: "24px",
              }}
            >
              Home
            </Link>
            <Typography sx={{ color: "#00584b", fontSize: "24px" }}>
              Refund & Return Policy:
            </Typography>
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
              color: "#6a6a6dff",
            }}
          >
            <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
              Refund Policy
            </Typography>

            <Typography paragraph>Refunds and Returns</Typography>

            <Typography paragraph>
              We refund or accept returns based on the criteria below:
            </Typography>

            <Typography paragraph>
              <strong>Incorrect or Damaged Products:</strong> If you receive
              products that are incorrect, damaged, or defective, you must
              notify us within 24hrs of receiving the order. We may request
              photographic evidence to assess the issue.
            </Typography>

            <Typography paragraph>
              <strong>Quality Concerns:</strong> In the unlikely event that you
              believe the product quality does not meet our stated standards,
              you must contact us within 24hrs of receiving the order. We may
              require detailed information about the issue, including photos.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
              Non-Refundable Food Products
            </Typography>

            <Typography paragraph>
              Given the nature of food products, which are prone to
              contamination and quality degradation after the seal is broken, we
              generally do not accept returns on food items. This policy is in
              place to ensure the safety and satisfaction of our customers.
              However, we do offer refunds under certain circumstances, subject
              to the criteria.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
              Exchange Policy
            </Typography>

            <Typography paragraph>
              Exchanges/Returns are only allowed in the following unlikely
              cases:
            </Typography>

            <List dense sx={{ pl: 2 }}>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="The product is damaged or if you received the wrong item." />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="The product is not sealed properly at the time of delivery." />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="The product has expired by the time of delivery." />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="No exchange allowed other than above conditions." />
              </ListItem>
            </List>

            <Typography variant="h5" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
              Return Process
            </Typography>

            <List dense sx={{ pl: 2 }}>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="Contact our customer support team within 24hrs, with details of the issue, including your order number and product information." />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="Our customer support team will assess your request and may request additional information or photographs to better understand the issue." />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="If your return request is approved, we will provide you with instructions for returning the product." />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="Pack the product securely in its original packaging and include all accessories, if applicable." />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="Ship the product back to the address provided by our customer support team." />
              </ListItem>
            </List>

            <Typography variant="h5" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
              Cancellation Policy
            </Typography>

            <Typography paragraph>
              No cancellation allowed once order is placed. However, contact our
              Customer Care service and explain the situation. If it's approved,
              we will initiate a refund for the same or adjust the amount in
              your next order.
            </Typography>

            <Typography paragraph>
              We reserve all rights to cancel the order or particular products.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>
              Refund Process
            </Typography>

            <Typography paragraph>
              Once we receive and inspect the returned product, we will notify
              you about the status of your refund. If your refund is approved,
              the funds will be credited to your original payment method within
              7 to 15 days, depending on your bank's processing time.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default RefundPolicySection;

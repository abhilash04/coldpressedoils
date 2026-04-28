import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import HeaderSec from "../common/HeaderSec";
import Footer from "../common/Footer";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import bgImage from "../../assets/breadcrumb-bg.webp";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// Replace with your actual image path
import ownerImg from "../../assets/missed logo.png";
import { Link } from "react-router-dom";

const points = [
  "Committed to promoting sustainable and organica oils helps healthier living.",
  "Partnered with local farmers to ensure fresh, pesticide-free produce delivered directly to you.",
  "Over 10 years of experience advocating for chemical-free food and a toxin-free lifestyle.",
  "Organizing workshops and seminars to educate communities on the benefits of organica products.",
  "Certified organica products that meet global standards of quality and authenticity.",
  "Actively involved in environmental conservation projects to protect biodiversity.",
  "Proud to have served thousands of families seeking cleaner, greener choices.",
  "Continuous innovation in organica farming techniques to enhance soil and crop health.",
  "Building a community that supports wellness through natural and sustainable means.",
];

const AboutUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load cart from session storage on initial render
  React.useEffect(() => {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);
  return (
    <>
      <Header />
      <HeaderSec  cartItems={cartItems} onCartUpdate={(updatedCart)=>setCartItems(updatedCart)}/>

      <Box sx={{ backgroundColor: "#fff", py: 3 }}>
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
                About Us
              </Typography>
            </Box>

            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ justifyContent: "center", display: "flex" }}
            >
              <Link
                href="/"
                component="a"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#c24300",
                  fontSize: "24px",
                  textDecoration: "none", // optional: removes underline
                }}
              >
                Home
              </Link>
              <Typography sx={{ color: "#00584b", fontSize: "24px" }}>
                About Us:
              </Typography>
            </Breadcrumbs>
          </Container>
        </Box>
        <Container>
          <Grid container spacing={6} alignItems="center">
            {/* Left Image */}
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src={ownerImg}
                alt="About Us"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  maxHeight: isMobile ? "400px" : "600px",
                  objectFit: "cover",
                }}
              />
            </Grid>

            {/* Right Text Section */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  textAlign: isMobile ? "center" : "left",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    background: "linear-gradient(90deg, #00584b, #02221dff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: "28px", sm: "34px", md: "40px" },
                    mb: 3,
                    lineHeight: 1.2,
                  }}
                >
                  About Us
                </Typography>

                <Typography
                  sx={{
                    color: "#717173",
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: 400,
                    lineHeight: "32px",
                    mb: 4,
                  }}
                >
                  Organica Oils is dedicated to bringing you the purest,
                  freshest, and healthiest organic products. We believe in
                  nurturing the earth to nurture yourself, offering you products
                  that are good for you and the planet. Join our community to
                  embrace a cleaner, greener, and more sustainable lifestyle.
                </Typography>

                <Paper
                  elevation={3}
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    mb: 4,
                    p: 3,
                    backgroundColor: "#ffffff",
                    borderRadius: 2,
                    borderLeft: isMobile ? "none" : "4px solid #00584b",
                    boxShadow: "0 4px 20px rgba(46, 125, 50, 0.1)",
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "24px", md: "28px" },
                      color: "#00584b",
                      mb: 1,
                    }}
                  >
                    Organica Oils
                  </Typography>

                  <Typography
                    sx={{
                      color: "#555",
                      fontSize: { xs: "16px", md: "17px" },
                      fontWeight: 500,
                      lineHeight: "28px",
                      mb: 1,
                    }}
                  >
                    Your Partner in Organic Living | Sustainability Advocate
                  </Typography>
                  <Typography
                    sx={{
                      color: "#388e3c",
                      fontSize: { xs: "15px", md: "16px" },
                      fontWeight: 600,
                      lineHeight: "26px",
                      fontStyle: "italic",
                    }}
                  >
                    Certified Organica Oil & Eco-Friendly Since 2012
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Why Choose Us Section */}
        <Box sx={{ backgroundColor: "#f9f9f9", py: 8 }}>
          <Container>
            <Box
              sx={{
                textAlign: "center",
                mb: 6,
                px: isMobile ? 2 : 0,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(90deg, #00584b, #02221dff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                  fontSize: { xs: "28px", sm: "34px", md: "40px" },
                  position: "relative",
                  display: "inline-block",
                }}
              >
                Why Choose Us
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#666",
                  maxWidth: 700,
                  mx: "auto",
                  fontSize: { xs: "16px", md: "18px" },
                  mt: 3,
                  lineHeight: "32px",
                }}
              >
                Take Your Yoga to the Next Level with Guruji's Experience,
                Sadhana & Participations
              </Typography>
            </Box>

            <Card
              elevation={0}
              sx={{
                maxWidth: 1000,
                mx: "auto",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                backgroundColor: "#ffffff",
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: "1px solid rgba(0, 94, 176, 0.2)",
              }}
            >
              <CardContent>
                <Stack spacing={3}>
                  {points.map((point, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        p: 2,
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(0, 94, 176, 0.05)",
                          transform: "translateX(5px)",
                        },
                      }}
                    >
                      <CheckCircleIcon
                        sx={{
                          fontSize: 28,
                          color: "#00584b",
                          mr: 2,
                          mt: "2px",
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#555",
                          fontSize: { xs: "15px", sm: "16px" },
                          lineHeight: "28px",
                        }}
                      >
                        {point}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default AboutUs;

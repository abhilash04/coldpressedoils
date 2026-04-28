import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Link,
  IconButton,
  Card,
  CardContent,
  Typography,
  Paper,
  Breadcrumbs,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Header from "../common/Header";
import HeaderSec from "../common/HeaderSec";
import Footer from "../common/Footer";
import bgImage from "../../assets/breadcrumb-bg.webp";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [cartItems, setCartItems] = useState([]);

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
              Contact Us:
            </Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Grid container spacing={4}>
          {/* Left Column - Contact Info */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: "#00584b",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: "60px",
                  height: "4px",
                  backgroundColor: "#00584b",
                  bottom: "-10px",
                  left: 0,
                  borderRadius: "2px",
                },
              }}
            >
              Get in touch with us
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#555",
                mb: 4,
                lineHeight: 1.8,
                fontSize: "1.1rem",
              }}
            >
              We're here to support your journey to better health and
              well-being. Reach out today to ask questions or schedule a
              consultation.
            </Typography>

            {/* Contact Cards */}
            <Grid container spacing={2} alignItems="stretch">
              {" "}
              {/* Added alignItems="stretch" */}
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    p: 3,
                    boxShadow: "0 4px 20px rgba(0, 94, 176, 0.1)",
                    borderLeft: "4px solid #00584b",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        backgroundColor: "#e0f7ff",
                        color: "#00584b",
                        borderRadius: "50%",
                        p: 1.5,
                        mr: 2,
                      }}
                    >
                      <PhoneIcon />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Contact Us
                    </Typography>
                  </Box>
                  <Typography>+91 79754 68634</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    p: 3,
                    boxShadow: "0 4px 20px rgba(0, 94, 176, 0.1)",
                    borderLeft: "4px solid #00584b",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        backgroundColor: "#e0f7ff",
                        color: "#00584b",
                        borderRadius: "50%",
                        p: 1.5,
                        mr: 2,
                      }}
                    >
                      <EmailIcon />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Email Us
                    </Typography>
                  </Box>
                  <Typography>comebackorganic@gmail.com</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    height: 130,
                    p: 3,
                    boxShadow: "0 4px 20px rgba(0, 94, 176, 0.1)",
                    borderLeft: "4px solid #00584b",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        backgroundColor: "#e0f7ff",
                        color: "#00584b",
                        borderRadius: "50%",
                        p: 1.5,
                        mr: 2,
                      }}
                    >
                      <LocationOnIcon />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Location
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    26, 2nd Main Rd, Kodichikknahalli, Vijashreelayout,
                    Bommanahalli, Bengaluru, Karnataka 560076
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    height: 130,
                    p: 3,
                    boxShadow: "0 4px 20px rgba(0, 94, 176, 0.1)",
                    borderLeft: "4px solid #00584b",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        backgroundColor: "#e0f7ff",
                        color: "#00584b",
                        borderRadius: "50%",
                        p: 1.5,
                        mr: 2,
                      }}
                    >
                      <AccessTimeIcon />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Open Hours
                    </Typography>
                  </Box>
                  <Typography>Mon-Sat (09:00 AM-07:00 PM)</Typography>
                </Card>
              </Grid>
            </Grid>

            {/* Social Media */}
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2,  }}
              >
                Follow Us On Social Media
              </Typography>
              <Box>
                <IconButton sx={{ color: "#00584b", mr: 1 }}>
                  <FacebookIcon fontSize="large" />
                </IconButton>
                <IconButton sx={{ color: "#00584b", mr: 1 }}>
                  <TwitterIcon fontSize="large" />
                </IconButton>
                <IconButton sx={{ color: "#00584b", mr: 1 }}>
                  <InstagramIcon fontSize="large" />
                </IconButton>
                <IconButton sx={{ color: "#00584b" }}>
                  <LinkedInIcon fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Contact Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: "#00584b",
                }}
              >
                Send us a message
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "#00584b",
                      "&:hover": { backgroundColor: "#004a8c" },
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Google Map */}
      <Box sx={{ width: "100%", height: "500px", mt: 6 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d281.3500368448373!2d77.61853052343238!3d12.899707730044824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14eec814197d%3A0xcf0ad378f26271e9!2sBommanahalli%2C%20Bengaluru%2C%20Karnataka!5e1!3m2!1sen!2sin!4v1753959922729!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          backgroundColor: "#f5eee1",
          color: "#fff",
          py: 4,
          textAlign: "center",
        }}
      >
        <Container>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6} sx={{ mb: { xs: 3, md: 0 } }}>
              <Typography variant="h5" sx={{ fontWeight: 600,color:'#00584b' }}>
                Ready to start your wellness journey?
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-end" },
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#00584b",
                    "&:hover": { backgroundColor: "#11b9a0ff" },
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    mr: 2,
                  }}
                >
                  Book Consultation
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "#c24300",
                    color: "#00584b",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  Call Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default ContactUs;

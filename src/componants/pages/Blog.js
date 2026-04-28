import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Breadcrumbs,
  Container,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import rocketImage from "../../assets/anveshan-girghee-5ltr-dolchi.jpg";
import { Link, useNavigate } from "react-router-dom";

// Dummy images for articles - replace with your actual local image imports
import organic1 from "../../assets/anveshan-girghee-5ltr-dolchi.jpg";
import organic2 from "../../assets/anveshan-girghee-5ltr-dolchi.jpg";
import organic3 from "../../assets/anveshan-girghee-5ltr-dolchi.jpg";
import organic4 from "../../assets/anveshan-girghee-5ltr-dolchi.jpg";
import organic5 from "../../assets/anveshan-girghee-5ltr-dolchi.jpg";
import organic6 from "../../assets/anveshan-girghee-5ltr-dolchi.jpg";
import organic7 from "../../assets/anveshan-girghee-5ltr-dolchi.jpg";
import organic8 from "../../assets/anveshan-girghee-5ltr-dolchi.jpg";
import organic9 from "../../assets/anveshan-girghee-5ltr-dolchi.jpg";
import organic10 from "../../assets/anveshan-girghee-5ltr-dolchi.jpg";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Breadcrumb from "../common/Breadcrumb";
import HeaderSec from "../common/HeaderSec";
import bgImage from "../../assets/breadcrumb-bg.webp";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const BlogList = () => {
  const navigate = useNavigate();
  // const breadcrumbDetails = ["Home", "Blogs"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Dummy articles data (10 articles on organic products)
  const dummyArticles = [
    {
      id: 1,
      blogTitle: "5 Benefits of Eating Organic Foods",
      date: "2025-06-01",
      author: "Jane Doe",
      featuredUrl: organic1,
      ogUrl: "benefits-eating-organic-foods",
    },
    {
      id: 2,
      blogTitle: "How Organic Farming Protects the Environment",
      date: "2025-05-15",
      author: "John Smith",
      featuredUrl: organic2,
      ogUrl: "organic-farming-environment",
    },
    {
      id: 3,
      blogTitle: "Top 10 Organic Superfoods to Add to Your Diet",
      date: "2025-05-01",
      author: "Emily Johnson",
      featuredUrl: organic3,
      ogUrl: "top-10-organic-superfoods",
    },
    {
      id: 4,
      blogTitle: "Organic vs Conventional: What You Need to Know",
      date: "2025-04-20",
      author: "Michael Lee",
      featuredUrl: organic4,
      ogUrl: "organic-vs-conventional",
    },
    {
      id: 5,
      blogTitle: "How to Start Your Own Organic Garden",
      date: "2025-04-10",
      author: "Sara Parker",
      featuredUrl: organic5,
      ogUrl: "start-organic-garden",
    },
    {
      id: 6,
      blogTitle: "The Truth About Organic Certification",
      date: "2025-03-30",
      author: "David Kim",
      featuredUrl: organic6,
      ogUrl: "organic-certification-truth",
    },
    {
      id: 7,
      blogTitle: "Organic Skincare: Benefits and Top Products",
      date: "2025-03-20",
      author: "Laura White",
      featuredUrl: organic7,
      ogUrl: "organic-skincare-benefits",
    },
    {
      id: 8,
      blogTitle: "How Organic Farming Supports Biodiversity",
      date: "2025-03-10",
      author: "Kevin Brown",
      featuredUrl: organic8,
      ogUrl: "organic-farming-biodiversity",
    },
    {
      id: 9,
      blogTitle: "Organic Meat: Why It Matters",
      date: "2025-03-01",
      author: "Natalie Green",
      featuredUrl: organic9,
      ogUrl: "organic-meat-importance",
    },
    {
      id: 10,
      blogTitle: "Simple Organic Recipes for Busy Weeknights",
      date: "2025-02-25",
      author: "Chris Wilson",
      featuredUrl: organic10,
      ogUrl: "organic-recipes-weeknights",
    },
  ];

  const [articles, setArticles] = useState([]);

  // Commented out API fetch - using dummy data instead
  /*
  const fetchArticles = async () => {
    const params = {};
    try {
      const response = await invokeApi(
        config.seoMitra + apiList.getArticles,
        params
      );
      if (response?.status === 200) {
        setArticles(response.data.articles);
      } else {
        alert("Failed to fetch data:", response);
      }
    } catch (error) {
      alert("Error during data fetch:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  */

  // Load dummy articles on mount
  useEffect(() => {
    setArticles(dummyArticles);
  }, []);

  const handleNavigate = (ogUrl) => {
    navigate(`/blog/${ogUrl}`);
  };

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
      <HeaderSec cartItems={cartItems} onCartUpdate={(updatedCart) => setCartItems(updatedCart)} />
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
              Blog
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
              Blog:
            </Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box>
              {articles.map((blog) => (
                <Card
                  key={blog.id}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    mb: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                    overflow: "hidden",
                    height: "auto",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: { xs: "100%", md: "40%" },
                      objectFit: "cover",
                    }}
                    image={blog.featuredUrl}
                    alt={blog.blogTitle}
                  />
                  <CardContent
                    sx={{ width: { xs: "90%", md: "60%" }, padding: 3 }}
                  >
                    <Typography
                      fontWeight="bold"
                      gutterBottom
                      sx={{
                        height: { xs: "50px", md: "80px" },
                        fontSize: { xs: 16, md: 25 },
                        textAlign: { xs: "center", md: "left" },
                        mt: { xs: -2, md: 0 },
                      }}
                    >
                      {blog.blogTitle}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{ mb: 1 }}
                    >
                      {new Date(blog.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 1 }}
                    >
                      {blog.author}
                    </Typography>

                    <Divider sx={{ mt: 0, mb: 2, borderColor: "#D3D3D3" }} />

                    <Button
                      variant="text"
                      sx={{
                        color: "#00584b",
                        fontWeight: "bold",
                        textTransform: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        padding: 0,
                        transition: "0.3s ease-in-out",
                        "&:hover": {
                          color: "#000",
                          transform: "translateX(5px)",
                        },
                      }}
                      onClick={() => handleNavigate(blog.ogUrl)}
                    >
                      READ MORE
                      <ArrowForward
                        sx={{
                          ml: 1,
                          fontSize: "1.2rem",
                          color: "inherit",
                          transition: "0.3s ease-in-out",
                          "&:hover": {
                            transform: "rotate(90deg)",
                            color: "#ff9100",
                          },
                        }}
                      />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ position: "sticky", top: "20px", width: "90%" }}>
              <Card
                sx={{
                  p: 7,
                  borderRadius: 3,
                  textAlign: "center",
                  background: "#2e1e0f",
                  color: "#fff",
                  height: "50vh",
                  width: "75%",
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Start Your Journey to Success, Updates!
                </Typography>
                <Button
                  variant="contained"
                  fontWeight="bold"
                  sx={{
                    background: "#c24300",
                    color: "#fff",
                    mt: 2,
                    padding: "10px 20px",
                    borderRadius: 5,
                    border: "2px solid transparent",
                    "&:hover": {
                      backgroundColor: "#2e1e0f",
                      color: "#fff",
                      transform: "scale(1.05) translateY(-2px)",
                      borderColor: "#ff9100",
                    },
                  }}
                >
                  CONTACT US
                  <ArrowForward
                    sx={{
                      ml: 1,
                      fontSize: "1.2rem",
                      color: "inherit",
                      transition: "0.3s ease-in-out",
                      "&:hover": {
                        transform: "rotate(280deg)",
                        color: "#fff",
                      },
                    }}
                  />
                </Button>
                <Box mt={3} display="flex" justifyContent="center">
                  <img
                    src={rocketImage}
                    alt="Rocket Illustration"
                    style={{
                      width: "100%",
                      maxWidth: "150px",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default BlogList;

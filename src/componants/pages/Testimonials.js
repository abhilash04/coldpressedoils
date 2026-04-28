import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Rating,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import img1 from "../../assets/Minerva.webp";
import img2 from "../../assets/ghee_customer_Moment.webp";
import img3 from "../../assets/Untitled_2_489afb6b.jpg";
import img4 from "../../assets/pankajtw.webp";
import img5 from "../../assets/Maitrayee.avif";
import img6 from "../../assets/Neelam.avif";
import img from "../../assets/title-icon.webp";

import logo1 from "../../assets/anv-ftr-1.png";
import logo2 from "../../assets/anv-ftr-1.png";
import logo3 from "../../assets/anv-ftr-3.png";
import logo4 from "../../assets/anv-ftr-4.png";
import logo5 from "../../assets/anv-ftr-5.png";
import logo6 from "../../assets/anv-ftr-6.png";
import logo7 from "../../assets/anv-ftr-7.png";
import logo8 from "../../assets/anv-ftr-8.png";
import { useTheme, useMediaQuery } from "@mui/material";
import Slider from "react-slick";

const testimonials = [
  {
    name: "Lakshmi Dev",
    review:
      "Their ghee helped solve my acid reflux problem. While cooking with wood pressed oils imparts a unique taste and I feel lighter",
    image: img2,
  },
  {
    name: "Dr Shagun Walia",
    review:
      "This ghee is the most healthy option out there for children. I use it regularly for my daughter and she loves the taste",
    image: img3,
  },
  {
    name: "Pankaj Tiwari",
    review:
      "Works very well for holistic healing! This honey isn't your typical honey. It is very sweet and can tackle a sore throat like nobody's business :)",
    image: img1,
  },
  {
    name: "Ritika Sharma",
    review:
      "I switched to their cold-pressed coconut oil for my hair and it’s been a game changer. My scalp feels nourished and hair fall has reduced noticeably!",
    image: img4,
  },
  {
    name: "Arvind Rao",
    review:
      "The A2 ghee has a rich aroma and tastes just like the homemade ghee from my childhood. Perfect for my morning rituals and cooking!",
    image: img5,
  },
  {
    name: "Naina Mehta",
    review:
      "Absolutely love their turmeric powder—pure, vibrant, and extremely effective in my golden milk. You can feel the quality!",
    image: img6,
  },
  {
    name: "Karan Verma",
    review:
      "I was skeptical at first, but their jaggery powder is genuinely clean and has a deep, earthy sweetness. No more refined sugar for me!",
    image: img2,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const itemsPerView = isMobile ? 1 : 3;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 5000, // higher = slower scroll
    autoplay: true,
    autoplaySpeed: 0, // no delay between scrolls
    cssEase: "linear", // smooth, linear scrolling
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true, // allow natural widths
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  return (
    <Box>
      <Box sx={{ backgroundColor: "#f5fcf5", py: isMobile ? 2.5 : 6, px: 2 }}>
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              pb: 3.5,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: isMobile ? "1.6rem" : "1.8rem",
                fontFamily: "var(--font-heading-family)",
                color: "#00584b",
                fontStyle: "var(--font-heading-style)",
                letterSpacing: "calc(var(--font-heading-scale) * 0.06rem)",
                lineHeight: "calc(1 + 0.3 / max(1, var(--font-heading-scale)))",
                wordBreak: "break-word",
              }}
            >
              What Do Our Customers Say
            </Typography>

            <img
              src={img}
              alt="Logo"
              style={{ width: "80px", height: "auto", marginTop: "0.5rem" }}
            />
          </Box>

          {/* Testimonial Slider */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Card */}
            {/* Cards Container */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {Array.from({ length: itemsPerView }).map((_, offset) => {
                const testimonial =
                  testimonials[(currentIndex + offset) % testimonials.length];

                return (
                  <Paper
                    key={offset}
                    elevation={3}
                    sx={{
                      borderRadius: "16px",
                      padding: "24px",
                      width: 320,
                      backgroundColor: "white",
                      textAlign: "center",
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: 14,
                        color: "#333",
                        mb: 1.5,
                        lineHeight: 1.4,
                      }}
                    >
                      {testimonial.review}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        mt: 1,
                      }}
                    >
                      <Avatar
                        src={testimonial.image}
                        sx={{ width: 60, height: 60 }}
                      />
                      <Box sx={{ textAlign: "left" }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700, color: "#222" }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Rating value={5} readOnly sx={{ color: "#ffc107" }} />
                      </Box>
                    </Box>
                  </Paper>
                );
              })}
            </Box>
          </Box>
          {/* Arrows + Dots Row */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Left Arrow */}
            <IconButton
              onClick={handlePrev}
              sx={{
                border: "2px solid #5e9b95",
                color: "#5e9b95",
                width: 36,
                height: 36,
              }}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>

            {/* Dots */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              {testimonials.map((_, idx) => (
                <Box
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor:
                      idx === currentIndex ? "#00705e" : "#dcdcdc",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                />
              ))}
            </Box>

            {/* Right Arrow */}
            <IconButton
              onClick={handleNext}
              sx={{
                border: "2px solid #00705e",
                color: "#00705e",
                width: 36,
                height: 36,
              }}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Logos Row */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          py: isMobile?1.5:4,
          px: { xs: 2, md: "none" },
        }}
      >
        {isMobile ? (
          <Slider {...sliderSettings}>
            {logos.map((src, idx) => (
              <Box
                key={idx}
                sx={{
                  px: 1.5, // spacing between logos
                }}
              >
                <Box
                  component="img"
                  src={src}
                  alt={`logo-${idx}`}
                  sx={{
                    height: 50,
                    width: "auto",
                    maxWidth: 100,
                    mx: "auto",
                  }}
                />
              </Box>
            ))}
          </Slider>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            {logos.map((src, idx) => (
              <Box
                key={idx}
                component="img"
                src={src}
                alt={`logo-${idx}`}
                sx={{
                  height: 65,
                  width: "auto",
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Testimonials;

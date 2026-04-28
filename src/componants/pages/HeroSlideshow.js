import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import {
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import img1 from "../../assets/organicoils imgs/banner1.jpg"; 
import img2 from "../../assets/organicoils imgs/banner2.jpg";
import img3 from "../../assets/organicoils imgs/banner3.jpg";
import img4 from "../../assets/organicoils imgs/banner4.jpg";
import img5 from "../../assets/2(1).png";
import img6 from "../../assets/2(2).png";
import img7 from "../../assets/2(3).png";
const slides = [
  {
    desktop: img2,
    mobile: img6,
    link: "/collections/all-products",
  },
  {
    desktop: img1,
    mobile: img5,
    link: "/collections/high-variants",
  },
  {
    desktop: img3,
    mobile: img6,
    link: "/products/moringa-sattu-drink-mix-sachets-jaljeera-flavour",
  },
  {
    desktop: img4,
    mobile: img7,
    link: "/collections/high-variants",
  },
];

const HeroSlideshow = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <SwipeableViews index={index} onChangeIndex={setIndex} enableMouseEvents>
        {slides.map((slide, i) => (
          <a
            key={i}
            href={slide.link}
            style={{ display: "block", width: "100%" }}
          >
            <picture>
              <source media="(min-width:960px)" srcSet={slide.desktop} />

              <img
                src={slide.mobile}
                alt=""
                loading="eager"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </picture>
          </a>
        ))}
      </SwipeableViews>

      {/* Arrows */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      >
        <IconButton onClick={handlePrev} sx={{ color: "white" }}>
          <ArrowBackIos />
        </IconButton>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      >
        <IconButton onClick={handleNext} sx={{ color: "white" }}>
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* Dots */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: i === index ? "white" : "gray",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroSlideshow;

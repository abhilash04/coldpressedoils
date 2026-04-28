import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import { Box, Typography, Button } from "@mui/material";

import img1 from '../../assets/bnr1.png'
import img2 from '../../assets/bnr2.png'
const slides = [
  {
    desktop: img2,
    mobile:
      "https://www.anveshan.farm/cdn/shop/files/NEW_MOBILE_SIZE_4.webp?v=1751480946",
    link: "/collections/all-products",
  },
  {
    desktop:img1,
    mobile:
      "https://www.anveshan.farm/cdn/shop/files/900X1200_f07b963e-5288-4b39-8467-ac8f5e34124b.jpg?v=1752832210",
    link: "/collections/high-variants",
  },
  // {
  //   desktop:
  //     "https://www.anveshan.farm/cdn/shop/files/new_size_2_1.webp?v=1751473456",
  //   mobile:
  //     "https://www.anveshan.farm/cdn/shop/files/NEW_MOBILE_SIZE_3_1.webp?v=1751473461",
  //   link: "/products/moringa-sattu-drink-mix-sachets-jaljeera-flavour",
  // },
];
// Content for each slide
const slideContents = [
  {
    title: "Creating Healthier and Happy Farmers",
    description: [
      "5000+ Farmers Empowered",
      "25+ Micro-entrepreneur Units",
      "5 Lakh+ Families Served",
    ],
    buttonText: "Learn More",
  },
  {
    title: "Minimal Processing, Maximum Nutrition",
    description:
      "Our farmers work twice as hard as we do in order to deliver the best to you.",
    buttonText: "Discover More",
  },
  {
    title: "Authentic Food Prepared In Rural Areas",
    description:
      "By choosing healthy food, you are also helping to secure rural livelihoods.",
    buttonText: "Explore",
  },
];

const HappyFarmers = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        height: { xs: 450, sm: 600, md: 400 },
        maxWidth: "100%",
      }}
    >
      <SwipeableViews index={index} onChangeIndex={setIndex} enableMouseEvents>
        {slides.map((slide, i) => (
          <a
            key={i}
            href={slide.link}
            style={{ display: "block", width: "100%" }}
          >
            <picture>
              <source media="(min-width:1024px)" srcSet={slide.desktop} />
              <img
                src={slide.mobile}
                alt=""
                loading="eager"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </picture>
          </a>
        ))}
      </SwipeableViews>

      {/* Content box */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center", // center horizontally
          padding: 4,
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <Typography
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: { xs: 1, md: 3 },
            letterSpacing: 1,
            fontSize: { xs: "20px", md: "24px" },
          }}
        >
          {slideContents[index].title}
        </Typography>

        {/* Description with conditional formatting */}
        {Array.isArray(slideContents[index].description) ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              mb: { xs: 1, md: 3 },
              flexWrap: "wrap",
            }}
          >
            {slideContents[index].description.map((line, i) => {
              const firstSpaceIndex = line.indexOf(" ");
              const numberPart = line.slice(0, firstSpaceIndex);
              const textPart = line.slice(firstSpaceIndex + 1);

              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    maxWidth: 160,
                  }}
                >
                  <Typography
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "18px", md: "24px" },
                      lineHeight: 1,
                    }}
                  >
                    {numberPart}
                  </Typography>
                  <Typography
                    component="div"
                    sx={{ fontSize: { xs: "16px", md: "18px" }, mt: 0.5 }}
                  >
                    {textPart}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Typography
            variant="body1"
            sx={{ mb: 1, fontSize: { xs: "16px", md: "20px" } }}
          >
            {slideContents[index].description}
          </Typography>
        )}

        <Button
          variant="contained"
          sx={{
            px: 2,
            py: 1,
            fontWeight: "bold",
            borderRadius: 2,
            color: "#00584b",
            backgroundColor: "#d0bd80",
          }}
          onClick={() =>
            alert(`Clicked on: ${slideContents[index].buttonText}`)
          }
        >
          {slideContents[index].buttonText}
        </Button>
      </Box>
    </Box>
  );
};

export default HappyFarmers;

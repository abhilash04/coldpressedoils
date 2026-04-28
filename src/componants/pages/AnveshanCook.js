import React, { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";
import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";
import video3 from "../../assets/video3.mp4";
import video4 from "../../assets/video4.mp4";
import video5 from "../../assets/video5.mp4";
import video6 from "../../assets/video6.mp4";

const AnveshanCook = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollStep = 1;        // smaller step = slower scroll
    const scrollInterval = 60;   // higher interval = slower scroll

    const autoScroll = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollLeft = 0; // Reset to beginning
      } else {
        container.scrollLeft += scrollStep;
      }
    }, scrollInterval);

    return () => clearInterval(autoScroll);
  }, []);


  const products1 = [
    {
      title: "A2 Desi Cow Ghee",
      price: "₹1,086",
      originalPrice: "₹1,110",
      gif: video1,
    },
    {
      title: "Wood Groundnut Oil",
      price: "₹720",
      gif: video2,
    },
    {
      title: "Forest Raw Honey",
      price: "₹349",
      originalPrice: "₹425",
      gif: video3,
    },
    {
      title: "Bilona Ghee Combo",
      price: "₹380",
      originalPrice: "₹550",
      gif: video4,
    },
    {
      title: "Forest Raw Honey",
      price: "₹418",
      originalPrice: "₹440",
      gif: video5,
    },
    {
      title: "Bilona Ghee Combo",
      price: "₹713",
      originalPrice: "₹750",
      gif: video6,
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: 4,
        px: 2,
        backgroundColor: "#fff",
        maxWidth: 1200,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.5rem", md: "2rem" },
          mb: 2.75,
          fontFamily: "Montserrat, sans-serif",
          color: "#00584b",
        }}
      >
        Cook With Anveshan
      </Typography>

      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "nowrap",
          gap: 2,
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {products1.map((item, idx) => (
          <Box
            key={idx}
            sx={{
              borderRadius: 1,
              border: "1px solid #d1d1d1",
              backgroundColor: "#fff",
              width: { xs: 190, sm: 240, md: 300 },
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardMedia
              component="video"
              src={item.gif}
              autoPlay
              loop
              muted
              playsInline
              sx={{
                objectFit: "cover",
                width: "100%",
                height: 290,
              }}
            />
            <CardContent sx={{ px: 1 }}>
              <Typography sx={{ fontSize: "15px", textAlign: "center", fontWeight: 500 }}>
                {item.title}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 0.5 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                    {item.price}
                  </Typography>
                  {item.originalPrice && (
                    <Typography
                      sx={{
                        color: "gray",
                        fontSize: "15px",
                        fontWeight: 500,
                        textDecoration: "line-through",
                      }}
                    >
                      {item.originalPrice}
                    </Typography>
                  )}
                </Stack>
              </Box>
            </CardContent>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AnveshanCook;

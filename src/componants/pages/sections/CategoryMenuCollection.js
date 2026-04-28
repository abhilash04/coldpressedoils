import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import img1 from "../../../assets/Icons-01.png";
import img2 from "../../../assets/Icons-02.png";
import img3 from "../../../assets/Icons-03.png";
import img4 from "../../../assets/Icons-04.png";
import img5 from "../../../assets/Icons-05.png";
import img6 from "../../../assets/Icons-06.png";
import img7 from "../../../assets/Icons-07.png";

import img8 from "../../../assets/Icons-01(1).png";
import img9 from "../../../assets/Icons-02(2).png";
import img10 from "../../../assets/Icons-03(3).png";
import img11 from "../../../assets/Icons-04(4).png";
import img12 from "../../../assets/Icons-05(5).png";
import img13 from "../../../assets/Icons-06(6).png";
import img14 from "../../../assets/Icons-07(7).png";

const CategoryMenuCollection = ({ onSelectCategory, activeCategory }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const categories = [
    {
      label: "All",
      img: img6,
      imgchange: img13,
      link: "/collections/all-products",
    },
    { label: "New", img: img5, imgchange: img14, link: "/collections/new" },
    {
      label: "Feature Products",
      img: img1,
      imgchange: img8,
      link: "/collections/featured-products",
    },
    {
      label: "Bull Driven Ghani Oils",
      img: img2,
      imgchange: img9,
      link: "/collections/ghani-oils",
    },
    {
      label: "Natural Food",
      img: img3,
      imgchange: img10,
      link: "/collections/natural-food",
    },
    {
      label: "Panchagavya",
      img: img4,
      imgchange: img11,
      link: "/collections/panchagavya",
    },
    {
      label: "Ghee and Honey",
      img: img5,
      imgchange: img12,
      link: "/collections/gee-honey",
    },
    {
      label: "Gardening & Farming",
      img: img7,
      imgchange: img14,
      link: "/collections/gardening-farming",
    },
    {
      label: "Cow Dung Products",
      img: img6,
      imgchange: img13,
      link: "/collections/cow-dung-products",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#f8f8f7",
        py: 1.5,
        overflowX: isMobile ? "auto" : "hidden",
        animation: "fadeIn 0.6s ease-out",
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(-10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Box sx={{ width: "fit-content", mx: "auto", px: isMobile ? 2 : 0 }}>
        <Stack direction="row" spacing={3}>
          {categories.map((item, index) => {
            const isActive = item.label === activeCategory;
            return (
              <Box
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => onSelectCategory(item.label)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectCategory(item.label);
                  }
                }}
                sx={{
                  cursor: "pointer",
                  textAlign: "center",
                  color: isActive ? "#fff" : "#444",
                  display: "inline-block",
                  transition: "transform 0.3s ease, color 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    color: "#1d6758",
                  },
                }}
              >
                <Box
                  component="img"
                  src={isActive ? item.imgchange : item.img}
                  alt={item.label}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    margin: "0 auto",
                    transition: "transform 0.5s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    mt: 1,
                    width: "80px",
                    color: isActive ? "#1d6758" : "#333",
                    fontFamily: "Avenir Next, sans-serif",
                    transition: "color 0.3s ease",
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default CategoryMenuCollection;

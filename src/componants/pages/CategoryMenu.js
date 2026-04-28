import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// import {
//   Apps,
//   BreakfastDining,
//   LocalDrink,
//   NewReleases,
//   Pets,
//   Recycling,
//   Spa,
//   Star,
//   Yard,
// } from "@mui/icons-material";
import img1 from "../../assets/Icons-01.png";
import img2 from "../../assets/Icons-02.png";
import img3 from "../../assets/Icons-03.png";
import img4 from "../../assets/Icons-04.png";
import img5 from "../../assets/Icons-05.png";
import img6 from "../../assets/Icons-06.png";
import img7 from "../../assets/Icons-07.png";

import img8 from "../../assets/Icons-01(1).png";
import img9 from "../../assets/Icons-02(2).png";
import img10 from "../../assets/Icons-03(3).png";
import img11 from "../../assets/Icons-04(4).png";
import img12 from "../../assets/Icons-05(5).png";
import img13 from "../../assets/Icons-06(6).png";
import img14 from "../../assets/Icons-07(7).png";

import { useLocation, useNavigate } from "react-router-dom";

const CategoryMenu = ({ onSelectCategory, activeCategory }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { search } = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const queryParams = new URLSearchParams(search);
  const categoryFromURL = queryParams.get("category") || "All";

  // const categories = [
  //   { label: "All", icon: <Apps />, link: "/collections/all-products" },
  //   { label: "New", icon: <NewReleases />, link: "/collections/new" },
  //   {
  //     label: "Feature Products",
  //     icon: <Star />,
  //     link: "/collections/featured-products",
  //   },
  //   {
  //     label: "Bull Driven Ghani Oils",
  //     icon: <LocalDrink />,
  //     link: "/collections/ghani-oils",
  //   },
  //   { label: "Natural Food", icon: <Spa />, link: "/collections/natural-food" },
  //   { label: "Panchagavya", icon: <Pets />, link: "/collections/panchagavya" },
  //   {
  //     label: "Ghee and Honey",
  //     icon: <BreakfastDining />,
  //     link: "/collections/gee-honey",
  //   },
  //   {
  //     label: "Gardening & Farming",
  //     icon: <Yard />,
  //     link: "/collections/gardening-farming",
  //   },
  //   {
  //     label: "Cow Dung Products",
  //     icon: <Recycling />,
  //     link: "/collections/cow-dung-products",
  //   },
  // ];

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
      label: "Bull-Driven Oils",
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
      label: "Grow & Farming",
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

  // When URL changes, notify parent to update activeCategory
  useEffect(() => {
    if (categoryFromURL !== activeCategory) {
      onSelectCategory(categoryFromURL);
    }
  }, [categoryFromURL, activeCategory, onSelectCategory]);

  const handleCategoryClick = (categoryLabel, link) => {
    const encodedCategory = encodeURIComponent(categoryLabel);
    navigate(`${link}?category=${encodedCategory}`);
    onSelectCategory(categoryLabel);
  };

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
        <Stack direction="row" spacing={isMobile?2:3}>
          {categories.map((item, index) => {
            const isActive = item.label === activeCategory;
            return (
              <Box
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => handleCategoryClick(item.label, item.link)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCategoryClick(item.label, item.link);
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
                  src={hoveredIndex === index ? item.imgchange : item.img}
                  alt={item.label}
                  sx={{
                    width: isMobile?75:100,
                    height: isMobile?75:100,
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
                    fontSize: isMobile?"8px":"14px",
                    fontWeight: "bold",
                    mt: isMobile?0.5:1,
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

export default CategoryMenu;

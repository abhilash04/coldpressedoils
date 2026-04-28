import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import img from "../../assets/title-icon.webp";

import img1 from "../../assets/Asset_251.svg";
import img2 from "../../assets/Asset_252.svg";
import img3 from "../../assets/Asset_253.svg";
import img4 from "../../assets/Asset_254.svg";

const promises = [
  {
    title: "AUTHENTICITY",
    description: "Bringing purest form of food direct from the farms",
    image: img1,
  },
  {
    title: "TRADITION",
    description: "Harnessing age-old wisdom passed down by Grandmas",
    image: img2,
  },
  {
    title: "TRUST",
    description: "Being 100% transparent & thoroughly lab-tested",
    image: img3,
  },
  {
    title: "PURPOSE",
    description: "Empowering rural India with employment & fair trade",
    image: img4,
  },
];

const AnveshanPromise = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", my: 2 }}>
      <Box
        sx={{
          px: 2,
          textAlign: "center",
          maxWidth: "1000px",
          mx: "auto",
          pt: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // centers both text and image horizontally
            textAlign: "center",
            py: isMobile ? 2.2 : 3.5,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: isMobile ? "1.4rem" : "1.8rem",
              fontFamily: "Georgia, serif",
              color: "#00584b",
              fontStyle: "var(--font-heading-style)",
              letterSpacing: "calc(var(--font-heading-scale) * 0.06rem)",
              lineHeight: "calc(1 + 0.3 / max(1, var(--font-heading-scale)))",
              wordBreak: "break-word",
            }}
          >
            Pure Comeback: Cold-Pressed, A2 Ghee and Handmade
          </Typography>

          <img
            src={img} // Replace with your actual logo path
            alt="Logo"
            style={{
              width: "80px", // Adjust as needed
              height: "auto",
              mt: 1,
            }}
          />
        </Box>

        <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
          {promises.map((item, index) => (
            <Grid
              key={index}
              item
              xs={6}
              sm={6}
              md={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                elevation={0}
                sx={{
                  backgroundColor: "transparent",
                  textAlign: "center",
                  maxWidth: 220,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    mt: 4,
                    mb: { xs: 1, md: 2 },
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                    loading="lazy"
                  />
                </Box>
                <CardContent sx={{ px: 0 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: '#00584b',
                      fontSize: isMobile ? "0.8rem" : "1.2rem",
                      fontFamily: "var(--font-heading-family)",
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#444",
                      fontSize: isMobile ? "0.75rem" : "0.88rem",
                      fontFamily: "var(--font-heading-family)",
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AnveshanPromise;

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";

import bgImage from "../../assets/col-arrow.png";
import img from "../../assets/organicoils imgs/dreamy-aesthetic-cosmetic-product-with-fresh-background_23-2151382852.jpg";
import img1 from "../../assets/title-icon.webp";

const featureItems = [
  {
    icon: <FavoriteIcon />,
    title: "GAU SEVA",
    description: "Offer service to the holy cow for spiritual merit.",
  },
  {
    icon: <LocalFloristIcon />,
    title: "GARLANDING",
    description: "Adorn the cow with flowers in deep reverence.",
  },
  {
    icon: <WbSunnyIcon />,
    title: "ARATI",
    description: "Offer sacred light to the divine presence.",
  },
  {
    icon: <EmojiNatureIcon />,
    title: "GRASS FEED",
    description: "Nourish the cow with fresh greens as blessed ritual.",
  },
  {
    icon: <TouchAppIcon />,
    title: "GAU SPARSH",
    description: "Touch cow with devotion to invite inner peace.",
  },
  {
    icon: <SelfImprovementIcon />,
    title: "BLESSINGS",
    description: "Divine grace through cow blessings.",
  },
];

const GauPooja = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ mb: 6, mt: 2.5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          py: 3.5,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: isMobile ? "1.4rem" : "1.8rem",
            fontFamily: "Georgia, serif",
            color: "#05455c",
            fontStyle: "var(--font-heading-style)",
            letterSpacing: "calc(var(--font-heading-scale) * 0.06rem)",
            lineHeight: "calc(1 + 0.3 / max(1, var(--font-heading-scale)))",
            wordBreak: "break-word",
          }}
        >
          Pure Comeback: Cold-Pressed, A2 Ghee and Handmade
        </Typography>

        <img
          src={img1}
          alt="Logo"
          style={{
            width: "80px",
            height: "auto",
            marginTop: "8px",
          }}
        />
      </Box>
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: isMobile ? 2 : 4,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
        }}
      >
        {/* Left Side - Features */}
        {isMobile ? (
          // Mobile version with 3 columns
          <Grid
            container
            spacing={2}
            sx={{
              flex: 1,
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              borderRadius: 2,
              p: 2,
            }}
          >
            {featureItems.map((item, index) => (
              <Grid item xs={4} key={index}>
                <Paper
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    minHeight: "120px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <Box
                    sx={{
                      background: "#05455c",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      mb: 0.8,
                    }}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        border: "8px solid #ccd5eeff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box sx={{ color: "#fff", fontSize: "18px" }}>
                        {item.icon}
                      </Box>
                    </Box>
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#1d1d1d",
                      mb: 0.5,
                      fontSize: "12px",
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "10px",
                      color: "#666",
                    }}
                  >
                    {item.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          // Original desktop version
          <Grid
            container
            spacing={2}
            sx={{
              flex: 1,
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              borderRadius: 2,
              p: 2,
            }}
          >
            {featureItems.map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  sx={{
                    p: 1.5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    minHeight: 150,
                    backgroundColor: "#fff",
                    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "#05455c",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                      "& .icon-container": {
                        backgroundColor: "#fff",
                      },
                      "& .icon-inner-circle": {
                        borderColor: "#05455c",
                      },
                      "& .icon": {
                        color: "#05455c",
                      },
                      "& .title": {
                        color: "#fff",
                      },
                      "& .description": {
                        color: "#fff",
                      },
                    },
                  }}
                >
                  <Box
                    className="icon-container"
                    sx={{
                      background: "#05455c",
                      width: 56,
                      height: 56,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      mb: 0.8,
                      transition: "0.3s",
                    }}
                  >
                    <Box
                      className="icon-inner-circle"
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        border: "8px solid #ccd5eeff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "0.3s",
                      }}
                    >
                      <Box
                        className="icon"
                        sx={{ color: "#fff", fontSize: "24px" }}
                      >
                        {item.icon}
                      </Box>
                    </Box>
                  </Box>

                  <Typography
                    className="title"
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: "#1d1d1d",
                      mb: 0.8,
                      fontSize: "16px",
                      transition: "0.3s",
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    className="description"
                    variant="body2"
                    sx={{
                      fontSize: "13px",
                      color: "#666",
                      width: "160px",
                      transition: "0.3s",
                    }}
                  >
                    {item.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Right Side - Image (Desktop only) */}
        {/* {!isMobile && ( */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={img}
              alt="Meditation"
              sx={{
                maxWidth: "100%",
                height: "400px",
                borderRadius: 2,
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              }}
            />
          </Box>
        {/* )} */}
      </Box>
    </Box>
  );
};

export default GauPooja;
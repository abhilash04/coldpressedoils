import React from "react";
import {
  Grid,
  Box,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import img from "../../assets/organicoils imgs/set-glass-bottles-with-eucalyptus-essential-oil-grey-table-leaves-vase_109994-268.avif";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import SpaIcon from "@mui/icons-material/Spa";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import img1 from "../../assets/title-icon.webp";

const steps = [
  {
    icon: <LocalFireDepartmentIcon sx={{ fontSize: 36, color: "#05455c" }} />,
    title: "Agni Homa",
    description: "Invoke the sacred fire to purify the surroundings and self.",
  },
  {
    icon: <SelfImprovementIcon sx={{ fontSize: 36, color: "#05455c" }} />,
    title: "Navagraha Homa",
    description: "Balance planetary influences and promote cosmic harmony.",
  },
  {
    icon: <SpaIcon sx={{ fontSize: 36, color: "#05455c" }} />,
    title: "Ganapati Homa",
    description: "Remove obstacles and seek blessings for new beginnings.",
  },
  {
    icon: <WbTwilightIcon sx={{ fontSize: 36, color: "#05455c" }} />,
    title: "Sudarshana Homa",
    description: "Protect against negativity and promote spiritual clarity.",
  },
  {
    icon: <EmojiObjectsIcon sx={{ fontSize: 36, color: "#05455c" }} />,
    title: "Ayushya Homa",
    description: "Enhance vitality and well-being through Vedic blessings.",
  },
];

const Yagyas = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", pb:  isMobile ? 2.5:6, px: 2, mt: 2.5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // centers both text and image horizontally
          textAlign: "center",
          py: isMobile ? 2.5 : 3.5,
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
          Empowering Lives Through Yagyas & Homas
        </Typography>

        <img
          src={img1} // Replace with your actual logo path
          alt="Logo"
          style={{
            width: "80px", // Adjust as needed
            height: "auto",
            mt: 0.5,
          }}
        />
      </Box>
      <Grid container spacing={isMobile ? 2 : 6} alignItems="center">
        {/* Image Section with shiny glass hover */}
        <Grid item xs={12} md={6.5}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: isMobile ? 1 : 2,
              boxShadow: isMobile ? 1 : 3,
              cursor: "pointer",
              "&:hover .shiny": {
                animation: "shinyMove 0.5s linear forwards",
              },
              ".shiny": {
                animation: "none",
              },
            }}
          >
            <Box
              component="img"
              src={img}
              alt="Meditating child"
              sx={{ width: "100%", display: "block" }}
            />
            {/* Shiny overlay */}
            <Box
              className="shiny"
              sx={{
                position: "absolute",
                top: 0,
                left: "-75%",
                height: "100%",
                width: "20%",
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
                transform: "skewX(-25deg)",
                pointerEvents: "none",
              }}
            />
          </Box>
        </Grid>

        {/* Content Section */}
        <Grid item xs={12} md={5.5}>
          <Stack spacing={isMobile ? 1 : 2}>
            {steps.map(({ icon, title, description }, idx) => (
              <Stack
                key={idx}
                direction="row"
                spacing={isMobile ? 1 : 2}
                alignItems="flex-start"
                sx={{
                  borderBottom: "1px solid lightgrey",
                  pb: isMobile ? 1 : 2,
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#dae0f1",
                    borderRadius: isMobile ? 1 : 2,
                    p: isMobile ? 0.2 : 0.4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: isMobile ? 40 : 56,
                    minHeight: isMobile ? 40 : 56,
                    color: "#05455c",
                  }}
                >
                  {React.cloneElement(icon, {
                    sx: { fontSize: isMobile ? "1.2rem" : "1.5rem" },
                  })}
                </Box>
                <Box>
                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    sx={{
                      fontWeight: "bold",
                      color: "#05455c",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: isMobile ? 0.2 : 0.5,
                      fontSize: isMobile ? "0.8rem" : "0.875rem",
                    }}
                  >
                    {description}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>

      {/* Keyframes animation */}
      <style>
        {`
          @keyframes shinyMove {
            0% {
              left: -75%;
            }
            100% {
              left: 125%;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Yagyas;

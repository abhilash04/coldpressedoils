import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
  MobileStepper,
} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import img1 from "../../assets/organicoils imgs/vertical-shot-olive-oil-with-soap-bar_23-2148337445.jpg";
import img2 from "../../assets/organicoils imgs/concept-natural-cosmetics-with-eucalyptus-oil-wooden-table_185193-34570.jpg";
import img3 from "../../assets/organicoils imgs/side-close-up-view-spices-onion-lemon-leaves-garlic-bottle-oil-table_140725-123036.jpg";
import img4 from "../../assets/organicoils imgs/clear-olive-oil-bottle-outdoors_23-2148337491.jpg";
import bgimg from "../../assets/footer-bg-update.png";

const images = [img1, img2, img3, img4];

const NativeIngredientsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleDotClick = (index) => {
    setActiveStep(index);
  };

  return (
    <Box sx={{ backgroundColor: "#0C5A4E" }}>
      <Box
        component="footer"
        sx={{
          backgroundImage: `url(${bgimg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            py: isMobile ? 2.5 : 6,
            px: 2,
          }}
        >
          <Typography
            align="center"
            sx={{
              color: "white",
              fontWeight: 600,
              my: isMobile ? 2.5 : 6,
              fontSize: isMobile ? "1.6rem" : "1.8rem",
              fontFamily: "Avenir Next, sans-serif",
            }}
          >
            Purely Native Ingredients. No Substitutes
          </Typography>

          {isMobile ? (
            <>
              <Box sx={{ overflowX: "auto", width: "100%" }}>
                <SwipeableViews
                  axis="x"
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                  resistance
                  style={{
                    padding: "0 10px",
                  }}
                  slideStyle={{
                    padding: "0 5px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {images.map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        minWidth: "90%",
                        px: 1,
                      }}
                    >
                      <Box
                        component="img"
                        src={image}
                        alt={`slide-${index + 1}`}
                        sx={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                      />
                    </Box>
                  ))}
                </SwipeableViews>
              </Box>

              <MobileStepper
                steps={images.length}
                position="static"
                activeStep={activeStep}
                nextButton={null}
                backButton={null}
                sx={{
                  background: "transparent",
                  justifyContent: "center",
                  mt: 2,
                  "& .MuiMobileStepper-dot": { 
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                    margin: "0 4px",
                  },
                  "& .MuiMobileStepper-dotActive": {
                    backgroundColor: "#ffcc00",
                  },
                }}
                onClick={(e) => {
                  // Get the index of the clicked dot
                  const dots = Array.from(e.currentTarget.querySelectorAll('.MuiMobileStepper-dot'));
                  const clickedDotIndex = dots.indexOf(e.target);
                  if (clickedDotIndex >= 0) {
                    handleDotClick(clickedDotIndex);
                  }
                }}
              />
            </>
          ) : (
            <Grid container spacing={3}>
              {images.map((image, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box
                    component="img"
                    src={image}
                    alt={`card-${index + 1}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NativeIngredientsSection;
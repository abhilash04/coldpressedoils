import React from "react";
import { Box, Typography, Button } from "@mui/material";
import bnr1 from "../../../assets/bnr4.jpg";

const InnerBanner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "260px", // Reduced height
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${bnr1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            height: "100%",
            // width: "100%",
            background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            px: { xs: 3, md: 10 },
            color: "white",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}> {/* Reduced from h2 */}
            Sacred Yagya Ceremonies
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, maxWidth: { xs: "100%", md: "60%" } }}> {/* Reduced from h5 */}
            Experience ancient Vedic rituals for spiritual growth and prosperity
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default InnerBanner;
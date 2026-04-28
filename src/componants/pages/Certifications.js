import React from "react";
import { Box, Typography, Avatar, Paper, Rating, Button } from "@mui/material";

import logo1 from "../../assets/anv-ftr-1.png";
import logo2 from "../../assets/anv-ftr-1.png";
import logo3 from "../../assets/anv-ftr-3.png";
import logo4 from "../../assets/anv-ftr-4.png";
import logo5 from "../../assets/anv-ftr-5.png";
import logo6 from "../../assets/anv-ftr-6.png";
import logo7 from "../../assets/anv-ftr-7.png";
import logo8 from "../../assets/anv-ftr-8.png";

const Certifications = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          mx: "auto",
          py: 4,
          px: { xs: 2, md: "none" },
          gap: { xs: 0.725, md: 1.5 },
          flexWrap: "wrap",
        }}
      >
        {[logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8].map(
          (src, idx) => (
            <Box
              key={idx}
              component="img"
              src={src}
              alt={`logo-${idx}`}
              sx={{
                height: 65, // adjust as needed for "logo size"
                width: "auto",
                maxWidth: { xs: 110, md: "none" },
              }}
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default Certifications;

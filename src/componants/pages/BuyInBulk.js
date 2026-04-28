import React from "react";
import { Box, Typography, Avatar, Paper, Rating, Button } from "@mui/material";


const BuyInBulk = () => {
  return (
    <Box>
      <Box sx={{ backgroundColor: "#064d41" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            maxWidth: "1200px",
            mx: "auto",
            py: 4,
            px: { xs: 2, md: "none" },
            color: "#fff",
            flexWrap: "wrap", // makes it responsive
          }}
        >
          {/* Left Column - 65% */}
          <Box
            sx={{
              flex: "0 0 65%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Looking to buy in bulk?
            </Typography>
            <Typography variant="body1" sx={{width: { xs: "100%", md: "80%" }, textAlign: "center" }}>
              Our wholesale team is available and will assist you during the
              process.
            </Typography>
          </Box>

          {/* Right Column - 35% */}
          <Box
            sx={{
              flex: "0 0 35%",
              display: "flex",
              justifyContent: "flex-end",
              mt: { xs: 2, md: 0 },
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#D4B66A",
                color: "#000",
                fontWeight: 600,
                px: 2,
                "&:hover": {
                  backgroundColor: "#c6a956",
                },
              }}
            >
              Get In Touch
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BuyInBulk;

import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import cowServiceImg from "../../../assets/cow-service_6867e79f47e06bd.jpg"; // <-- replace with actual image path

const DonationGauSeva = () => {
  return (
    <Box sx={{ bgcolor: "#f7f8fa" }}>
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          maxWidth: "800px", // Adjusted for better layout
          mx: "auto", // Centered horizontally
        }}
      >
        <Grid container spacing={3}>
          {/* Left: Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: "100%",
              }}
            >
              <img
                src={cowServiceImg}
                alt="Cow Service"
                style={{
                  width: "100%",
                  height: "390px",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>

          {/* Right: Content */}
          <Grid item xs={12} md={6} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Box sx={{ p: { xs: 0, md: 1 } }}>
              <Typography variant="h6" fontWeight={700}>
                Any Donation for Gau Seva
              </Typography>
              <Typography sx={{ mt: 1, mb: 2 }} color="text.secondary">
                Enter the amount of your choice
              </Typography>

              <TextField
                placeholder="Enter Amount ₹"
                size='small'
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#064d41",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.2,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#067461ff",
                  },
                }}
              >
                Add Donation
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DonationGauSeva;

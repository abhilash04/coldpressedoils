import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const stats = [
  {
    value: "10,00,000 +",
    label: "Puja is done",
    bg: "linear-gradient(135deg, #e0f2ff, #e0f2ff)", // light blue
    color: "#007bff",
  },
  {
    value: "300,000 +",
    label: "Happy Devotees",
    bg: "linear-gradient(135deg, #f3e5f5, #e1bee7)", // light purple
    color: "#6a1b9a",
  },
  {
    value: "100 +",
    label: "Famous Temples in India",
    bg: "linear-gradient(135deg, #ffe0e0, #ffcccc)", // light pink
    color: "#d32f2f",
  },
  {
    value: "1 Resolution",
    label: "Spreading Sanatan Dharma",
    bg: "linear-gradient(135deg, #ffe9c6, #ffd699)", // light orange
    color: "#ff6f00",
  },
];

const PujaStatsSection = () => {
  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto" }}>
      <Box sx={{ textAlign: "left", py: 6, px: 2 }}>
        <Typography variant="h4" fontWeight={700} mb={2}>
          Start your Sacred Journey with Sri Mandir Puja Service
        </Typography>
        <Typography variant="subtitle1" color="black" mb={4}>
          Why book Sri Mandir Online Puja?
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {stats.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  background: item.bg,
                  borderRadius: 2,
                  px: 3,
                  py:1.5,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ color: item.color, mb: 0.4 }}
                >
                  {item.value}
                </Typography>
                <Typography variant="subtitle2"  sx={{ color: item.color,}}>
                  {item.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PujaStatsSection;

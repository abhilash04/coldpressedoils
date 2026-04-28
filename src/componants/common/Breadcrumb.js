import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Background from "../../assets/bnr1.png";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";

const Breadcrumb = ({ values }) => {
  const navigate = useNavigate();
  const breadcrumbData = values;

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "180px", md: "250px" }, // Reduce height for mobile
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center content on mobile
          justifyContent: "center",
          textAlign: "center",
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          px: { xs: 2, md: 8 }, // Less padding on mobile
        }}
      >
        <Typography
          sx={{
            fontSize: { md: "40px", xs: "20px" },
            color: "#fff",
            fontWeight: "600",
            // fontFamily: "'Rajdhani', sans-serif",
            // textTransform: "uppercase",
          }}
        >
          {breadcrumbData[breadcrumbData.length - 1]?.label ||
            breadcrumbData[breadcrumbData.length - 1]}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "8px 16px",
            borderRadius: "4px",
            mt: 1,
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <HouseRoundedIcon
              sx={{ color: "#007BFF", fontSize: { md: 22, xs: 18 }, mr: 1 }}
            />
          </Box>

          {breadcrumbData.map((label, index) => {
            const isLast = index === breadcrumbData.length - 1;
            return (
              <Box key={label} sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontSize: { md: 16, xs: 12 },
                    color: "#fff",
                    fontWeight: "400",
                  }}
                >
                  {label}
                </Typography>
                {!isLast && (
                  <EastRoundedIcon
                    fontSize="small"
                    sx={{ color: "#fff", mx: 1 }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Breadcrumb;


import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Card,
} from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import cowImg from "../../../assets/don-image-_10681609e503ff1.png";
import cowImg1 from "../../../assets/don-image-_3667f4cf2c93fdf.jpg";

const donationItems = [
  { name: "Dry Cake Seeds 30 kg", price: 650 },
  { name: "Jaggery 40 Kg", price: 1000 },
  { name: "Barley Flour 100 kg", price: 2000 },
  { name: "Medicines for cows", price: 2100 },
  { name: "Wheat Bran 650 kg", price: 17000 },
  { name: "2 Trolley Green Grass", price: 21000 },
];

const CowDonationSection = () => {
  const [donationType, setDonationType] = React.useState("onetime");
  const [viewMode, setViewMode] = React.useState("grid"); // 'grid' or 'list'

  return (
    <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
      <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
        {/* Heading */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            fontSize: "36px",
          }}
        >
          <Typography fontWeight={700} sx={{ fontSize: "36px" }}>
            Donate For Cow Service [Gau Seva] At ISKCON Vrindavan
          </Typography>
          <ToggleButtonGroup
            value={donationType}
            exclusive
            onChange={(e, val) => val && setDonationType(val)}
            sx={{ borderRadius: 2 }}
          >
            <ToggleButton
              value="onetime"
              size="small"
              sx={{
                backgroundColor:
                  donationType === "onetime" ? "#064d41" : "#fff",
                color: donationType === "onetime" ? "#fff" : "#333",
                px: 3,
                borderRadius: "8px 0 0 8px",
                textTransform: "none",
              }}
            >
              One Time
            </ToggleButton>
            <ToggleButton
              value="monthly"
              size="small"
              sx={{
                backgroundColor:
                  donationType === "monthly" ? "#064d41" : "#fff",
                color: donationType === "monthly" ? "#fff" : "#333",
                px: 3,
                borderRadius: "0 8px 8px 0",
                textTransform: "none",
              }}
            >
              Monthly
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Description */}
        <Typography sx={{ color: "#444", mb: 4, fontSize: "18px" }}>
          According to the Skanda Purana, even showing respect to cows can help
          cleanse our sinful acts. By maintaining and serving cows with love and
          care, we not only catch the attention of Lord Krishna but also please
          Him. Gauseva [Cow Service] bestows immense spiritual benefits. <br />
          Additionally, the presence of cows in our surroundings is believed to
          remove negative energies and bring positive energy. Cows are glorified
          as Mothers of the universe in vedas.
        </Typography>

        {/* Expenses Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 4,
            backgroundColor: "rgba(247, 248, 250, 1)",
          }}
        >
          <Typography fontWeight={700} sx={{ fontSize: "32px" }}>
            One Day Maintenance Expenses
          </Typography>
          <Box>
            <IconButton
              onClick={() => setViewMode("grid")}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                mr: 1,
                backgroundColor: viewMode === "grid" ? "#f50057" : "#fff",
                color: viewMode === "grid" ? "#fff" : "#000",
              }}
            >
              <ViewModuleIcon />
            </IconButton>
            <IconButton
              onClick={() => setViewMode("list")}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                backgroundColor: viewMode === "list" ? "#f50057" : "#fff",
                color: viewMode === "list" ? "#fff" : "#000",
              }}
            >
              <ViewListIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Donation Cards */}
        <Grid
          container
          spacing={2}
          sx={{ backgroundColor: "rgba(247, 248, 250, 1)" }}
        >
          {donationItems.map((item, i) => (
            <Grid
              item
              key={i}
              xs={12}
              sm={viewMode === "grid" ? 6 : 12}
              md={viewMode === "grid" ? 4 : 12}
            >
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  py: 1.5,
                }}
              >
                {/* Text content on left */}

                <Box sx={{ width: 80, height: 80, mr: 2 }}>
                  <img
                    src={cowImg}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                </Box>
                {/* Image on right */}
                <Box sx={{ flex: 1 }}>
                  {/* Name at top */}
                  <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
                    {item.name}
                  </Typography>

                  {/* Price and button row at bottom */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
                      ₹ {item.price.toLocaleString()}
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#ccc",
                        textTransform: "none",
                        fontWeight: 500,
                        color: "grey",
                        px: 2,
                        ml: 1,
                        height: "fit-content",
                        "&:hover": {
                          backgroundColor: "#064d41", // change this to your desired hover bg color
                          borderColor: "#ccc", // keep border color same or change if needed
                          color: "white",
                        },
                      }}
                    >
                      {donationType === "monthly"
                        ? "Subscribe"
                        : "Add Donation"}
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Expenses Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 2,
            backgroundColor: "rgba(247, 248, 250, 1)",
          }}
        >
          <Typography fontWeight={700} sx={{ fontSize: "32px" }}>
            Feed Cows
          </Typography>
        </Box>

        {/* Donation Cards */}
        <Grid
          container
          spacing={2}
          sx={{ backgroundColor: "rgba(247, 248, 250, 1)" }}
        >
          {donationItems.map((item, i) => (
            <Grid
              item
              key={i}
              xs={12}
              sm={viewMode === "grid" ? 6 : 12}
              md={viewMode === "grid" ? 4 : 12}
            >
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  py: 1.5,
                }}
              >
                {/* Text content on left */}

                <Box sx={{ width: 80, height: 80, mr: 2 }}>
                  <img
                    src={cowImg1}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                </Box>
                {/* Image on right */}
                <Box sx={{ flex: 1 }}>
                  {/* Name at top */}
                  <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
                    {item.name}
                  </Typography>

                  {/* Price and button row at bottom */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
                      ₹ {item.price.toLocaleString()}
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#ccc",
                        textTransform: "none",
                        fontWeight: 500,
                        color: "grey",
                        px: 2,
                        ml: 1,
                        height: "fit-content",
                        "&:hover": {
                          backgroundColor: "#064d41", // change this to your desired hover bg color
                          borderColor: "#ccc", // keep border color same or change if needed
                          color: "white",
                        },
                      }}
                    >
                      {donationType === "monthly"
                        ? "Subscribe"
                        : "Add Donation"}
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CowDonationSection;

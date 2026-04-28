import React, { useState } from "react";
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Button,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import img1 from "../../../assets/BalaramMahaYagya.jpg";
import img2 from "../../../assets/RadhashtamiMahaYagya.jpg";
import img3 from "../../../assets/SudarshanMahaYagya.jpg";
import img4 from "../../../assets/Homas.gif";

const upcomingEvents = [
  {
    title: "Sri Balaram Purnima Maha Yagya",
    date: "9 August, 2025 on Balaram Purnima",
    image: img1,
  },
  {
    title: "Sri Radhastami Maha Yagya",
    date: "31 August, 2025 on Radhastami",
    image: img2,
  },
];

const completedEvents = [
  {
    title: "Sri Sudarshan Narsimha Yagya",
    date: "1 August, 2025 on Swati Nakshatra",
    image: img3,
  },
];

const YagyasHomas = () => {
  const [view, setView] = useState("upcoming");

  const handleToggle = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const events = view === "upcoming" ? upcomingEvents : completedEvents;

  return (
    <Box sx={{ px: 4, py: 3 }}>
      {/* Header Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight={600} sx={{ color: "#111928" }}>
          Yagyas & Homas
        </Typography>

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleToggle}
          sx={{
            border: "1px solid #eee",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <ToggleButton
            value="upcoming"
            size="small"
            sx={{
              px: 3,
              color: view === "upcoming" ? "#fff" : "#064d41", // White when selected, dark green when not
              bgcolor: view === "upcoming" ? "#064d41" : "#fff", // Dark green when selected, white when not
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              border: "none",
              "&:hover": {
                bgcolor: view === "upcoming" ? "#064d41" : "#fff",
              },
            }}
          >
            Upcoming
          </ToggleButton>
          <ToggleButton
            value="completed"
            size="small"
            sx={{
              px: 2,
              color: view === "completed" ? "#fff" : "#064d41", // White when selected, dark green when not
              bgcolor: view === "completed" ? "red" : "#fff", // Dark green when selected, white when not
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              border: "none",
              "&:hover": {
                bgcolor: view === "completed" ? "red" : "#fff",
              },
            }}
          >
            Completed
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Sub Heading */}
      <Box
        display="flex"
        sx={{ borderLeft: "5px solid #00584b", pl: 2,mb:2 }}
      >
        {/* Small GIF image */}
        <Box
          component="img"
          src={img4}
          alt="Decorative GIF"
          sx={{ width: 50, height: 50, pr: 2 }}
        />

        {/* Text Section */}
        <Box>
          <Typography variant="h5" fontWeight={600} sx={{ color: "#111928" }}>
            August 2025
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }} color="text.secondary">
            Month of Krishna’s Birth & Blissful Celebrations
          </Typography>
        </Box>
      </Box>

      {/* Event Cards */}
      <Grid container spacing={3}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={event.image}
                alt={event.title}
                sx={{ object: "contain" }}
              />
              <CardContent>
                <Typography fontWeight={600} sx={{ fontSize: "1rem" }}>
                  {event.title}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                  <EventIcon sx={{ color: "#e53935", fontSize: 20 }} />
                  <Typography sx={{ fontSize: "0.875rem", color: "black" }}>
                    {event.date}
                  </Typography>
                </Stack>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#fff",
                      px: 2,
                      color: "rgba(83, 94, 104, 1)",
                      border: "1px solid rgba(177, 185, 189, 1)",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#00584b",
                        color: "#fff",
                        borderColor: "#00584b",
                      },
                    }}
                  >
                    Book Yagya
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default YagyasHomas;

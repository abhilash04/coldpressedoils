import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import img1 from "../../../assets/shiva1.webp";
import img2 from "../../../assets/shiva2.webp";
import img3 from "../../../assets/shiva3.webp";
import img4 from "../../../assets/shiva1.webp";

const yagyaData = [
  {
    tag: "SHRAVANA SOMAVARAM ARUNACHALAM KSHETRA SPECIAL",
    title: "Arunachalam Kshetra Special Rudrabhishek Puja and Homam",
    subtitle:
      "To receive the blessings of Lord Arunachaleshwar and bliss in life.",
    location: "Arunachalam Kshetra, Tiruvannamalai, Tamil Nadu",
    date: "4 August, Monday, Shravana Somavaram",
    image: img1,
  },
  {
    tag: "PUTRADA EKADASHI SPECIAL",
    title: "Putra Kameshti Havan",
    subtitle: "For Blessing for Prosperity and Well-Being of your Children",
    location: "Markandey Mahadev Temple, Kashi, Uttar Pradesh",
    date: "5 August, Tuesday, Ekadashi",
    image: img2,
  },
  {
    tag: "SAWAN KAMLESHWAR MAHADEV EKADASHI SPECIAL",
    title:
      "Kamleshwar Mahadev 1008 Deepotsav with 11 Kamal Archana and Rudrabhishek",
    subtitle: "Blessings for Children’s Health and Life Path",
    location: "Kamleshwar Mahadev Temple, Srinagar, Uttarakhand",
    date: "5 August, Tuesday, Ekadashi",
    image: img3,
  },
  {
    tag: "SAWAN MONDAY BLESSING",
    title: "Somvar Shiv Rudrabhishek Yagya",
    subtitle: "Invoke Lord Shiva's blessings for peace and fulfillment",
    location: "Trimbakeshwar Temple, Nashik, Maharashtra",
    date: "11 August, Monday, Sawan Somvar",
    image: img4,
  },
];

const GauPoojaSection = () => {
  return (
    <Box sx={{ maxWidth: "1300px", mx: "auto" }}>
      <Box sx={{ px: 2, py: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{mb:2}}>
          Upcoming Pujas
        </Typography>
        <Grid container spacing={3}>
          {yagyaData.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    pt: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    color="#bf3a00"
                    sx={{
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontSize: 12,
                      mb: 1,
                    }}
                  >
                    {item.tag}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mb: 0.5 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    olor="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {item.subtitle}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="flex-start"
                    mb={0.5}
                  >
                    <LocationOnIcon
                      fontSize="small"
                      sx={{ mt: "2px", color: "#f57c00" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {item.location}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="flex-start"
                    mb={2}
                  >
                    <CalendarMonthIcon
                      fontSize="small"
                      sx={{ mt: "2px", color: "#f57c00" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {item.date}
                    </Typography>
                  </Stack>

                  <Box mt="auto">
                    <Button
                      fullWidth
                      variant="contained"
                      endIcon={<span>&rarr;</span>}
                      sx={{
                        bgcolor: "#00584b",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        fontSize: 14,
                        "&:hover": {
                          bgcolor: "#0c9681ff",
                        },
                      }}
                    >
                      Participate
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default GauPoojaSection;

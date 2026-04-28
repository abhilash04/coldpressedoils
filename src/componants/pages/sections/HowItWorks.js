import React from 'react';
import { Box, Typography, Grid, List, ListItem, ListItemText, IconButton } from '@mui/material';
import Slider from "react-slick";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import img1 from "../../../assets/img_puja_process_001.webp";
import img2 from "../../../assets/img_puja_process_002.webp";
import img3 from "../../../assets/img_puja_process_003.webp";
import img4 from "../../../assets/img_puja_process_004.webp";

const steps = [
  {
    number: 1,
    title: 'Choose Your Puja',
    description: 'Select your Puja from the List',
  },
  {
    number: 2,
    title: 'Your Information',
    description: 'After selecting the Puja, fill in the information of your Name and Gotra in the provided form.',
  },
  {
    number: 3,
    title: 'Puja video',
    description: 'The video of your Puja completed with your name and Gotra will be shared on WhatsApp.',
  },
  {
    number: 4,
    title: 'Ashirwad Box',
    description: 'Aashirwad Box will be sent to your registered address.',
  },
];

const slides = [
  {
    img: img1,
    title: 'Vyapar Vruddhi Maha Puja',
    location: 'Location of the Temple',
    date: 'Aug 15, 2021 - 7pm IST',
  },
  {
    img: img2,
    title: 'Puja 2',
    location: 'Location info',
    date: 'Date info',
  },
  {
    img: img3,
    title: 'Puja 3',
    location: 'Location info',
    date: 'Date info',
  },
  {
    img: img4,
    title: 'Puja 4',
    location: 'Location info',
    date: 'Date info',
  },
];

// Custom arrow components for slick slider
const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: 'absolute',
      top: '50%',
      right: 8,
      transform: 'translateY(-50%)',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.3)',
      '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
      zIndex: 10,
    }}
    aria-label="Next Slide"
  >
    <ArrowForwardIosIcon />
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: 'absolute',
      top: '50%',
      left: 8,
      transform: 'translateY(-50%)',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.3)',
      '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
      zIndex: 10,
      
    }}
    aria-label="Previous Slide"
  >
    <ArrowBackIosNewIcon />
  </IconButton>
);

const HowItWorks = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 4 }, pb: 6,pt:2 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        How does Sri Mandir Online Puja Works?
      </Typography>
      <Box sx={{ borderBottom: '2px solid #ccc',  mb: 4 }} />

      <Grid container spacing={2.5} >
        {/* Left side: steps */}
        <Grid item xs={12} md={6}>
          <List disablePadding>
            {steps.map(({ number, title, description }) => (
              <ListItem key={number} disableGutters sx={{ mb: 2 }}>
                <Box
                  sx={{
                    backgroundColor: '#FF5700',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 14,
                    pl: 1.5,
                    borderRadius: '0 4px 4px 0',
                    mr: 2,
                    display: 'inline-block',
                    minWidth: 24,
                    textAlign: 'center',
                    userSelect: 'none',
                  }}
                >
                  {number}
                </Box>
                <ListItemText
                  primary={<Typography fontWeight="bold" sx={{fontSize:'22px'}}>{title}</Typography>}
                  secondary={description}
                  primaryTypographyProps={{ component: 'span' }}
                  secondaryTypographyProps={{ component: 'span', color: 'text.secondary', fontSize: 16 }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Right side: carousel */}
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: 450, mx: 'auto', position: 'relative',}}>
            <Slider {...settings}>
              {slides.map(({ img, title, location, date }, i) => (
                <Box
                  key={i}
                  sx={{
                    backgroundColor: '#ff6f00',
                    borderRadius: 2,
                    p: 2,
                    color: 'white',
                    position: 'relative',
                  }}
                >
                  <Box
                    component="img"
                    src={img}
                    alt={title}
                    sx={{
                      borderRadius: "20px",
                      width: '100%',
                      height: 400,         // Decreased height for images
                      mb: 2,
                      objectFit: 'cover',
                    }}
                  />

                </Box>
              ))}
            </Slider>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HowItWorks;

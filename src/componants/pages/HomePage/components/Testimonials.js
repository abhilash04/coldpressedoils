import React from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, Rating } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: 'Anjali Sharma',
    city: 'Pune',
    rating: 5,
    text: 'The aroma of the groundnut oil takes me back to my childhood. It’s pure, light, and clearly high quality. Never going back to refined oils!',
  },
  {
    name: 'Vikram Malhotra',
    city: 'Mumbai',
    rating: 4.8,
    text: 'Highly impressed with the packaging and the taste. The coconut oil is so clear and fragrant. Delivery was fast too.',
  },
  {
    name: 'Priya Iyer',
    city: 'Chennai',
    rating: 5,
    text: 'The sesame oil is perfect for traditional recipes. You can feel the difference in the wooden ghani pressing. Truly organic!',
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <Box sx={{ py: 10, backgroundColor: '#F9FAF4', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
          Trusted by 50,000+ Families
        </Typography>
        
        <Box sx={{ mx: -2 }}>
          <Slider {...settings}>
            {testimonials.map((t, index) => (
              <Box key={index} sx={{ px: 2, pb: 4 }}>
                <Card sx={{ height: '100%', borderRadius: 0, boxShadow: 'none', border: '1px solid #EAEAEA' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Rating value={t.rating} precision={0.1} readOnly size="small" sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3, minHeight: '80px' }}>
                      "{t.text}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>{t.name[0]}</Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {t.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t.city}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;

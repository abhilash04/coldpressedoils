import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Paper,
  Button,
  Divider,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SEO from '../../common/SEO';

const oilCategories = [
  {
    category: "Culinary Essentials",
    description: "Traditional cooking oils extracted to retain high smoke points and natural nutrients.",
    items: [
      {
        name: "Groundnut Oil 🥜",
        description: "Experience purity in every drop. Crafted from carefully selected premium peanuts and extracted using hygienic, quality-controlled processes to retain natural nutrients and rich aroma.",
        features: ["100% Pure & Natural", "Rich in Healthy Fats", "Enhances Taste & Aroma", "No Added Chemicals"],
        color: "#B7791F"
      },
      {
        name: "Black Mustard Oil 🌾",
        description: "Experience the bold aroma and authentic taste of tradition. Extracted from premium black mustard seeds to retain its natural pungency and nutritional richness.",
        features: ["Strong Natural Aroma", "Rich in Omega Fatty Acids", "No Artificial Colors", "Premium Quality Assurance"],
        color: "#4A5568"
      },
      {
        name: "Yellow Mustard Oil 🌿",
        description: "Bring home the authentic aroma of tradition. Processed with strict hygiene standards to preserve its natural flavor and nutrients for the modern kitchen.",
        features: ["Authentic Flavor", "Strict Hygiene Standards", "Nutrient Preserved", "High Quality Seeds"],
        color: "#D69E2E"
      },
      {
        name: "Sunflower Oil 🌿",
        description: "Widely appreciated for its versatility in cooking. Known for its light consistency and natural richness, it delivers purity and quality in every drop.",
        features: ["Light & Mild Aroma", "Essential Nutrients", "Culinary Versatile", "Pure Cold-Pressed"],
        color: "#ECC94B"
      },
      {
        name: "Safflower Oil 🌿",
        description: "Known for its smooth consistency and versatile applications in culinary and wellness use. Brings trusted purity in every drop.",
        features: ["Smooth Consistency", "Essential Fatty Acids", "Trusted Purity", "Cold-Pressed Quality"],
        color: "#F6AD55"
      }
    ]
  },
  {
    category: "The Coconut Collection",
    description: "Nature's multipurpose gift for health, skin, and culinary delight.",
    items: [
      {
        name: "Coconut Oil 🌿",
        description: "Carefully processed from high-quality coconuts to retain its purity, mild aroma, and essential nutrients. A perfect balance of tradition.",
        features: ["High-Quality Coconuts", "Mild Aroma", "Essential Nutrients", "Balanced Tradition"],
        color: "#A0AEC0"
      },
      {
        name: "Extra Virgin Coconut Oil 🌿",
        description: "Discover the power of purity. Extracted from fresh, high-quality coconuts using advanced cold-pressed methods to preserve natural aroma and authentic taste.",
        features: ["100% Cold-Pressed", "Naturally Rich in Antioxidants", "Supports Healthy Lifestyle", "Unrefined & Pure"],
        color: "#4FD1C5"
      }
    ]
  },
  {
    category: "Traditional Healing & Wellness",
    description: "Therapeutic oils for body care, rejuvenation, and holistic wellness.",
    items: [
      {
        name: "Castor Oil 🌱",
        description: "Experience the purity of Amrutha Dharee Castor Oil. Extracted using hygienic methods to retain its natural thickness, nutrients, and effectiveness.",
        features: ["Thick, Rich Consistency", "Hygienic Extraction", "Natural Reinforcement", "Premium Therapeutic Grade"],
        color: "#2D3748"
      },
      {
        name: "Neem Oil 🌱",
        description: "Discover the natural power. Extracted from premium neem seeds using hygienic cold-press methods to retain its strong natural properties and purity.",
        features: ["Strong Herbal Properties", "Purity Ensured", "Cold-Pressed Strength", "Traditional Efficacy"],
        color: "#276749"
      },
      {
        name: "Honge Oil (Karanja) 🌱",
        description: "Experience natural strength. Extracted from high-quality Honge seeds to preserve its traditional purity and effectiveness for skin and hair health.",
        features: ["Natural Skin Strength", "Traditional Purity", "Effective Herbals", "Hygienic Extraction"],
        color: "#2F855A"
      },
      {
        name: "Kalonji Oil 🌿",
        description: "Known for its strong antioxidant properties and versatile usage. Every drop reflects purity, strength, and trusted quality for overall wellness.",
        features: ["Strong Antioxidants", "Authentic Aroma", "Trusted Wellness", "Reflected Purity"],
        color: "#1A202C"
      }
    ]
  },
  {
    category: "Nutrient Boosters",
    description: "Specialized oils rich in antioxidants and vitamins for skin, hair, and specific health goals.",
    items: [
      {
        name: "Black Til Oil 🌿",
        description: "Discover the richness of tradition. Extracted from premium black sesame seeds to preserve its natural aroma, deep flavor, and essential nutrients.",
        features: ["Deep Nutty Flavor", "Natural Antioxidants", "Tradition Preserved", "Premium Sesame Seeds"],
        color: "#2D3748"
      },
      {
        name: "White Til Oil 🌿",
        description: "Experience the gentle richness. Extracted from premium white sesame seeds using traditional cold-press methods for a smooth texture.",
        features: ["Smooth & Gentle Texture", "Pleasant Aroma", "Nutrient Dense", "Traditional Extraction"],
        color: "#CBD5E0"
      },
      {
        name: "Walnut Oil 🌿",
        description: "Nourishing properties for culinary and personal care. Every drop reflects purity, quality, and a high concentration of Omega-3.",
        features: ["Rich Omega-3 Content", "Nutty Flavor profile", "Nourishing Quality", "Pure Collection"],
        color: "#744210"
      },
      {
        name: "Badami (Almond) Oil 🌿",
        description: "Known for deep nourishment. Widely used for skin care, hair care, and overall wellness. Light texture with easy absorption.",
        features: ["Rich in Vitamin E", "Easy Absorption", "Skin & Hair Nourishment", "Premium Nutrients"],
        color: "#D69E2E"
      },
      {
        name: "Flax Seed Oil 🌿",
        description: "Ideal for health-conscious individuals. Delivers purity and high nutrition content in every drop. Rich in Omega fatty acids.",
        features: ["High Omega Content", "Wellness Supporting", "Smooth Texture", "Health Conscious Choice"],
        color: "#3182CE"
      },
      {
        name: "Sabja Seed Oil 🌿",
        description: "Soothing properties with a lightweight texture. Nature's goodness in every drop for personal care and wellness applications.",
        features: ["Lightweight Texture", "Soothing Properties", "Skincare Applications", "Natural Goodness"],
        color: "#38A169"
      }
    ]
  }
];

const OurOils = () => {
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ pb: 10 }}>
      <SEO
        title="Our Premium Oil Range - Amrutha Dharee"
        description="Explore our complete collection of wood cold-pressed oils. From culinary essentials like Groundnut and Mustard to healing oils like Neem and Castor."
      />

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          backgroundImage: 'linear-gradient(rgba(45, 106, 79, 0.9), rgba(45, 106, 79, 0.9)), url("https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: '2.5rem', md: '4rem' } }}>
              PREMIUM NATURAL OILS
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, lineHeight: 1.6, fontWeight: 300 }}>
              Experience the purity and wellness of nature with Amrutha Dharee. Our oils are cold-pressed and made from the finest natural ingredients to nourish and rejuvenate your body and mind.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Content Sections */}
      <Container maxWidth="lg" sx={{ mt: -5 }}>
        {oilCategories.map((cat, idx) => (
          <Box key={idx} sx={{ mb: 10 }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  mb: 6,
                  borderRadius: 0,
                  borderLeft: `8px solid ${theme.palette.primary.main}`,
                  bgcolor: '#F9FAF4'
                }}
              >
                <Typography variant="h3" sx={{ color: 'primary.main', mb: 1, fontWeight: 700 }}>
                  {cat.category}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {cat.description}
                </Typography>
              </Paper>
            </motion.div>

            <Grid container spacing={4}>
              {cat.items.map((oil, oilIdx) => (
                <Grid item xs={12} md={6} key={oilIdx}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 0,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-10px)' },
                      border: '1px solid #eee'
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        {oil.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7, minHeight: 80 }}>
                        {oil.description}
                      </Typography>

                      <Divider sx={{ mb: 3 }} />

                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Why Choose This?
                      </Typography>

                      <Grid container spacing={1}>
                        {oil.features.map((feat, fIdx) => (
                          <Grid item xs={12} sm={6} key={fIdx}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CheckCircleIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {feat}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: '#F0F4F2', py: 8, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            Ready to switch to health?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
            Our oils are pressed daily in small batches to ensure you get the freshest nutrients possible.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ px: 6, py: 2, fontSize: '1.1rem' }}
            onClick={() => window.location.href = '/shop'}
          >
            Shop the Collection
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default OurOils;

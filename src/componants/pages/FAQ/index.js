import React from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Breadcrumbs,
  Link
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const FAQPage = () => {
  const faqs = [
    {
      category: 'Product & Quality',
      questions: [
        { q: "What is cold pressed oil?", a: "Cold-pressed oil is extracted at room temperature using a traditional wooden Ghani (Chekku/Kolhu). This process ensures no heat is generated, preserving the oil's natural flavor, nutrients, and antioxidants." },
        { q: "How is it different from refined oil?", a: "Refined oils are extracted using high heat and hazardous chemicals like Hexane. They are also bleached and deodorized, which strips away natural nutrients. Cold-pressed oils are 100% natural and chemical-free." },
        { q: "What is the shelf life of your oils?", a: "Most of our oils have a shelf life of 6-9 months if stored in a cool, dry place away from direct sunlight." }
      ]
    },
    {
      category: 'Orders & Shipping',
      questions: [
        { q: "Do you deliver pan India?", a: "Yes, we deliver across India. Standard delivery takes 3-5 business days." },
        { q: "Is COD available?", a: "Yes, we offer Cash on Delivery for most pincodes in India." },
        { q: "Are there any shipping charges?", a: "Shipping is free for all orders above ₹999. For orders below that, a flat fee of ₹50 is charged." }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        { q: "What is your return policy?", a: "We accept returns within 7 days of delivery only if the product is damaged, wrong, or has a quality issue. Please contact us on WhatsApp with photos to raise a request." },
        { q: "How long do refunds take?", a: "Once approved, refunds are processed to your original payment method within 5-7 business days." }
      ]
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" href="/">Home</Link>
        <Typography color="text.primary">FAQ</Typography>
      </Breadcrumbs>

      <Typography variant="h2" sx={{ mb: 6, textAlign: 'center' }}>Frequently Asked Questions</Typography>

      {faqs.map((group, idx) => (
        <Box key={idx} sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
            {group.category}
          </Typography>
          {group.questions.map((item, i) => (
            <Accordion key={i} sx={{ mb: 1, '&:before': { display: 'none' }, boxShadow: 'none', border: '1px solid #EEE' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>{item.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {item.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ))}
    </Container>
  );
};

export default FAQPage;

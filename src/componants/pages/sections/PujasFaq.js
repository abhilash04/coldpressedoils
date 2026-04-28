import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const faqs = [
  "How are Cows glorified in the Vedic scriptures?",
  "How is Gauseva increase our devotional Service?",
  "How can one contribute towards maintaining and protecting the cows?",
  "What is Gau Seva at ISKCON Vrindavan?",
  "Why is cow protection important in Sanatan Dharma?",
];

export default function PujasFaq() {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto",my:4 }}>
      <Typography variant="h6" fontWeight={700} my={2}>
        All You Need To Know About Donate For Cow Service [Gau Seva] At ISKCON
        Vrindavan
      </Typography>
      <Box
        sx={{
          bgcolor: "#f7f8fa",
          p: 3,
          borderRadius: 1,
          height: 320,
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#064d41 transparent",
          "&::-webkit-scrollbar": {
            width: 8,
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#064d41",
            borderRadius: 4,
          },
        }}
      >
        {faqs.map((question, index) => (
          <Accordion
            key={index}
            disableGutters
            square
            sx={{
              mb: 1,
              boxShadow: "none",
              borderRadius: 1,
              border: "1px solid #eee",
            }}
          >
            <AccordionSummary
              expandIcon={<AddIcon sx={{ color: "#064d41" }} />}
              sx={{
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  transform: "rotate(45deg)",
                },
                px: 2,
                py: 1,
              }}
            >
              <Typography fontWeight={600} sx={{fontSize:'18px'}}>{question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="text.secondary">
                {/* You can add detailed answers here if needed */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}

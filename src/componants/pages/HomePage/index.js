import React from 'react';
import Box from '@mui/material/Box';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import TrustBar from '../../common/TrustBar';
import FeaturedProducts from './components/FeaturedProducts';
import CategoryShowcase from './components/CategoryShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import ProcessWalkthrough from './components/ProcessWalkthrough';
import Testimonials from './components/Testimonials';
import HealthEducation from './components/HealthEducation';
import SEO from '../../common/SEO';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const HomePage = () => {
  return (
    <Box>
      <SEO 
        title="Pure Cold Pressed Oils - Wood Pressed & Chemical Free" 
        description="Authentic wooden ghani cold pressed oils. 100% natural Groundnut, Coconut, Sesame and Mustard oils extracted at room temperature. Shop healthy cooking oils today." 
      />
      <Hero />
      <motion.div {...fadeInUp}>
        <TrustBadges />
      </motion.div>
      <motion.div {...fadeInUp}>
        <FeaturedProducts />
      </motion.div>
      <motion.div {...fadeInUp}>
        <TrustBar />
      </motion.div>
      <motion.div {...fadeInUp}>
        <WhyChooseUs />
      </motion.div>
      <motion.div {...fadeInUp}>
        <HowItWorks />
      </motion.div>
      <motion.div {...fadeInUp}>
        <ProcessWalkthrough />
      </motion.div>
      <motion.div {...fadeInUp}>
        <CategoryShowcase />
      </motion.div>
      <motion.div {...fadeInUp}>
        <HealthEducation />
      </motion.div>
      <motion.div {...fadeInUp}>
        <Testimonials />
      </motion.div>
    </Box>
  );
};

export default HomePage;

import { Grid } from "@mui/material";
import React, { useState } from "react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import HeaderSec from "../../common/HeaderSec";
import GauPoojaSection from "../sections/GauPoojaSection";
import InnerBanner from "../sections/InnerBanner";
import PujaStatsSection from "../sections/PujaStatsSection ";
import HowItWorks from "../sections/HowItWorks";

const Pujas = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from session storage on initial render
  React.useEffect(() => {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);
  return (
    <Grid>
      <Header />
      <HeaderSec  cartItems={cartItems} onCartUpdate={(updatedCart)=>setCartItems(updatedCart)}/>
      <InnerBanner />
      <GauPoojaSection />
      <PujaStatsSection />
      <HowItWorks />
      <Footer />
    </Grid>
  );
};

export default Pujas;

import { Grid } from "@mui/material";
import React, { useState } from "react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import DetailPageSection from "../sections/DetailPageSection";
import HeaderSec from "../../common/HeaderSec";
import TermsandConditionSection from "../sections/TermsandConditionSection";

const TermsandConditions = () => {
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
      <TermsandConditionSection />
      <Footer />
    </Grid>
  );
};

export default TermsandConditions;

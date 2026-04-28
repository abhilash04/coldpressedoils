import { Grid } from "@mui/material";
import React, { useState } from "react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import HeaderSec from "../../common/HeaderSec";
import YagyasAndHomasSection from "../sections/YagyasAndHomasSection";
import InnerBanner from "../sections/InnerBanner";

const YagyasAndHomas = () => {
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
      <YagyasAndHomasSection />
      <Footer />
    </Grid>
  );
};

export default YagyasAndHomas;

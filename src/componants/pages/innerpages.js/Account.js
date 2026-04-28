import { Grid } from "@mui/material";
import React, { useState } from "react";
import HeaderSec from "../../common/HeaderSec";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import AccountSection from "../sections/AccountSection";
import Certifications from "../Certifications";

const Account = () => {
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
      <AccountSection />
      <Certifications />
      <Footer />
    </Grid>
  );
};

export default Account;

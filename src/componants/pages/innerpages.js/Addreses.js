import { Grid } from "@mui/material";
import React, { useState } from "react";
import HeaderSec from "../../common/HeaderSec";
import Header from "../../common/Header";
import AllProductCollection from "../sections/AllProductCollection";
import Footer from "../../common/Footer";
import Certifications from "../Certifications";
import AddressesSection from "../sections/AddresesSection";

const Addreses = () => {
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
      <AddressesSection />
      <Certifications />
      <Footer />
    </Grid>
  );
};

export default Addreses;

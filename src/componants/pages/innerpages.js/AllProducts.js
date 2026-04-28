import { Grid } from "@mui/material";
import React, { useState } from "react";
import HeaderSec from "../../common/HeaderSec";
import Header from "../../common/Header";
import AllProductCollection from "../sections/AllProductCollection";
import CategoryMenuCollection from "../sections/CategoryMenuCollection";
import Footer from "../../common/Footer";

const AllProducts = () => {
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
      <AllProductCollection onCartUpdate={(updatedCart)=>setCartItems(updatedCart)}/>
      <Footer />
    </Grid>
  );
};

export default AllProducts;

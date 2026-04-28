import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import DetailPageSection from "../sections/DetailPageSection";
import HeaderSec from "../../common/HeaderSec";
import RealReviews from "../sections/RealReviews";
import RelatedProducts from "../sections/RelatedProducts";
import DetailPageTestimonials from "../sections/DetailPageTestimonials";

const DetailPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from session storage on initial render
  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Scroll to top when this page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid>
      <Header />
      <HeaderSec
        cartItems={cartItems}
        onCartUpdate={(updatedCart) => setCartItems(updatedCart)}
      />
      <DetailPageSection onCartUpdate={(updatedCart) => setCartItems(updatedCart)} />
      {/* <RealReviews /> */}
      <RelatedProducts onCartUpdate={(updatedCart) => setCartItems(updatedCart)} />
      <DetailPageTestimonials />
      <Footer />
    </Grid>
  );
};

export default DetailPage;

import { Grid } from "@mui/material";
import React, { useState } from "react";
import HeaderSec from "../common/HeaderSec";
import CategoryMenu from "./CategoryMenu";
import HeroSlideshow from "./HeroSlideshow";
import ProductGrid from "./ProductGrid";
import AnveshanPromise from "./AnveshanPromise";
import AnveshanCook from "./AnveshanCook";
import HappyFarmers from "./HappyFarmers";
import Testimonials from "./Testimonials";
import Header from "../common/Header";
import Footer from "../common/Footer";
import RecentlyPurchased from "./RecentlyPurchased";
import GauPooja from "./GauPooja";
import Yagyas from "./Yagyas";
import BuyInBulk from "./BuyInBulk";
import NativeIngredientsSection from "./NativeIngredientsSection";
import BottomNavMobile from "../common/BottomNavMobile ";

const HomePage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSelectCategory = (category) => {
    console.log("Selected category:", category);
    setActiveCategory(category);
  };
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
      <HeaderSec cartItems={cartItems} onCartUpdate={(updatedCart) => setCartItems(updatedCart)} />
      <HeroSlideshow />
      <CategoryMenu activeCategory={activeCategory} onSelectCategory={handleSelectCategory} />
      <RecentlyPurchased onCartUpdate={(updatedCart) => setCartItems(updatedCart)} />
      <AnveshanPromise />
      <NativeIngredientsSection />
      <GauPooja />
      <BuyInBulk />
      <Yagyas />
      <ProductGrid onCartUpdate={(updatedCart) => setCartItems(updatedCart)} />
      <Testimonials />
      <Footer />
      <BottomNavMobile />
    </Grid>
  );
};

export default HomePage;
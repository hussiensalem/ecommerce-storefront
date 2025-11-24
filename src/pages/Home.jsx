import React from "react";
import Hero from "../components/Hero";
import NewArrivalsCarousel from "../components/NewArrivals";
import ShopCollection from "../components/ShopCollection";
import BestSeller from "../components/BestSeller";
import headphone1 from "../assets/headphone1.png";
import headphone2 from "../assets/headphone2.png";
import headphone3 from "../assets/headphone3.png";
import headphone4 from "../assets/headphone4.png";
import earbuds1 from "../assets/earbuds1.png";
import PromotionSection from "../components/PromotionBanner";
import FeatureSection from "../components/FeaturesBar";
import InstagramFeed from "../components/InstagramFeed";
import { useEffect } from "react";

const products = [
  {
    id: 1,
    name: "Sony - WH-1000XM5 Wireless Noise Canceling",
    price: "$299.99",
    image: headphone1,
    isHot: true,
    isNew: true,
    rating: 5,
  },
  {
    id: 2,
    name: "Beats Studio Pro",
    price: "$349.99",
    image: headphone2,
    isHot: true,
    isNew: false,
    rating: 5,
  },
  {
    id: 3,
    name: "Sony - WH-CH720N Wireless Noise Canceling",
    price: "$149.99",
    image: headphone3,
    isHot: true,
    isNew: true,
    rating: 5,
  },
  {
    id: 4,
    name: "Skullcandy - Rail True Wireless Earbuds",
    price: "$79.99",
    image: headphone4,
    isHot: true,
    isNew: false,
    rating: 5,
  },
  {
    id: 5,
    name: "Beats Studio Pro",
    price: "$249.99",
    image: earbuds1,
    isHot: true,
    isNew: true,
    rating: 5,
  },
  {
    id: 6,
    name: "JBL Reflect Flow Pro Bluetooth Truly Wireless Sports",
    price: "$179.95",
    image: headphone1,
    isHot: true,
    isNew: false,
    rating: 5,
  },
  {
    id: 7,
    name: "Bose QuietComfort Headphones",
    price: "$349.00",
    image: headphone2,
    isHot: true,
    isNew: false,
    rating: 5,
  },
  {
    id: 8,
    name: "AKG Y600NC Wireless",
    price: "$349.99",
    image: headphone3,
    isHot: true,
    isNew: true,
    rating: 5,
  },
];

const Home = () => {
  useEffect(() => {
    // Scroll to top when Home page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <Hero />
      {/* New Arrivals Section */}
      <NewArrivalsCarousel products={products} />
      {/* Shop Collection Section */}
      <ShopCollection />
      {/* Best Seller Section */}
      <BestSeller products={products} />
      {/* Promotion banner Section*/}
      <PromotionSection />
      {/* Features bar Section */}
      <FeatureSection />
      {/* Instagram feed Section */}
      <InstagramFeed />
    </div>
  );
};

export default Home;

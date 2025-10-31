import React from "react";
import NewArrivalsCarousel from "../components/NewArrivals";
import headphone1 from "../assets/headphone1.png";
import headphone2 from "../assets/headphone2.png";
import headphone3 from "../assets/headphone3.png";
import headphone4 from "../assets/headphone4.png";
import earbuds1 from "../assets/earbuds1.png";

const products = [
  {
    id: 1,
    name: "Skullcandy - Crusher ANC 2 Wireless Headphones",
    price: "$299.99",
    image: headphone1,
    isNew: true,
  },
  {
    id: 2,
    name: "Beats Studio Pro",
    price: "$349.99",
    image: headphone2,
    isNew: false,
  },
  {
    id: 3,
    name: "Sony - WH-CH720N Wireless Noise Cancelling",
    price: "$149.99",
    image: headphone3,
    isNew: true,
  },
  {
    id: 4,
    name: "Skullcandy - Rail True Wireless Earbuds",
    price: "$79.99",
    image: earbuds1,
    isNew: false,
  },
  {
    id: 5,
    name: "Beats Studio Pro",
    price: "$224.99",
    image: headphone4,
    isNew: true,
  },
];

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <NewArrivalsCarousel products={products} />
    </div>
  );
};

export default Home;

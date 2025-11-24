import React from "react";
import { useEffect } from "react";
import Shop from "../components/shop";

const Products = () => {
  useEffect(() => {
    // Scroll to top when Products page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Shop />
    </>
  );
};

export default Products;

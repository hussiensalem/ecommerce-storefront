import React from "react";
import ProductCard from "./ProductCard";

function ProductsSection() {
  const products = [
    {
      id: 1,
      name: "Gentle Cleanser",
      image: "/assets/product1.jpg",
      price: "$25.00",
    },
    {
      id: 2,
      name: "Hydrating Serum",
      image: "/assets/product2.jpg",
      price: "$30.00",
    },
    {
      id: 3,
      name: "Moisturizing Cream",
      image: "/assets/product3.jpg",
      price: "$35.00",
    },
    {
      id: 4,
      name: "Glow Sunscreen",
      image: "/assets/product4.jpg",
      price: "$20.00",
    },
  ];

  return (
    <section className="py-20 px-10 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Featured Products</h2>
        <p className="text-gray-600 mt-3">Carefully selected to give you the best experience.</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductsSection;

import React from "react";
import ProductCard from "../components/ProductCard";

function Products() {
  const products = [
    { id: 1, name: "Gentle Cleanser", image: "/assets/product1.jpg", price: "$25.00" },
    { id: 2, name: "Hydrating Serum", image: "/assets/product2.jpg", price: "$30.00" },
    { id: 3, name: "Moisturizing Cream", image: "/assets/product3.jpg", price: "$35.00" },
    { id: 4, name: "Glow Sunscreen", image: "/assets/product4.jpg", price: "$20.00" },
    { id: 5, name: "Vitamin C Serum", image: "/assets/product1.jpg", price: "$27.00" },
    { id: 6, name: "Night Repair Cream", image: "/assets/product2.jpg", price: "$40.00" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-10">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
        All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} image={p.image} name={p.name} price={p.price} />
        ))}
      </div>
    </main>
  );
}

export default Products;

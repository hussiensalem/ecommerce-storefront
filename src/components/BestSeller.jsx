import React from "react";
import ProductCard from "./ProductCard";

const BestSeller = ({ products }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-5">
      {/* Header */}
      <div className="flex items-center justify-center md:justify-between mb-10">
        <h2 className="text-[40px] font-semibold text-gray-900 text-center md:text-left">
          Best Seller
        </h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.slice(0, 8).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            isNew={product.isNew}
            isHot={product.isHot}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;

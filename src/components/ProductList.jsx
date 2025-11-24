import React from "react";
import ProductCard from "./ProductCard";

/**
 * Reusable ProductList component
 * Displays a grid of products with loading and error states
 */
const ProductList = ({
  products = [],
  isLoading = false,
  error = null,
  onProductClick = null,
  columns = { sm: 2, md: 3, lg: 5 },
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="w-full aspect-[3/4] bg-gray-300 rounded-lg" />
            <div className="mt-3 h-4 bg-gray-200 rounded w-3/4" />
            <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 font-semibold mb-2">
          Error loading products
        </div>
        <p className="text-gray-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No products found</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} gap-6`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.title}
          // الأفضل أن تكون product.price رقم (مثلاً 199.99)
          price={product.price} 
          // priceLabel للعرض (اختياري)
          priceLabel={product.priceLabel ?? `$${(product.price || 0).toFixed(2)}`}
          isNew={product.isNew}
          isHot={product.isHot}
        />
      ))}
    </div>
  );
};

export default ProductList;

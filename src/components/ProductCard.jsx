import React from "react";

const ProductCard = ({ image, name, price, isNew, isHot }) => {
  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-[3/4] group">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {isNew && (
          <span className="absolute top-3 left-3 z-10 bg-white text-black rounded-md text-[10px] md:text-xs font-semibold px-2 py-1">
            NEW
          </span>
        )}

        {isHot && (
          <span className="absolute top-3 right-3 z-10 bg-white text-black rounded-md text-[10px] md:text-xs font-semibold px-2 py-1">
            HOT
          </span>
        )}

        {/* Add to Cart Button*/}
        <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 rounded-lg bg-black text-white text-sm py-2 opacity-0 group-hover:opacity-100 transition-opacity">
          Add to cart
        </button>
      </div>

      {/* Product Info*/}
      <div className="mt-4 space-y-2">
        <h3 className="text-gray-800 font-medium text-sm leading-tight line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center text-gray-500 text-sm">
          {"★".repeat(5)}
        </div>

        <p className="text-gray-900 font-semibold text-sm">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;

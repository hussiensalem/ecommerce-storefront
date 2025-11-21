import React from "react";

const ProductCard = ({ image, name, price, isNew, isHot, onClick }) => {
  return (
    <div className="flex flex-col">
      <button onClick={onClick} className="text-left group">

        <div className="relative w-full aspect-[3/4]">
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
            <span className="absolute top-3 right-3 z-10 bg-red-500 text-white rounded-md text-[10px] md:text-xs font-semibold px-2 py-1">
              HOT
            </span>
          )}
        </div>

        <h3 className="mt-3 text-sm md:text-base font-medium text-gray-900 truncate">
          {name}
        </h3>

        <div className="flex items-center text-gray-500 text-sm mt-1">
          {"★".repeat(5)}
        </div>

        <p className="text-gray-900 font-semibold text-sm mt-1">{price}</p>
      </button>
    </div>
  );
};

export default ProductCard;

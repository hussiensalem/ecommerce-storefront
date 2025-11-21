import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, image, name, price, isNew, isHot, onClick }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    // If onClick is provided, use it (for backward compatibility)
    if (onClick) {
      onClick();
    } else if (id) {
      // Otherwise, navigate to product details page
      navigate(`/products/${id}`);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const fallbackImage = `https://via.placeholder.com/300x300/CCCCCC/999999?text=No+Image`;

  return (
    <div className="flex flex-col">
      <button onClick={handleClick} className="text-left group">
        <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={imageError ? fallbackImage : image}
            alt={name}
            onError={handleImageError}
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

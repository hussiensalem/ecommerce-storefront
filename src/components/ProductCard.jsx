 // src/components/ProductCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addItem } from "../features/cart/cartSlice";
import { FiShoppingCart } from "react-icons/fi";

const ProductCard = ({
  id,
  image,
  name,
  price,
  priceLabel,
  isNew,
  isHot,
  onClick,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [imageError, setImageError] = useState(false);

  // يحول أي صيغة سعر إلى رقم صالح للحساب والعرض
  const parsePriceToNumber = (p) => {
    if (p == null) return 0;
    if (typeof p === "number") return p;
    const cleaned = String(p).replace(/[^0-9.-]+/g, "");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : 0;
  };

  const handleClick = () => {
    if (onClick) return onClick();
    if (id) navigate(`/products/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!id) return console.warn("Missing product id");
    const priceNum = parsePriceToNumber(price ?? priceLabel);
    dispatch(
      addItem({
        id,
        title: name,
        price: priceNum,
        image,
        qty: 1,
      })
    );
  };

  // للعرض في الكارد: نأخذ الرقم (من price إن هو رقم أو من priceLabel لو لازم)
  const displayPriceNumber = parsePriceToNumber(price ?? priceLabel);

  return (
    <div className="relative group h-full flex flex-col">
      {isNew && (
        <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-0.5 rounded-full text-xs z-10">
          NEW
        </span>
      )}
      {isHot && (
        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs z-10">
          HOT
        </span>
      )}

      <button
        onClick={handleClick}
        className="p-4 bg-white rounded-lg hover:shadow-lg transition relative w-full text-left flex-1 flex flex-col"
      >
        {/* Fixed image container height */}
        <div className="w-full h-48 flex items-center justify-center rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={
              imageError
                ? "https://via.placeholder.com/300x300?text=No+Image"
                : image
            }
            alt={name}
            onError={() => setImageError(true)}
            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Fixed text section - takes remaining space */}
        <div className="flex flex-col flex-1 justify-between mt-3">
          <div>
            <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 min-h-7">
              {name}
            </h3>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              {"★".repeat(5)}
            </div>
          </div>

          <p className="text-gray-900 font-semibold text-sm mt-2">
            ${displayPriceNumber.toFixed(2)}
          </p>
        </div>
      </button>

      {/* Fixed button - always at bottom */}
      <button
        onClick={handleAddToCart}
        className="mt-2 w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition flex-shrink-0 flex items-center justify-center gap-2 text-sm font-semibold"
      >
        <FiShoppingCart className="text-base" />
        <span className="hidden sm:inline">Add to Cart</span>
        <span className="sm:hidden">Add</span>
      </button>
    </div>
  );
};

export default ProductCard;

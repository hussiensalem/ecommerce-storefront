import React from "react";

function ProductCard({ image, name, price }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition transform duration-300 cursor-pointer">
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-blue-600 font-bold mt-2">{price}</p>
      </div>
    </div>
  );
}

export default ProductCard;

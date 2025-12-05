import React from "react";

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="relative bg-white w-[90%] max-w-3xl rounded-2xl shadow-2xl p-6 z-10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-72 object-contain"
            />
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              {product.name}
            </h2>

            <p className="text-gray-500 mb-4">
              {product.category || ""}
            </p>

            <div className="mb-4">
              <span className="text-2xl font-bold">
                ${product.price?.toFixed ? product.price.toFixed(2) : product.price}
              </span>

              {product.oldPrice && (
                <span className="ml-3 text-sm line-through text-gray-400">
                  ${product.oldPrice}
                </span>
              )}
            </div>

            {product.discount && (
              <div className="mb-4 text-sm text-green-600">
                {product.discount}% off
              </div>
            )}

            <p className="text-gray-700 mb-6">
              {product.description || "No description available."}
            </p>

            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-2xl border border-black">
                Add to cart
              </button>
              <button className="px-4 py-2 rounded-2xl bg-black text-white">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;

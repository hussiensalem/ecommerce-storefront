import React from "react";
import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 flex items-center">
      <div className="w-[90%] max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-700 mb-6">
          Checkout will be available soon. We're working on a smooth secure
          flow.
        </p>
        <Link to="/cart" className="px-6 py-3 bg-black text-white rounded-lg">
          Back to Cart
        </Link>
      </div>
    </div>
  );
}

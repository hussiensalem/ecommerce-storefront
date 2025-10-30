import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-10 py-6 bg-white shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">3legant</h1>

      <ul className="flex gap-8 text-gray-700 font-medium">
        <li>
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        </li>
        <li>
          <Link to="/products" className="hover:text-blue-600 transition">Shop</Link>
        </li>
        <li>
          <Link to="#" className="hover:text-blue-600 transition">Contact</Link>
        </li>
      </ul>

      <div className="flex gap-6">
        <button>🛒</button>
        <button>👤</button>
      </div>
    </nav>
  );
}

export default Navbar;

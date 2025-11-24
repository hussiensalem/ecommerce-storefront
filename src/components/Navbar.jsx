// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { useAppSelector } from "../app/hooks";
import { selectCartTotalItems } from "../features/cart/cartSlice";

function Navbar() {
  const [navBg, setNavBg] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  const cartCount = useAppSelector(selectCartTotalItems);

  useEffect(() => {
    const handleScroll = () => setNavBg(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setSearchOpen(false);
  };

  return (
    <header
      className={`w-full transition-all z-50 top-0 sticky duration-300 ${
        navBg
          ? "bg-[#ffffff] shadow-sm"
          : "bg-[linear-gradient(to_right,#FEC04F,#FFCF69,#FFCB5D,#FEC95B,#FFCD62)]"
      }`}
    >
      <div className="text-sm text-center py-2 bg-black text-white">
        30% off storewide — Limited time!{" "}
        <Link to="/products" className="underline cursor-pointer">
          Shop Now
        </Link>
      </div>

      <nav className="flex justify-between items-center px-6 md:px-16 py-5 overflow-x-hidden ">
        <div className="flex items-center gap-4">
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <FiX className="text-2xl text-gray-900" />
              ) : (
                <FiMenu className="text-2xl text-gray-900" />
              )}
            </button>
          </div>

          <h1
            className={`text-xl font-bold transition ${
              navBg ? "text-gray-900" : "text-white"
            }`}
          >
            E-Store.
          </h1>
        </div>

        <ul
          className={`hidden md:flex gap-8 font-medium transition ${
            navBg ? "text-gray-800" : "text-white"
          }`}
        >
          <li>
            <Link
              to="/"
              className="hover:text-blue-600 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li className="relative group">
            <Link
              to="/products"
              className="hover:text-blue-600 flex items-center gap-1 transition duration-200"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-blue-600 transition duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-blue-600 transition duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <div
            className={`hidden md:flex gap-6 text-xl transition items-center ${
              navBg ? "text-gray-800" : "text-white"
            }`}
          >
            <button
              aria-label="Open search"
              onClick={() => setSearchOpen((v) => !v)}
              className="cursor-pointer hover:text-blue-600 transition"
            >
              <FiSearch />
            </button>
            <Link
              to="/signin"
              className="flex items-center gap-2 hover:text-blue-600 transition text-sm font-medium"
            >
              <FiUser />
              <span
                className={`hidden md:inline ${
                  navBg ? "text-gray-800" : "text-white"
                }`}
              >
                Sign In
              </span>
            </Link>

            <Link to="/cart" className="relative inline-flex items-center">
              <FiShoppingBag className="text-xl cursor-pointer hover:text-blue-600 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {searchOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="fixed z-[70] top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md">
            <form
              onSubmit={handleSubmitSearch}
              className="flex items-center gap-2 bg-white/95 border border-gray-300 rounded-full px-3 py-2 shadow-lg"
            >
              <FiSearch className="text-gray-500" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 bg-transparent outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-full bg-black text-white text-xs hover:bg-gray-900"
              >
                Search
              </button>
            </form>
          </div>
        </>
      )}

      {/* mobile menu (kept as in your original) */}
    </header>
  );
}

export default Navbar;

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
  const [showPromoBar, setShowPromoBar] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("promoBarDismissed") !== "true";
  });
  const searchInputRef = useRef(null);

  const cartCount = useAppSelector(selectCartTotalItems);

  useEffect(() => {
    const handleScroll = () => setNavBg(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (showPromoBar) {
      localStorage.removeItem("promoBarDismissed");
    } else {
      localStorage.setItem("promoBarDismissed", "true");
    }
  }, [showPromoBar]);

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
      {showPromoBar && (
        <div className="text-sm text-center py-2 bg-black text-white flex items-center justify-center gap-3 px-4">
          <span>30% off storewide — Limited time!</span>
          <Link to="/products" className="underline cursor-pointer font-semibold">
            Shop Now
          </Link>
          <button
            aria-label="Hide limited time banner"
            className="text-white/70 hover:text-white transition ml-2"
            onClick={() => setShowPromoBar(false)}
          >
            <FiX />
          </button>
        </div>
      )}

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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[40] bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-[50] md:hidden transform transition-transform duration-300 ease-in-out">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>
              <nav className="flex flex-col gap-4">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition font-medium py-2"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition font-medium py-2"
                >
                  Products
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition font-medium py-2"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition font-medium py-2"
                >
                  Contact
                </Link>
              </nav>
            </div>
            <div className="p-6 border-t mt-auto">
              <Link
                to="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium py-2 mb-4"
              >
                <FiUser />
                <span>Sign In</span>
              </Link>
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium py-2 relative"
              >
                <FiShoppingBag />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 left-5 bg-red-600 text-white text-xs px-2 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;

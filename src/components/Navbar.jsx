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

  // Close mobile menu when clicking outside or on link
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setSearchOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
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

      <nav className="flex justify-between items-center px-6 md:px-16 py-5 overflow-x-hidden">
        <div className="flex items-center gap-4">
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX className={`text-2xl transition ${
                  navBg ? "text-gray-900" : "text-white"
                }`} />
              ) : (
                <FiMenu className={`text-2xl transition ${
                  navBg ? "text-gray-900" : "text-white"
                }`} />
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

        {/* Desktop Menu */}
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
          {/* Mobile Cart Icon */}
          <Link 
            to="/cart" 
            className="md:hidden relative inline-flex items-center"
            onClick={closeMobileMenu}
          >
            <FiShoppingBag className={`text-xl cursor-pointer hover:text-blue-600 transition ${
              navBg ? "text-gray-800" : "text-white"
            }`} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 rounded-full min-w-[20px] text-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Desktop Icons */}
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
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 rounded-full min-w-[20px] text-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
          
          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                  aria-label="Close menu"
                >
                  <FiX className="text-2xl text-gray-900" />
                </button>
              </div>

              {/* Menu Links */}
              <nav className="flex-1 overflow-y-auto py-6">
                <ul className="space-y-1 px-4">
                  <li>
                    <Link
                      to="/"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition font-medium"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition font-medium"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition font-medium"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition font-medium"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Menu Footer with Actions */}
              <div className="border-t p-6 space-y-4">
                <button
                  onClick={() => {
                    setSearchOpen(true);
                    closeMobileMenu();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium text-gray-900"
                >
                  <FiSearch className="text-xl" />
                  <span>Search</span>
                </button>
                
                <Link
                  to="/signin"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 hover:bg-gray-50 rounded-lg transition font-medium text-gray-900"
                >
                  <FiUser className="text-xl" />
                  <span>Sign In</span>
                </Link>

                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black text-white hover:bg-gray-800 rounded-lg transition font-medium relative"
                >
                  <FiShoppingBag className="text-xl" />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full min-w-[24px] text-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Search Modal */}
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
    </header>
  );
}

export default Navbar;

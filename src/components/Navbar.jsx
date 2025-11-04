import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [navBg, setNavBg] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setNavBg(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus desktop search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close floating search on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setSearchOpen(false);
    }
    if (searchOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  // (Mobile) search input is available inside the menu; no separate icon trigger

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    // TODO: Wire this to your search route/action
    // For now, just log and close desktop search bar
    // console.log("Searching:", searchQuery);
    setSearchOpen(false);
  };

  return (
<header className={`w-full transition-all z-50 top-0 sticky duration-300 ${navBg ? "bg-[#ffffff] shadow-sm" : "bg-[linear-gradient(to_right,#FEC04F,#FFCF69,#FFCB5D,#FEC95B,#FFCD62)]"}`}>
      {/* Promo Bar */}
      <div className="text-sm text-center py-2 bg-black text-white">
        30% off storewide — Limited time! <span className="underline cursor-pointer">Shop Now</span>
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-5 overflow-x-hidden ">
        <div className="flex items-center gap-4">
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <FiX className="text-2xl text-gray-900" /> : <FiMenu className="text-2xl text-gray-900" />}
            </button>
          </div>

          {/* Logo */}
          <h1 className={`text-xl font-bold transition ${navBg ? "text-gray-900" : "text-white"}`}>
            E-Store.
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className={`hidden md:flex gap-8 font-medium transition ${navBg ? "text-gray-800" : "text-white"}`}>
          <li><Link to="/" className="hover:text-blue-600 transition duration-200">Home</Link></li>
          <li className="relative group">
            <Link to="/products" className="hover:text-blue-600 flex items-center gap-1 transition duration-200">Products</Link>
          </li>
          <li><Link to="/#" className="hover:text-blue-600 transition duration-200">About</Link></li>
          <li><Link to="/#" className="hover:text-blue-600 transition duration-200">Contact</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          <div className={`hidden md:flex gap-6 text-xl transition ${navBg ? "text-gray-800" : "text-white"}`}>
            <button
              aria-label="Open search"
              onClick={() => setSearchOpen((v) => !v)}
              className="cursor-pointer hover:text-blue-600 transition"
            >
              <FiSearch />
            </button>
            <FiUser className="cursor-pointer hover:text-blue-600 transition" />
          <FiShoppingBag className={`text-xl cursor-pointer hover:text-blue-600 transition ${navBg ? "text-gray-800" : "text-white"}`} />
          </div>

          {/* Mobile search icon removed; search lives inside the menu */}
        </div>
      </nav>

      {/* Desktop search bar (floating overlay) */}
      {searchOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          {/* Floating search */}
          <div className="fixed z-[70] top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md">
            <form onSubmit={handleSubmitSearch} className="flex items-center gap-2 bg-white/95 border border-gray-300 rounded-full px-3 py-2 shadow-lg">
              <FiSearch className="text-gray-500" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 bg-transparent outline-none"
              />
              <button type="submit" className="px-3 py-1.5 rounded-full bg-black text-white text-xs hover:bg-gray-900">
                Search
              </button>
            </form>
          </div>
        </>
      )}

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className={`fixed left-0 top-0 h-screen w-[75%] max-w-[300px] bg-white text-gray-900 flex flex-col overflow-y-auto shadow-lg transform transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Search */}
          <div className="px-8 pt-6">
            <div className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2">
              <FiSearch className="text-gray-500" />
              <input
                ref={mobileSearchInputRef}
                type="text"
                placeholder="Search products..."
                className="w-full text-sm outline-none"
              />
            </div>
          </div>

          {/* Main Navigation */}
          <ul className="px-8 pt-8 space-y-8">
            <li className="w-full">
              <Link to="/" className="block w-full text-2xl font-medium hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="w-full">
              <Link to="/products" className="block w-full text-2xl font-medium hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>
            </li>
            <li className="w-full">
              <Link to="/#" className="block w-full text-2xl font-medium hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
            </li>
            <li className="w-full">
              <Link to="/#" className="block w-full text-2xl font-medium hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>

          {/* Secondary Links */}
          <div className="mt-12 px-8 pb-8">
            {/* Account & Search Section */}
            <div className="space-y-4 mb-8">
              <Link to="/search" className="block text-lg text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Search
              </Link>
              <Link to="/login" className="block text-lg text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="block text-lg text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Create Account
              </Link>
            </div>

            {/* Shipping & Policies */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Information</h3>
              <div className="space-y-2">
                <Link to="/shipping" className="block text-sm text-gray-500 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Shipping Information
                </Link>
                <Link to="/refund-policy" className="block text-sm text-gray-500 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Refund Policy
                </Link>
                <Link to="/terms" className="block text-sm text-gray-500 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Terms of Service
                </Link>
                <Link to="/privacy" className="block text-sm text-gray-500 hover:text-blue-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [navBg, setNavBg] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavBg(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <FiSearch className="cursor-pointer hover:text-blue-600 transition" />
            <FiUser className="cursor-pointer hover:text-blue-600 transition" />
          <FiShoppingBag className={`text-xl cursor-pointer hover:text-blue-600 transition ${navBg ? "text-gray-800" : "text-white"}`} />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className={`fixed left-0 top-0 h-screen w-[75%] max-w-[300px] bg-white text-gray-900 flex flex-col overflow-y-auto shadow-lg transform transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
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

import React from "react";
import { Link } from "react-router-dom";
import newsletterBg from "../assets/newsletter.png";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* Newsletter Section */}
      <section
        className="w-full h-full py-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${newsletterBg})` }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center text-black">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Sign up for deals, new products and promotions
            </p>

            <div className="flex items-center overflow-hidden max-w-lg mx-auto backdrop-blur-sm">
              <Mail className="text-gray-400 w-5 h-5" />

              <input
                type="email"
                placeholder=" Email address"
                className="flex-1 px-6 py-4 outline-none text-black placeholder-gray-400 bg-transparent"
              />
              <button className=" px-8 py-4 text-gray-400">Signup</button>
            </div>
            <hr className="border-gray-400" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black text-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            <div>
              <h1 className="text-xl font-semibold">E-store.</h1>
              <p className="text-sm text-gray-400 mt-1">Electronics Store</p>
            </div>

            <div className="flex gap-10 text-sm">
              <Link to="/">Home</Link>
              <Link to="/products">Product</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>
          <div className="mt-14">
            <hr className="mb-5" />
            <div className="flex flex-col lg:flex-row justify-between items-center  text-xs text-gray-400 gap-4">
              <p>Copyright © 2023 E-store. All rights reserved</p>

              <div className="flex gap-6">
                <Link to="/about">Privacy Policy</Link>
                <Link to="/about">Terms of Use</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

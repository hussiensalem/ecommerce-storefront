import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";
import heroMobile from "../assets/hero-mobile.png";

function Hero() {
  return (
    <section className="relative w-full h-screen flex items-start md:items-center justify-center md:justify-end px-8 md:px-20 pt-0 md:pt-[110px] bg-no-repeat bg-center md:bg-right bg-cover">
      {/* Desktop background (md+) */}
      <div
        className="absolute inset-0 hidden md:block bg-no-repeat bg-cover bg-right"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Mobile background image */}
      <img
        src={heroMobile}
        alt="Hero mobile"
        className="absolute inset-0 w-full h-full object-cover object-center md:hidden"
        style={{ zIndex: 0 }}
      />
      <div className="absolute inset-0"></div>

      <div className="relative z-10 text-gray-900 max-w-[320px] sm:max-w-2xl md:max-w-xl lg:max-w-2xl xl:max-w-3xl md:mr-16 pt-10 text-center md:text-left mx-auto md:mb-20">
        <h1 className="text-5xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
          Listen to the <br />
          <span className="text-blue-700">amazing</span> <br />
          music sound.
        </h1>

        <p className="text-lg sm:text-xl md:text-lg lg:text-xl xl:text-2xl mt-5 sm:mt-6 md:mt-6 mb-7 sm:mb-8 md:mb-8 text-gray-900">
          Experience music like never before.
        </p>

        <Link
          to="/products"
          className="bg-gray-900 text-white text-base sm:text-lg md:text-base lg:text-lg px-8 sm:px-10 md:px-8 lg:px-10 py-3 sm:py-4 md:py-3 rounded-lg font-medium hover:bg-gray-800 transition inline-block"
        >
          Shopping Now
        </Link>
      </div>
    </section>
  );
}

export default Hero;

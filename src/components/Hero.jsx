import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";
import heroMobile from "../assets/hero-mobile.png";

function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] md:h-[calc(100vh-80px)] flex items-start md:items-center justify-center md:justify-end px-4 sm:px-8 md:px-20 pt-24 md:pt-[110px] bg-no-repeat bg-center md:bg-right bg-cover overflow-hidden">
      {/* Desktop background (md+) */}
      <div
        className="absolute inset-0 hidden md:block bg-no-repeat bg-cover bg-right"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Mobile background image */}
      <img
        src={heroMobile}
        alt="Hero mobile"
        className="absolute inset-0 w-full h-full object-cover object-[60%_center] md:hidden"
        style={{ zIndex: 0 }}
      />
      {/* subtle dark overlay on mobile so text stays readable */}
      <div className="absolute inset-0 bg-black/10 md:bg-transparent" />

      <div className="relative z-10 text-gray-900 max-w-[320px] sm:max-w-xl md:max-w-xl lg:max-w-2xl xl:max-w-3xl md:mr-16 pt-6 sm:pt-10 text-center md:text-left mx-auto md:mb-20">
        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight drop-shadow-sm">
          Listen to the <br />
          <span className="text-blue-700">amazing</span> <br />
          music sound.
        </h1>

        <p className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl mt-4 sm:mt-6 md:mt-6 mb-6 sm:mb-8 md:mb-8 text-gray-900 max-w-lg mx-auto md:mx-0">
          Experience music like never before.
        </p>

        <Link
          to="/products"
          className="bg-gray-900 text-white text-sm sm:text-base md:text-base lg:text-lg px-8 sm:px-10 md:px-8 lg:px-10 py-3 sm:py-4 md:py-3 rounded-lg font-medium hover:bg-gray-800 transition inline-block"
        >
          Shopping Now
        </Link>
      </div>
    </section>
  );
}

export default Hero;

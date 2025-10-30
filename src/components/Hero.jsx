import React from "react";

function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-pink-50">
      {/* Text */}
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold text-gray-800 leading-tight">
          Discover the <span className="text-blue-600">3legant</span> Touch
        </h1>
        <p className="text-gray-600 mt-4 mb-8">
          Explore a curated collection of premium skincare and beauty products designed to elevate your daily routine.
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
          Shop Now
        </button>
      </div>

      {/* Image */}
      <img
        src="/assets/hero-image.png"
        alt="Hero"
        className="w-full md:w-1/2 mt-10 md:mt-0"
      />
    </section>
  );
}

export default Hero;

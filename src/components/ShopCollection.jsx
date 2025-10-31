import React from "react";
import collheadphones from "../assets/collheadphones.png";
import collearbuds from "../assets/collearbuds.png";
import usb from "../assets/usb.png";

const ShopCollection = () => {
  return (
    <section className="w-[80%] mx-auto py-16 md:max-w-7xl">
      <h2 className="text-[40px] font-semibold mb-8 text-gray-900 text-center md:text-left">
        Shop Collection
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Headband */}
        <div className="relative rounded-2xl shadow hover:shadow-lg overflow-hidden group row-span-2 md:col-start-1 md:row-start-1">
          <img
            src={collheadphones}
            alt="Headband"
            className="w-full h-full md:h-full object-cover"
          />
          <div className="absolute bottom-5 left-5">
            <h3 className="text-4xl md:text-5xl font-semibold text-gray-900">
              Headband
            </h3>
            <button className="underline text-gray-600 text-lg font-medium flex items-center gap-1 group-hover:gap-2 transition-all py-1 md:py-5">
              Collection →
            </button>
          </div>
        </div>

        {/* Earbuds */}
        <div className="relative rounded-2xl shadow hover:shadow-lg overflow-hidden group">
          <img
            src={collearbuds}
            alt="Earbuds"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-5 left-5 pb-5 ">
            <h3 className="text-3xl md:text-5xl font-semibold text-gray-900">
              Earbuds
            </h3>
            <button className="underline text-gray-600 text-lg font-medium flex items-center gap-1 group-hover:gap-2 transition-all py-1 md:py-5">
              Collection →
            </button>
          </div>
        </div>

        {/* Accessories */}
        <div className="relative rounded-2xl shadow hover:shadow-lg overflow-hidden group">
          <img
            src={usb}
            alt="Accessories"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-5 left-5 pb-5">
            <h3 className="text-3xl md:text-5xl font-semibold text-gray-900">
              Accessories
            </h3>
            <button className="underline text-gray-600 text-lg font-medium flex items-center gap-1 group-hover:gap-2 transition-all py-1 md:py-5">
              Collection →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCollection;

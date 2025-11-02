import React from "react";
import insta1 from "../assets/insta1.png";
import insta2 from "../assets/insta2.png";
import insta3 from "../assets/insta3.png";
import insta4 from "../assets/insta4.png";

const images = [insta1, insta2, insta3, insta4];

const InstagramFeed = () => {
  return (
    <section className="flex items-center justify-center flex-col max-w-7xl mx-auto px-4 mt-15 text-center">
        <p className="text-gray-600 tesxt-bold">
        News feed
      </p>
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Instagram Feed</h2>
      <p className="text-gray-600 mb-8">
        Follow us on Instagram for the latest updates and offers!
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
        {images.map((img, index) => (
          <div key={index} className="overflow-hidden">
            <img
              src={img}
              alt={`Instagram ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;

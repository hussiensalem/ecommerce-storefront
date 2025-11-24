import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PromoImg from "../assets/PromoImg.png";

const PromotionSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 5,
  });

  //Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 bg-white overflow-hidden min-h-[400px] md:min-h-[450px]">
      {/* Left Image */}
      <div className="relative">
        <img
          src={PromoImg}
          alt="Promotion"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Promotion Info */}
      <div className="bg-[#ffdd99] flex flex-col justify-center px-8 py-10 text-gray-900">
        <span className="text-sm font-semibold text-blue-700 uppercase">
          Promotion
        </span>

        <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-2">
          Hurry up! 40% OFF
        </h2>

        <p className="text-gray-700 text-xl mb-6">
          Thousands of high tech are waiting for you
        </p>

        <p className="text-sm uppercase font-semibold mb-3 text-gray-800">
          Offer expires in:
        </p>

        {/* Countdown */}
        <div className="flex gap-3 mb-6">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <div className="bg-white w-20 h-20 flex justify-center items-center">
                <span className="text-4xl font-bold">
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <span className="mt-1 text-xs uppercase text-black-700">
                {unit}
              </span>
            </div>
          ))}
        </div>

        <Link
          to="/products"
          className="inline-block text-center bg-black w-[40%] text-white rounded-2xl  py-3 text-sm hover:bg-gray-900 transition"
        >
          Shop now
        </Link>
      </div>
    </section>
  );
};

export default PromotionSection;

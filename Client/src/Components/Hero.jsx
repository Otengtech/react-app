import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Hero = () => {
  const messages = [
    "WELCOME TO SNEEKERS",
    "WELCOME TO STYLE",
    "WELCOME TO COMFORT",
    "WELCOME TO STREETWEAR",
    "WELCOME TO FASHION",
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Cycle messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative bg-gradient-to-r from-lime-400 via-yellow-200
     to-yellow-300 py-20 px-6 lg:px-32 sm:px-16 items-center justify-center md:flex md:items-center md:justify-between overflow-hidden"
    >
      <div className="z-10 md:w-1/2 text-left space-y-6 animate-fade-in-up">
        <div className="text-black text-lg font-semibold uppercase tracking-widest">
          Style Destination
        </div>
        <h1
          key={currentMessageIndex}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 leading-tight slide-up"
        >
          {messages[currentMessageIndex]}
        </h1>
        <p className="text-gray-700 text-md max-w-lg animate-fade-in-up">
          Where comfort meets style – find the freshest sneakers for every vibe.
        </p>

        <div className="mt-6 animate-fade-in-up">
          <Link to="/allsneakers">
            <button className="bg-gray-900 shadow-md text-lg mr-4 text-white text-sm px-6 py-4 rounded-full hover:bg-gray-800 transition">
              Shop Now
            </button>
          </Link>
          <Link to="/contact">
            <button className="px-6 py-3 rounded-full text-lg shadow-md bg-yellow-500 text-gray-800 hover:bg-yellow-400 transition">
              Contact Us
            </button>
          </Link>
        </div>
        <div className="sm:flex md:flex lg:flex flex mt-6 items-center justify-start space-x-2">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 mt-6 rounded-full text-white ${
                index % 2 === 0 ? "bg-gray-900" : "bg-yellow-500"
              } animate-bounce-custom`}
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Shoe Image */}
      <div className="relative mt-10 md:flex lg:flex md:mt-0 md:w-1/2 justify-center items-center">
        <div className="absolute w-72 h-72 bg-white rounded-full -z-10 top-16 left-1/2 transform -translate-x-1/2 blur-sm opacity-70"></div>

        {/* Shoe image stays centered */}
        <img
          src="images/shoe1.png"
          alt="Sports Shoe"
          className="w-[400px] object-contain drop-shadow-2xl z-10 animate-float"
        />
      </div>
      <div className="text-center flex font-bold text-3xl sm:hidden md:hidden lg:hidden">
        Shop with quality!!
      </div>
    </div>
  );
};

export default Hero;

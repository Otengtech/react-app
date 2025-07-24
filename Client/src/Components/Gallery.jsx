import React, { useState } from "react";
import nike from "../assets/image1.jpg";
import adidas from "../assets/image2.webp";
import puma from "../assets/image3.jpg";
import newBalance from "../assets/image4.webp";
import nikeJordan from "../assets/image5.webp";
import converse from "../assets/image6.webp";
import Footer from "./Footer";

const sneakerImages = [
  {
    url: nike,
    name: "Nike Air Max",
    brand: "Nike",
    description:
      "The Nike Air Max is known for its revolutionary air-cushioning system, offering unmatched comfort and a bold look.",
    facts: [
      "Launched in 1987.",
      "Designed by Tinker Hatfield.",
      "One of Nike's best-selling sneakers.",
    ],
  },
  {
    url: adidas,
    name: "Adidas Ultraboost",
    brand: "Adidas",
    description:
      "Ultraboost features Adidas’ Boost technology, designed to return energy with every step. It's both sporty and stylish.",
    facts: [
      "Debuted in 2015.",
      "Popular among runners and athletes.",
      "Primeknit upper for adaptive fit.",
    ],
  },
  {
    url: puma,
    name: "Puma RS-X",
    brand: "Puma",
    description:
      "The Puma RS-X blends retro style with modern design, featuring bold color-blocking and comfort tech.",
    facts: [
      "Part of Puma’s RS series reboot.",
      "RS stands for Running System.",
      "Known for chunky silhouette.",
    ],
  },
  {
    url: newBalance,
    name: "New Balance 550",
    brand: "New Balance",
    description:
      "Originally a basketball shoe, the 550 has become a streetwear staple thanks to its clean look and comfort.",
    facts: [
      "Originally released in 1989.",
      "Revived in collaboration with Aimé Leon Dore.",
      "Retro aesthetic with premium materials.",
    ],
  },
  {
    url: nikeJordan,
    name: "Nike Air Jordan",
    brand: "Nike Jordan",
    description:
      "A cultural icon, the Air Jordan series revolutionized sneaker design and remains popular in sports and fashion.",
    facts: [
      "Launched in 1985 with MJ himself.",
      "Designed by Peter Moore.",
      "Symbol of basketball and hip-hop culture.",
    ],
  },
  {
    url: converse,
    name: "Converse All Star",
    brand: "Converse",
    description:
      "The Converse All Star, also known as 'Chuck Taylors', is a timeless canvas sneaker worn by generations.",
    facts: [
      "Introduced in 1917.",
      "Endorsed by Chuck Taylor in the 1920s.",
      "Symbol of counterculture and music scenes.",
    ],
  },
];

const Gallery = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="bg-gradient-to-r from-lime-400 via-yellow-200 to-yellow-300 text-white px-6 py-14 min-h-screen">
        <h2 className="text-5xl font-extrabold text-center mb-14 text-gray-600 tracking-wide">
          Sneaker Gallery
        </h2>
        <div className="justify-center flex">
          <p className="p-4 w-full md:w-1/2 text-gray-600 mb-10">
            Welcome to the Sneaker Gallery – Discover a curated collection of the
          most iconic sneakers from top brands like Nike, Adidas, Puma, and
          more. Each pair tells a story of style, performance, and culture.
          Click on your favorite to explore detailed info, fun facts, and what
          makes it legendary in the world of streetwear and sports.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sneakerImages.map((sneaker, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-2xl hover:shadow-yellow-500/40 transition-all duration-300"
              onClick={() => setSelected(sneaker)}
            >
              <img
                src={sneaker.url}
                alt={sneaker.name}
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-xl font-bold text-yellow-400">
                    {sneaker.name}
                  </h3>
                  <p className="text-sm text-white">{sneaker.brand}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal View */}
        {selected && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden p-6 text-gray-900"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-6 text-3xl font-bold text-black"
              >
                &times;
              </button>

              <div className="flex flex-col lg:flex-row items-center gap-6">
                <img
                  src={selected.url}
                  alt={selected.name}
                  className="w-full lg:w-1/2 rounded-xl shadow-xl"
                />

                <div className="flex-1 space-y-4">
                  <h2 className="text-3xl font-bold text-yellow-500">
                    {selected.name}
                  </h2>
                  <h4 className="text-lg font-semibold text-gray-700">
                    Brand: {selected.brand}
                  </h4>
                  <p className="text-gray-800">{selected.description}</p>

                  <ul className="list-disc list-inside mt-3 text-gray-600">
                    {selected.facts.map((fact, i) => (
                      <li key={i}>{fact}</li>
                    ))}
                  </ul>

                  <div className="mt-4">
                    <button
                      onClick={() => setSelected(null)}
                      className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full hover:bg-yellow-500 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Gallery;

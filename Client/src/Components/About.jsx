import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Footer from "./Footer";
import "../App.css"

const About = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);
  return (
    <>
      {loader && <Loader />}

      {!loader && (
        <div className="bg-gray-900 py-24 px-6 text-center relative overflow-hidden">
          {/* Title */}
          <div className="text-center px-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold pb-5 text-yellow-500 drop-shadow-md">
              About Us
            </h1>
            <p className="text-md sm:text-lg md:text-xl text-gray-200 mt-4 max-w-2xl mx-auto">
              Discover what makes{" "}
              <span className="font-semibold text-yellow-400">Sneekers</span> your
              go-to spot for all things sneakers and street style.
            </p>
          </div>

          {/* Info Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-20 py-16 text-gray-800">
            {/* INFO */}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl block font-bold text-yellow-500 pb-4">
                WHO WE ARE
              </h2>
              <p className="leading-relaxed text-gray-200 text-left block">
                At <span className="font-bold">Sneekers</span>, we live and
                breathe sneaker culture. From limited-edition releases to
                everyday streetwear staples, we curate the finest collection for
                sneakerheads and style lovers alike. Whether you're a collector,
                athlete, or fashion-forward individual, you'll find the perfect
                fit with us.
              </p>
            </div>

            {/* OUR MISSION */}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl block font-bold text-yellow-500 pb-4">
                OUR MISSION
              </h2>
              <p className="leading-relaxed text-gray-200 text-left block">
                Our mission is simple: to deliver high-quality sneakers with
                exceptional service, passion, and authenticity. We strive to
                make every customer feel confident, stylish, and inspired by
                providing a diverse range of footwear that blends performance
                and fashion.
              </p>
            </div>

            {/* OUR STORY */}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl block font-bold text-yellow-500 pb-4">
                OUR STORY
              </h2>
              <p className="leading-relaxed text-gray-200 text-left block">
                Founded by sneaker lovers, <strong>Sneekers</strong> started as
                a dream to bridge culture and comfort. What began in a small
                studio has grown into a movement. Today, we work with designers,
                artists, and influencers to bring the most exclusive kicks to
                your doorstep — all with heart, hustle, and heritage.
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default About;

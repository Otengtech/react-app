import React from "react";

const features = [
  {
    icon: "fa-star",
    title: "Premium Quality",
    description:
      "Crafted with top-tier materials and expert stitching, our sneakers are made to withstand the test of time. Experience a blend of comfort, style, and durability with every step.",
  },
  {
    icon: "fa-money-check-dollar",
    title: "Affordable Prices",
    description:
      "Style shouldn’t cost a fortune. We offer fashion-forward sneakers at prices that won’t break the bank — plus regular promotions and deals just for you.",
  },
  {
    icon: "fa-bag-shopping",
    title: "Trendy Collections",
    description:
      "We stay ahead of the curve so you can too. Discover fresh, on-trend designs that match your vibe and elevate your street style.",
  },
];

const ChooseUs = () => {
  return (
    <div className="w-full bg-gray-900 to-yellow-300 flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl sm:text-5xl lg:text-6xl block text-yellow-500 font-bold text-center">
        Why Choose Us
      </h1>
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <p className="text-xl text-gray-200 block mb-8">
            At <span className="font-semibold">Sneekers</span>, we redefine your shopping experience by delivering quality, value, and style — all in one place.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-6 block rounded-2xl bg-white shadow-lg transform transition duration-300 hover:scale-105 flex flex-col items-center text-center"
              >
                <i className={`text-4xl text-yellow-500 fa-solid ${feature.icon}`}></i>
                <h3 className="font-semibold text-xl mt-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700 text-md mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChooseUs;

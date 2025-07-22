import { useEffect, useRef } from "react";
import jordan1 from "../assets/img3.png";
import jordan2 from "../assets/img5.png";
import airforce1 from "../assets/img6.png";
import airforce2 from "../assets/img9.png";
import basket from "../assets/basket2.png";
import basket1 from "../assets/basket1.png";

const latestSneakers = [
  {
    id: 1,
    name: "Air Force",
    image: jordan1,
    price: "$150",
    comment: "This is one of our coolest air forces available."
  },
  {
    id: 2,
    name: "Nike Air Force 1",
    image: jordan2,
    price: "$180",
    comment: "Quality is this one right here, wear it to anyplace."
  },
  {
    id: 3,
    name: "Nike Air Force",
    image: airforce1,
    price: "$220",
    comment: "There is comfort in having this."
  },
  {
    id: 4,
    name: "Nike Air Force",
    image: airforce2,
    price: "$130",
    comment: "Having a refreshing vibe with nice design."
  },
  {
    id: 5,
    name: "Jordan Jump",
    image: basket,
    price: "$110",
    comment: "This one righ here is the jumper for basketball games."
  },
  {
    id: 6,
    name: "Jordan Jump",
    image: basket1,
    price: "$140",
    comment: "Wear this and feel youre on top of everything."
  },
];

const LatestSneakers = () => {
  const scrollRef = useRef(null);
  const animationFrameId = useRef(null);
  const widthRef = useRef(0);
  const isScrollingRef = useRef(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const children = el.children;
    const half = children.length / 2;

    // Calculate width of one set (first half)
    let width = 0;
    for (let i = 0; i < half; i++) {
      width += children[i].offsetWidth;
    }
    widthRef.current = width;

    const scroll = () => {
      if (!isScrollingRef.current || !el) return;

      el.scrollLeft += 1.5;

      if (el.scrollLeft >= widthRef.current) {
        el.scrollLeft = 0;
      }

      animationFrameId.current = requestAnimationFrame(scroll);
    };

    animationFrameId.current = requestAnimationFrame(scroll);

    const handleMouseEnter = () => {
      isScrollingRef.current = false;
      cancelAnimationFrame(animationFrameId.current);
    };

    const handleMouseLeave = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        animationFrameId.current = requestAnimationFrame(scroll);
      }
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-10 bg-gray-900">
      <h2 className="text-3xl md:text-4xl text-yellow-400 font-bold text-center mb-6">
        Latest Sneakers
      </h2>
      <div
        ref={scrollRef}
        className="flex w-full overflow-x-auto no-scrollbar px-4"
        style={{ scrollBehavior: "auto", scrollSnapType: "none" }}
      >
        {[...latestSneakers, ...latestSneakers].map((sneaker, index) => (
          <div
            key={`${sneaker.name}-${index}`}
            className="w-72 flex-shrink-0 bg-white text-black p-4 mx-2 my-2 rounded-2xl shadow-lg transition-transform duration-300 transform hover:scale-105"
          >
            <img
              src={sneaker.image}
              alt={sneaker.name}
              className="w-full h-36 object-contain rounded-xl mb-4"
            />
            <h3 className="text-lg font-bold text-center">{sneaker.name}</h3>
            <p className="text-center text-gray-600">{sneaker.price}</p>
            <p className="text-center text-gray-600">{sneaker.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestSneakers;

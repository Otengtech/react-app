import React, { useState, useEffect, useRef, forwardRef } from "react";
import { db } from "../Auth/FirebaseAuth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import ChooseUs from "./ChooseUs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = forwardRef((props, ref) => {
  const { products, cart, setCart } = props;

  const [reviews, setReview] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  const clearPreview = (e) => {
    e.preventDefault();
    setPreviewUrl(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      toast.info("Item already in cart!", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    } else {
      setCart([...cart, product]);
      toast.success(`${product.name} added to cart! 🛒`, {
        position: "top-right",
        theme: "dark",
        autoClose: 1000,
      });
    }
  };

  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const uploadImageToImgBB = async () => {
    if (!image) return "";
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=69f4521c64f28a3fcff440ca4af10f8e`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.data.url;
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Image upload failed");
      return "";
    }
  };

  const addReview = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || name.trim() === "" || message.trim() === "") {
      toast.error("Input fields shouldn't be empty", { autoClose: 1000 });
      return;
    }

    if (!email.includes("@")) {
      toast.error("Enter a valid email", { autoClose: 1000 });
      return;
    }

    let imageUrl = await uploadImageToImgBB();

    try {
      await addDoc(collection(db, "reviews"), {
        name,
        email,
        message,
        imageUrl,
        timestamp: new Date(),
      });

      toast.success("Review added successfully", { autoClose: 1000 });
      setName("");
      setEmail("");
      setMessage("");
      setImage(null);
      setPreviewUrl(null)
    } catch (err) {
      console.error("Error adding review:", err);
      toast.error("Error adding review", { autoClose: 1000 });
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reviews"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReview(items);
    });
    return () => unsubscribe();
  }, []);

  const reff = useRef(null);

  useEffect(() => {
    let interval;
    if (ref.current) {
      interval = setInterval(() => {
        if (
          ref.current.scrollLeft + ref.current.clientWidth >=
          ref.current.scrollWidth
        ) {
          ref.current.scrollLeft = 0;
        } else {
          ref.current.scrollLeft += 1;
        }
      }, 20); // Continuous scroll speed
    }
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ToastContainer />

      {/* Why Choose Us */}

      <section className="bg-gray-900 py-24 px-6 text-center">
        <h2 className="text-5xl md:text-6xl block font-bold text-yellow-500 mb-6">
          Who We Are
        </h2>
        <p className="text-lg text-gray-100 block max-w-3xl mx-auto mb-12 leading-relaxed">
          At <span className="font-bold text-white">Sneekers</span>, we don’t
          just sell footwear — we inspire movement, confidence, and
          individuality. We believe style should feel as good as it looks.
        </p>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-left">
          {[
            {
              title: "Our Mission",
              desc: "To empower every step you take with confidence, creativity, and comfort. We're dedicated to delivering products that inspire self-expression while keeping you moving forward.",
              icon: "fa-bullseye",
            },
            {
              title: "What We Value",
              desc: "We prioritize sustainability through eco-conscious materials, celebrate innovation with cutting-edge designs, and champion authenticity — because every sole has a story.",
              icon: "fa-seedling",
            },
            {
              title: "Our Vision",
              desc: "To be a global leader in lifestyle footwear — not just by selling shoes, but by setting trends, shaping culture, and making fashion accessible to all.",
              icon: "fa-eye",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-8 bg-white block rounded-2xl shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 animate-fade-in-up flex flex-col items-start"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <i
                className={`fa-solid ${card.icon} block text-yellow-500 text-3xl mb-4`}
              ></i>
              <h3 className="text-2xl font-semibold block text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-700 text-md block leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-28 px-4 bg-white text-center">
        <h2 className="text-4xl sm:text-6xl block my-6 font-bold block text-yellow-500">
          Featured Collections
        </h2>
        <p className="text-lg sm:text-xl block text-gray-800 block mt-3 mb-12 max-w-2xl mx-auto">
          Step into style with our handpicked seasonal highlights.
        </p>

        <div className="flex items-center jusity-center w-full">
          <div
            ref={reff}
            className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto"
          >
            {products.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="flex flex-col bg-gray-100 block rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105"
              >
                {/* Product Image */}
                <div className="bg-white p-4 flex block items-center justify-center">
                  <img
                    src={
                      item.img?.startsWith("http")
                        ? item.img
                        : item.imageUrl || "https://via.placeholder.com/150"
                    }
                    alt={item.name}
                    className="w-48 h-48 block object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* Product Info */}
                <div className="bg-gray-100 text-gray-800 px-6 py-4 flex flex-col gap-3 h-full justify-between">
                  {/* Name & Details */}
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-sm mt-1 text-gray-800 capitalize">
                      {item.type} • {item.gender}
                    </p>
                  </div>

                  {/* Ratings & Size/Price */}
                  <div className="flex flex-col items-center gap-2">
                    {/* Stars */}
                    <div className="flex justify-center text-yellow-500 space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star" />
                      ))}
                    </div>

                    {/* Size and Price */}
                    <div className="flex flex-wrap justify-center items-center gap-3">
                      <span className="bg-white text-gray-800 text-xs px-4 py-1 rounded-full">
                        Size: {item.size}
                      </span>
                      <span className="text-lg font-bold text-gray-800">
                        GH
                        <i className="fa-solid fa-cedi-sign ml-1" />
                        {Number(item?.price ?? 0)}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex items-center gap-2 px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-full transition"
                    >
                      <i className="fa-solid fa-bag-shopping" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ChooseUs />

      {/* Review Form */}
      <section className="py-20 bg-gray-900">
        <div className="text-4xl font-bold block text-center text-yellow-500 mb-16">
          Want to give us a review?
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Side Content */}
          <div className="text-gray-200 space-y-6">
            <h2 className="text-3xl block font-bold text-yellow-500">
              Share Your Thoughts
            </h2>
            <p className="text-lg block">
              We value your feedback and experiences. Whether you loved our
              sneakers, had an issue, or want to share how we can improve — your
              voice matters.
            </p>
            <div className="space-y-4 block">
              <p className="flex items-center gap-3">
                <i className="fa-solid fa-star text-yellow-500 text-xl"></i>
                Every review helps us serve you better.
              </p>
              <p className="flex items-center block gap-3">
                <i className="fa-solid fa-camera text-yellow-500 text-xl"></i>
                Add a photo to show off your new kicks!
              </p>
              <p className="flex items-center block gap-3">
                <i className="fa-solid fa-heart text-yellow-500 text-xl"></i>
                Honest reviews build our community.
              </p>
            </div>
            <div className="flex mt-6 items-center justify-start space-x-2">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 mt-6 rounded-full text-white ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-yellow-500"
                  } animate-bounce-custom`}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Review Form */}
          <form className="w-full p-8 shadow-xl rounded-2xl space-y-6">
            <h3 className="text-center block text-3xl text-gray-200 font-bold mb-6">
              Send a Review
            </h3>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-6 py-4 border text-white bg-transparent block border-gray-400 rounded-full focus:outline-yellow-400"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full px-6 py-4 border text-white bg-transparent block border-gray-400 rounded-full focus:outline-yellow-400"
            />

            {/* File Upload */}
            <div className="flex items-center block gap-4 flex-wrap">
              <label
                htmlFor="image-upload"
                className="cursor-pointer px-4 block py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition"
              >
                Choose Image
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden block"
              />
              <button
                type="button"
                onClick={clearPreview}
                className="px-4 py-2 bg-yellow-500 block text-black rounded-lg hover:bg-yellow-400 transition"
              >
                Clear Image
              </button>
            </div>

            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-w-xs block h-64 object-cover rounded-xl shadow-md mx-auto"
                />
              </div>
            )}

            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Review"
              className="w-full p-4 border block bg-transparent text-white border-gray-400 rounded-xl resize-none focus:outline-yellow-500"
            />

            <button
              type="button"
              onClick={addReview}
              className="w-full bg-yellow-500 block hover:bg-yellow-600 text-black py-3 rounded-full text-lg font-semibold"
            >
              Submit Review
            </button>
          </form>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-16 items-center">
          {/* Left Content */}
          <div className="text-gray-200 space-y-6">
            <h2 className="text-4xl block md:text-5xl font-bold text-yellow-500">
              What Our Customers Say
            </h2>
            <p className="text-lg block leading-relaxed">
              Our sneaker family is growing every day — and our customers have
              plenty to say! Their stories inspire us and help others make
              confident decisions.
            </p>
            <div className="space-y-4">
              <p className="flex block items-center gap-3">
                <i className="fa-solid block fa-comments text-yellow-500 text-xl"></i>
                Real feedback from real sneaker lovers.
              </p>
              <p className="flex block items-center gap-3">
                <i className="fa-solid block fa-thumbs-up text-yellow-500 text-xl"></i>
                Hear what makes our collection stand out.
              </p>
              <p className="flex block items-center gap-3">
                <i className="fa-solid block fa-face-smile-beam text-yellow-500 text-xl"></i>
                Satisfaction that speaks for itself.
              </p>
            </div>
            <div className="flex mt-6 items-center justify-start space-x-2">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 mt-6 rounded-full text-white ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-yellow-500"
                  } animate-bounce-custom`}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Right: Testimonials Carousel */}
          <div className="">
            <div className="text-yellow-500 font-bold text-center text-5xl">
              Reviews
            </div>
            <div
              className="custom-scrollbar flex overflow-x-auto space-x-6 py-8 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {reviews.length === 0 ? (
                <div className="text-gray-500 text-lg w-full">
                  No reviews available.
                </div>
              ) : (
                reviews.map((item) => (
                  <div
                    key={item.id}
                    className="shrink-0 h-64 overflow-y-auto block bg-gray-200 mx-4 w-80 rounded-2xl p-6 hover:scale-105 transition-transform duration-300 snap-center"
                  >
                    <div className="flex block items-center gap-4 mb-2">
                      <img
                        src={item.imageUrl || "https://via.placeholder.com/64"}
                        alt="profile"
                        className="w-16 h-16 block outline outline-gray-500 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold block text-lg text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-sm block text-gray-800">
                          {item.email}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 block mb-4 text-sm">
                      {item.message}
                    </p>
                    <div className="text-yellow-500 flex text-lg mb-6">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="mx-1 block fa-solid fa-star" />
                      ))}
                    </div>
                    
                    <p className="text-gray-800 text-xs">
                      {item.timestamp?.toDate().toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default Home;

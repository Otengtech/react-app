import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader"; // Assumes a loader component exists

const Cart = ({ cart, setCart }) => {
  const [loader, setLoader] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  // Show loader briefly
  useEffect(() => {
    setLoader(true);
    const timeout = setTimeout(() => setLoader(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + Number(item.price || 0) * (item.quantity || 1),
      0
    );
    setTotalAmount(total);
    localStorage.setItem("cartItems", JSON.stringify(cart));
    localStorage.setItem("totalAmount", total.toFixed(2));
    console.log(total);
    
  }, [cart]);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {loader && <Loader />}
      {!loader && (
        <>
          <div className="py-14 px-6 bg-gradient-to-r from-lime-300 via-yellow-200 to-yellow-300 text-center">
            <h1 className="text-5xl drop-shadow-lg text-black font-bold">
              Your Cart
            </h1>
            <p className="text-gray-800 text-xl mt-2">
              View and manage your selected items below.
            </p>
            <Link to="/allsneakers">
              <div className="flex items-center justify-center">
                <div
                  className="w-72 text-sm py-4 mt-4 px-6 rounded-full
             bg-gray-800 text-yellow-500 cursor-pointer"
                >
                  Continue Shopping
                </div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row px-6 py-10 gap-6">
            {/* Cart Items Section */}
            <div className="w-full lg:w-2/3 h-[80vh] overflow-y-scroll pr-4 hide-scrollbar">
              {cart.length === 0 ? (
                <div className="text-2xl text-gray-200 font-semibold text-center">
                  Your cart is empty. Add items to see them here...
                </div>
              ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-2 bg-gray-800 items-center gap-6 rounded-lg shadow-lg transition hover:shadow-xl"
                    >
                      <div className="flex flex-col items-center justify-center p-4">
                        <img
                          src={
                            item.img?.startsWith("http")
                              ? item.img
                              : item.imageUrl ||
                                "https://via.placeholder.com/150"
                          }
                          alt={item.name || "Product Image"}
                          className="w-full h-full rounded-lg object-cover"
                        />

                        <p className="text-yellow-500 font-bold text-xl mt-2">
                          GH<i className="fa-solid fa-cedi-sign"></i>{" "}
                          {Number(item.price).toFixed(1)}
                        </p>
                        <div className="flex items-center text-white justify-center gap-2 mt-1">
                          <span className="text-sm text-center">
                            Size: {item.size}
                          </span>
                          <span className="text-sm text-center">
                            {item.type} • {item.gender}
                          </span>
                        </div>
                      </div>
                      <div className="text-center text-gray-200 p-4">
                        <h2 className="text-lg text-yellow-500 text-center mt-2 font-semibold">
                          {item.name}
                        </h2>

                        <div className="flex items-center justify-center gap-3 mt-3">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-8 h-8 rounded-full bg-gray-300 text-black flex items-center justify-center hover:bg-gray-700 transition"
                          >
                            -
                          </button>
                          <span className="text-white text-lg font-semibold">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-8 h-8 rounded-full bg-gray-300 text-black flex items-center justify-center hover:bg-gray-700 transition"
                          >
                            +
                          </button>
                        </div>
                        <p className="mt-2 text-sm">
                          GH
                          <i className="mr-1 fa-solid fa-cedi-sign"></i>{" "}
                          {(
                            (Number(item?.price) || 0) *
                            (Number(item?.quantity) || 1)
                          ).toFixed(1)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="mt-3 py-2 px-5 text-sm rounded-full bg-yellow-500 text-black transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Section */}
            {cart.length > 0 && (
              <div className="w-full lg:w-1/3">
                <div className="sticky top-6 p-6 text-center bg-gray-700 rounded-lg shadow-xl">
                  <h2 className="text-yellow-500 text-4xl font-bold">
                    Checkout
                  </h2>
                  <p className="text-white mt-2 text-lg">
                    Total Quantity:{" "}
                    {cart.reduce((acc, item) => acc + (item.quantity || 1), 0)}
                  </p>
                  <p className="text-white text-lg mt-2">
                    Total: GH
                    <i className="fa-solid fa-cedi-sign"></i>{" "}
                    {totalAmount.toFixed(2)}
                  </p>
                  <Link to="/checkout" state={{ totalAmount }}>
                    <button className="mt-4 py-3 px-6 text-sm rounded-full bg-yellow-500 text-black transition">
                      Pay Now
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

const deliveryFees = {
  Accra: 20,
  Kumasi: 40,
  Takoradi: 30,
  Tamale: 50,
  "Cape Coast": 45,
};

const CheckOut = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    town: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [baseTotal, setBaseTotal] = useState("0");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedTotal = localStorage.getItem("totalAmount");
    if (savedTotal) setBaseTotal(savedTotal);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      setIsLoggedIn(true);
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        email: user.email || "",
      }));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fee = deliveryFees[formData.town] || 0;
    setDeliveryFee(fee);
  }, [formData.town]);

  const totalWithDelivery = Number(baseTotal) + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError("You must be logged in to complete your purchase.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await axios.post(`${API_URL}/api/pay`, {
        ...formData,
        totalAmount: Math.floor(totalWithDelivery * 100),
      });

      if (res.data?.data?.authorization_url) {
        setSuccess(true);
        window.location.href = res.data.data.authorization_url;
      } else {
        throw new Error("No authorization URL returned");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col md:flex-row px-6 md:px-16 py-12 gap-10">
      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-1/2 flex flex-col justify-center"
      >
        <h2 className="text-3xl font-bold text-yellow-600 mb-4">
          Complete Your Payment
        </h2>
        <p className="text-gray-600 mb-4">
          You're just one step away from getting your items delivered straight to your door!
        </p>
        <p className="text-gray-600 mb-4">
          We deliver from <strong>Koforidua</strong> to all major towns in Ghana. Delivery fees vary based on your location.
        </p>
        <ul className="text-gray-500 list-disc list-inside space-y-2 text-sm">
          <li>Fast and secure Paystack payment gateway</li>
          <li>Delivery in 24–48 hours</li>
          <li>Real-time tracking and SMS confirmation</li>
          <li>Customer support available 24/7</li>
        </ul>
      </motion.div>

      {/* RIGHT SIDE FORM */}
      <motion.form
        onSubmit={handlePayment}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-1/2 p-8 rounded-2xl"
      >
        <h3 className="text-4xl font-semibold text-yellow-600 mb-6 text-center">
          Checkout
        </h3>

        {!isLoggedIn && (
          <div className="text-gray-600 text-sm text-center mb-4">
            Please{" "}
            <span
              onClick={() => navigate("/login")}
              className="underline cursor-pointer text-blue-500"
            >
              log in
            </span>{" "}
            or create an account to continue.
          </div>
        )}

        {/* Full Name */}
        <div className="mb-5">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full px-5 py-3 rounded-full bg-white text-gray-800 border-none shadow-md focus:outline-none"
            disabled={!isLoggedIn}
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email Address"
            className="w-full px-5 py-3 rounded-full bg-white text-gray-800 border-none shadow-md focus:outline-none"
            disabled={!isLoggedIn}
          />
        </div>

        {/* Town Dropdown */}
        <div className="mb-5">
          <select
            name="town"
            value={formData.town}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-full bg-white text-gray-800 border-none shadow-md focus:outline-none"
            disabled={!isLoggedIn}
          >
            <option value="">Select Town</option>
            {Object.keys(deliveryFees).map((town) => (
              <option key={town} value={town}>
                {town}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="mb-6">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Delivery Address"
            className="w-full px-5 py-3 rounded-full bg-white text-gray-800 border-none shadow-md focus:outline-none"
            disabled={!isLoggedIn}
          />
        </div>

        {/* Price Summary */}
        <div className="text-right mb-6 space-y-1 text-sm text-gray-600">
          <div>Subtotal: GHS {Number(baseTotal).toFixed(2)}</div>
          <div>Delivery Fee: GHS {deliveryFee.toFixed(2)}</div>
          <div className="font-bold text-yellow-600 text-lg">
            Total: GHS {totalWithDelivery.toFixed(2)}
          </div>
        </div>

        {/* Messages */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-3">Redirecting to Paystack...</p>}

        {/* Pay Button */}
        <button
          type="submit"
          disabled={loading || !isLoggedIn}
          className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-full transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {/* Back to Cart */}
        <Link to="/cart" className="block mt-4 text-center">
          <button
            type="button"
            className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full"
          >
            Back to Cart
          </button>
        </Link>
      </motion.form>
    </div>
  );
};

export default CheckOut;

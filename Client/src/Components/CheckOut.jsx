import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

const CheckOut = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    town: "",
    address: "",
    postalCode: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [totalAmount, setTotalAmount] = useState("0");

  useEffect(() => {
    const savedTotal = localStorage.getItem("totalAmount");
    if (savedTotal) {
      setTotalAmount(savedTotal);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await axios.post(`https://react-app-backend-ppf7.onrender.com/api/pay`, {
        ...formData,
        totalAmount: Math.floor(Number(totalAmount) * 100), // send amount in kobo (for Paystack)
      });

      if (res.data?.data?.authorization_url) {
        setSuccess(true);
        window.location.href = res.data.data.authorization_url;
      } else {
        throw new Error("No authorization URL returned");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setError("Payment failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-yellow-50 to-white text-gray-800 px-4 md:px-10 py-12">
      
      {/* LEFT SIDE CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="md:w-1/2 flex flex-col justify-center mb-10 md:mb-0"
      >
        <h1 className="text-4xl font-extrabold text-yellow-500 mb-6">
          Complete Your Order
        </h1>
        <p className="text-lg mb-4">
          Fast. Secure. Easy.
        </p>
        <p className="text-gray-600 mb-6">
          Kindly fill in your details to proceed with payment. We value your
          trust and ensure all transactions are secured using Paystack.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Delivery within 24–48 hours</li>
          <li>All payments are encrypted</li>
          <li>Money-back guarantee</li>
        </ul>
      </motion.div>

      {/* RIGHT SIDE FORM */}
      <motion.form
        onSubmit={handlePayment}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="md:w-1/2 w-full max-w-md mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-yellow-300"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-yellow-500">
          Checkout
        </h2>

        {[
          { name: "fullName", label: "Full Name", type: "text" },
          { name: "email", label: "Email Address", type: "email" },
          { name: "town", label: "Town", type: "text" },
          { name: "address", label: "Address", type: "text" },
          { name: "postalCode", label: "Postal Code", type: "text" },
        ].map(({ name, label, type }) => (
          <div className="relative mb-6" key={name}>
            <input
              type={type}
              name={name}
              required
              value={formData[name]}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full px-8 py-4 text-sm border border-yellow-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <label
              htmlFor={name}
              className="absolute left-8 top-2 text-xs text-gray-700 peer-focus:top-1 peer-focus:text-yellow-700 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm transition-all"
            >
              {label}
            </label>
          </div>
        ))}

        {/* TOTAL AMOUNT */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">Amount to Pay</p>
          <p className="text-2xl font-bold">
            GHS {Number(totalAmount).toFixed(2)}
          </p>
        </div>

        {/* MESSAGES */}
        {error && (
          <p className="text-red-500 text-sm mb-4 animate-pulse">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mb-4">
            Redirecting to Paystack...
          </p>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-full transition-all duration-300 shadow-md disabled:opacity-50"
        >
          {loading ? "Processing..." : "Proceed To Payment"}
        </button>

        {/* BACK TO CART */}
        <Link to="/cart">
          <button
            type="button"
            className="w-full py-3 bg-gray-800 hover:bg-gray-700 mt-5 text-yellow-500 font-bold rounded-full transition-all duration-300 shadow-md"
          >
            Return To Cart
          </button>
        </Link>
      </motion.form>
    </div>
  );
};

export default CheckOut;

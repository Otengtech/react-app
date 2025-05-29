import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
      const res = await axios.post(`${API_URL}/api/pay`, {
        ...formData,
        totalAmount, // should be in Naira, converted to kobo in backend
      });

      if (res.data?.data?.authorization_url) {
        setSuccess(true);
        window.location.href = res.data.data.authorization_url; // Note the nested `data`
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-yellow-50 to-white">
      <form
        onSubmit={handlePayment}
        className="custom-scrollbar my-10 w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-yellow-300 overflow-auto"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-yellow-500 tracking-tight">
          Checkout
        </h2>

        {/* FULL NAME */}
        <div className="relative mb-6">
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full px-8 py-4 text-sm border border-yellow-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <label
            htmlFor="fullName"
            className="absolute left-8 top-2 text-xs text-gray-700 peer-focus:top-1 peer-focus:text-yellow-700 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm transition-all"
          >
            Full Name
          </label>
        </div>

        {/* EMAIL */}
        <div className="relative mb-6">
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full px-8 py-4 text-sm border border-yellow-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <label
            htmlFor="email"
            className="absolute left-8 top-2 text-xs text-gray-700 peer-focus:top-1 peer-focus:text-yellow-700 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm transition-all"
          >
            Email Address
          </label>
        </div>

        {/* TOWN */}
        <div className="relative mb-6">
          <input
            type="text"
            name="town"
            required
            value={formData.town}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full px-8 py-4 text-sm border border-yellow-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <label
            htmlFor="town"
            className="absolute left-8 top-2 text-xs text-gray-700 peer-focus:top-1 peer-focus:text-yellow-700 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm transition-all"
          >
            Town
          </label>
        </div>

        {/* ADDRESS */}
        <div className="relative mb-6">
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full px-8 py-4 text-sm border border-yellow-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <label
            htmlFor="address"
            className="absolute left-8 top-2 text-xs text-gray-700 peer-focus:top-1 peer-focus:text-yellow-700 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm transition-all"
          >
            Address
          </label>
        </div>

        {/* POSTAL CODE */}
        <div className="relative mb-6">
          <input
            type="text"
            name="postalCode"
            required
            value={formData.postalCode}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full px-8 py-4 text-sm border border-yellow-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <label
            htmlFor="postalCode"
            className="absolute left-8 top-2 text-xs text-gray-700 peer-focus:top-1 peer-focus:text-yellow-700 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm transition-all"
          >
            Postal Code
          </label>
        </div>

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
      </form>
    </div>
  );
};

export default CheckOut;

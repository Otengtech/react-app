import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Footer = () => {
  const [subscriber, setSubscriber] = useState("");
  const [subMessage, setSubMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/subscribe`, {
        email: subscriber,
      });
      setSubMessage(res.data.message);
      setSubscriber("");
    } catch (error) {
      setSubMessage("Subscription failed. Please try again.");
    } finally {
      setTimeout(() => setSubMessage(""), 5000);
    }
  };

  return (
    <footer className="bg-black text-white pt-14 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-bold text-yellow-500 mb-4">Sneekers</h2>
          <p className="text-gray-400 text-sm">
            Your go-to destination for premium sneakers. From classic silhouettes to the latest drops—we blend fashion, function, and authenticity.
          </p>
          <p className="mt-4 text-xs text-gray-500 italic">“Step into your greatness.”</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              { label: "Home", to: "/" },
              { label: "All Sneakers", to: "/allsneakers" },
              { label: "Our Gallery", to: "/gallery" },
              { label: "About Us", to: "/about" },
              { label: "Contact", to: "/contact" },
              { label: "Privacy Policy", to: "/policy" },
              { label: "FAQs", to: "/faq" },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Collaborations & Payment */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">Our Partners</h2>
          <div className="text-gray-300 text-sm mb-4">
            <p className="mb-2">🏷️ We proudly retail sneakers from:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Nike</li>
              <li>Adidas</li>
              <li>Puma</li>
              <li>New Balance</li>
              <li>Reebok</li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">Subscribe</h2>
          <p className="text-gray-400 mb-4 text-sm">
            Get the latest sneaker drops, restocks, and exclusive offers—straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
            <input
              type="email"
              value={subscriber}
              onChange={(e) => setSubscriber(e.target.value)}
              placeholder="Enter your email"
              required
              className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded transition text-sm"
            >
              Subscribe
            </button>
          </form>
          {subMessage && (
            <p
              className={`mt-3 text-xs ${
                subMessage.toLowerCase().includes("success") ? "text-green-400" : "text-red-400"
              }`}
            >
              {subMessage}
            </p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-12 pt-6">
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Sneekers. All rights reserved.</p>
          <p className="mt-1 text-gray-100 text-lg">
            Designed by Ebenezer Oteng
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

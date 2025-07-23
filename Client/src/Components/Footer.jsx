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
      setSubMessage("Subscription failed. Please try again.")
      console.log(error);
      ;
    } finally {
      setTimeout(() => setSubMessage(""), 5000); // auto-clear message
    }
  };

  return (
    <footer className="bg-black text-white pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Sneekers</h2>
          <p className="text-gray-400">
            Welcome to Sneekers, your go-to
            destination for authentic, trendy, and premium sneakers. Style meets comfort here.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Quick Links</h2>
          <ul className="space-y-3 text-gray-300">
            {[
              { label: "Home", to: "/" },
              { label: "All Sneakers", to: "/allsneakers" },
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

        {/* Social Links */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Follow Us</h2>
          <ul className="space-y-3 text-gray-300">
            {[
              { label: "Facebook", icon: "fa-facebook", href: "#" },
              { label: "Instagram", icon: "fa-instagram", href: "#" },
              { label: "Twitter", icon: "fa-twitter", href: "#" },
            ].map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="flex items-center hover:text-yellow-500 transition-colors duration-200"
                >
                  <i className={`fa-brands ${social.icon} mr-2`}></i> {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Subscribe</h2>
          <p className="text-gray-400 mb-4">
            Get the latest sneaker drops and exclusive offers straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
            <input
              type="email"
              value={subscriber}
              onChange={(e) => setSubscriber(e.target.value)}
              placeholder="Your email address"
              required
              className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded transition"
            >
              Subscribe
            </button>
          </form>
          {subMessage && (
            <p
              className={`mt-4 text-sm ${
                subMessage.toLowerCase().includes("success") ? "text-green-400" : "text-red-400"
              }`}
            >
              {subMessage}
            </p>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-12 border-t border-gray-500 py-4 text-gray-400 text-sm">
        <p>
          &copy; {new Date().getFullYear()}{" "}Sneekers. All rights reserved.
        </p>
        <p>
          <span className="text-yellow-400 mt-10">Designed By Oteng Siaw Ebenezer</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

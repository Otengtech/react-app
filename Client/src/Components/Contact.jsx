import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Footer from "./Footer";
const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Email Sent:", data);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  useEffect(() => {
    setLoader(true);
    const timer = setTimeout(() => setLoader(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loader && <Loader />}

      {!loader && (
        <div className="min-h-myScreen bg-gray-900 to-yellow-300">
          <div className="px-6 py-20 sm:px-10 md:px-16 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-500 mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-12">
              We'd love to hear from you! Whether you have a question about a product, need assistance, or just want to give feedback — feel free to reach out.
            </p>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto items-center text-left">
              <div className="space-y-6 text-gray-200">
                <h2 className="text-3xl font-bold">Get in Touch</h2>
                <p>Our team is available Monday to Friday, 9 AM – 6 PM GMT.</p>
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <i className="fa-solid fa-envelope text-xl text-yellow-500"></i>
                    <span>support@sneekers.com</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <i className="fa-solid fa-phone text-xl text-yellow-500"></i>
                    <span>(+233) 593-957373</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <i className="fa-solid fa-location-dot text-xl text-yellow-500"></i>
                    <span>123 Sneeker Street, SPINTEX, Accra, Ghana</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <i className="fa-brands fa-instagram text-xl text-yellow-500"></i>
                    <span>@sneekers.official</span>
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <form
                className="rounded-2xl p-8 space-y-6 w-full"
                onSubmit={handleSubmit}
              >
                <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
                  Send a Message
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-200 mb-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 placeholder:text-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-200 mb-1">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 placeholder:text-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Your email"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-200 mb-1">Your Message</label>
                    <textarea
                      name="message"
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 placeholder:text-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Type your message here..."
                      required
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-500 text-gray-800 py-3 rounded-full font-semibold text-lg hover:bg-yellow-400 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Contact;

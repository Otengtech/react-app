import React from "react";
import Footer from "./Footer";

const Policy = () => {
  return (
    <>
      <div className="bg-gray-900 text-white py-20">
        {/* Title */}
        <div className="text-center px-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-yellow-500">
            Our Policies
          </h1>
        </div>

        {/* Policy Sections */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 px-6 md:px-20 py-16">
          {/* Privacy Policy */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-500 pb-4">
              Privacy Policy
            </h2>
            <p className="text-gray-200 leading-relaxed">
              Your privacy is important to us. We collect, store, and process
              personal data in compliance with data protection laws. Information
              such as your name, email, and purchase history is securely stored
              and used only for order processing, customer service, and
              promotional offers (if opted in).
            </p>
            <p className="text-gray-200 leading-relaxed mt-4">
              We do not sell, trade, or share your data with third parties
              without your explicit consent, except as required by law. Our
              website uses secure encryption (SSL) to protect your personal
              information.
            </p>
          </div>

          {/* Return & Refund Policy */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-500 pb-4">
              Return & Refund Policy
            </h2>
            <p className="text-gray-200 leading-relaxed">
              If you’re not satisfied with your purchase, you may return it
              within 30 days of receipt for a full refund or exchange. The item
              must be unused, in its original packaging, and with all tags
              attached.
            </p>
            <p className="text-gray-200 leading-relaxed mt-4">
              Refunds are processed within **5-7 business days** after we
              receive your return. Shipping costs are non-refundable, and the
              customer is responsible for return shipping fees unless the item
              is defective.
            </p>
            <p className="text-gray-200 leading-relaxed mt-4">
              Items such as **gift cards, customized products, and clearance
              items** are non-refundable.
            </p>
          </div>

          {/* Shipping Policy */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-500 pb-4">
              Shipping Policy
            </h2>
            <p className="text-gray-200 leading-relaxed">
              We offer **worldwide shipping** through trusted carriers. Standard
              delivery takes **5-10 business days**, while express shipping
              takes **2-4 business days** (depending on your location).
            </p>
            <p className="text-gray-200 leading-relaxed mt-4">
              Once your order is shipped, you’ll receive a tracking number via
              email. If your package is delayed, please allow **48 hours**
              before contacting support, as couriers may experience delays.
            </p>
            <p className="text-gray-200 leading-relaxed mt-4">
              We are **not responsible** for delays due to customs, incorrect
              addresses, or lost packages due to courier errors. Please ensure
              your shipping details are accurate before completing your order.
            </p>
          </div>

          {/* Terms of Service */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-500 pb-4">
              Terms of Service
            </h2>
            <p className="text-gray-200 leading-relaxed">
              By using our website, you agree to comply with our terms and
              conditions. These include:
            </p>
            <ul className="list-disc text-gray-200 mt-4 ml-5 space-y-2">
              <li>All purchases are subject to product availability.</li>
              <li>
                Prices and promotions are subject to change without notice.
              </li>
              <li>
                Unauthorized resale or redistribution of products is prohibited.
              </li>
              <li>Any fraudulent activity may result in account suspension.</li>
              <li>
                Customers must provide accurate and complete billing/shipping
                details.
              </li>
            </ul>
            <p className="text-gray-200 leading-relaxed mt-4">
              Violation of these terms may lead to cancellation of orders or
              account termination without prior notice.
            </p>
          </div>

          {/* Customer Support Policy */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-500 pb-4">
              Customer Support
            </h2>
            <p className="text-gray-200 leading-relaxed">
              We are dedicated to providing excellent customer service. Our
              support team is available **Monday to Friday, 9 AM - 6 PM (GMT)**.
              You can reach us via:
            </p>
            <ul className="list-disc text-gray-200 mt-4 ml-5 space-y-2">
              <li>Email: support@sneekers.com</li>
              <li>Phone: (+233) 593-957373</li>
              <li>Live Chat: Available on our website during business hours</li>
            </ul>
            <p className="text-gray-200 leading-relaxed mt-4">
              We strive to respond to all inquiries within **24 hours**. For
              urgent matters, we recommend calling our customer support hotline.
            </p>
          </div>

          {/* Payment & Security Policy */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-500 pb-4">
              Payment & Security
            </h2>
            <p className="text-gray-200 leading-relaxed">
              We accept various payment methods, including:
            </p>
            <ul className="list-disc text-gray-200 mt-4 ml-5 space-y-2">
              <li>Visa, MasterCard, and American Express</li>
              <li>PayPal, Apple Pay, and Google Pay</li>
              <li>Cryptocurrency (BTC, ETH, USDT)</li>
            </ul>
            <p className="text-gray-200 leading-relaxed mt-4">
              Your payments are **100% secure** with **SSL encryption** to
              protect your financial data. We do not store credit card details
              on our servers.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Policy;

import React from "react";
import Footer from "./Footer";

const FAQ = () => {
  return (
    <div>
      <section className="bg-white text-black py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {/* <!-- FAQ Item --> */}
          <details className="border border-gray-800 rounded-lg p-4">
            <summary className="cursor-pointer text-lg font-semibold text-gray-800">
              What is your return policy?
            </summary>
            <p className="mt-2 text-black">
              We offer a 30-day return policy. If you're not satisfied, return
              it in its original condition for a full refund.
            </p>
          </details>

          <details className="border border-gray-800 rounded-lg p-4">
            <summary className="cursor-pointer text-lg font-semibold text-gray-800">
              Do you ship internationally?
            </summary>
            <p className="mt-2 text-black">
              Yes, we ship worldwide. Shipping times and fees vary depending on
              the destination.
            </p>
          </details>

          <details className="border border-gray-800 rounded-lg p-4">
            <summary className="cursor-pointer text-lg font-semibold text-gray-800">
              How do I track my order?
            </summary>
            <p className="mt-2 text-black">
              Once your order ships, we’ll send you a tracking number via email.
              You can use it to follow your package.
            </p>
          </details>

          <details className="border border-gray-800 rounded-lg p-4">
            <summary className="cursor-pointer text-lg font-semibold text-gray-800">
              Can I change or cancel my order?
            </summary>
            <p className="mt-2 text-black">
              Yes, but only within 12 hours of placing the order. Contact our
              support team as soon as possible.
            </p>
          </details>

          <details className="border border-gray-800 rounded-lg p-4">
            <summary className="cursor-pointer text-lg font-semibold text-gray-800">
              Are your sneakers authentic?
            </summary>
            <p class="mt-2 text-black">
              Absolutely. We only sell 100% authentic sneakers sourced from
              trusted suppliers.
            </p>
          </details>

          <details className="border border-gray-800 rounded-lg p-4">
            <summary className="cursor-pointer text-lg font-semibold text-gray-800">
              What sizes are available?
            </summary>
            <p className="mt-2 text-black">
              Sizes vary by brand and model. Please check the size chart on the
              product page for specific details.
            </p>
          </details>

          <details className="border border-gray-800 rounded-lg p-4">
            <summary className="cursor-pointer text-lg font-semibold text-gray-800">
              How do I contact customer support?
            </summary>
            <p className="mt-2 text-black">
              You can reach us via the Contact Us page or email us directly at
              support@sneaksite.com.
            </p>
          </details>

          <details className="border border-gray-800 rounded-lg p-4">
            <summary className="cursor-pointer text-lg font-semibold text-gray-800">
              Do you offer gift cards?
            </summary>
            <p className="mt-2 text-black">
              Yes, we offer digital gift cards in various amounts. They're
              perfect for sneaker lovers!
            </p>
          </details>

          <details className="border border-gray-800 rounded-lg p-4">
            <summary className="cursor-pointer text-lg font-semibold text-gray-800">
              How do I care for my sneakers?
            </summary>
            <p class="mt-2 text-black">
              Use a soft brush and mild soap. Avoid machine washing unless the
              brand specifically states it's safe.
            </p>
          </details>

          <details className="border border-gray-800 rounded-lg p-4">
            <summary className="cursor-pointer text-lg font-semibold text-gray-800">
              Is my personal data safe?
            </summary>
            <p className="mt-2 text-black">
              Yes. We use encrypted connections and never share your information
              with third parties without consent.
            </p>
          </details>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FAQ;

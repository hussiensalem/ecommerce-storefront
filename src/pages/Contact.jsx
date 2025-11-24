import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="w-[90%] mx-auto max-w-3xl bg-white rounded-xl shadow-lg p-10">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

        <p className="text-gray-700 mb-4">
          Have questions? Send us a message and we'll get back to you shortly.
        </p>

        <form className="space-y-4">
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
            placeholder="Your name"
          />
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
            placeholder="Email"
          />
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32"
            placeholder="Message"
          />
          <button className="px-6 py-3 bg-black text-white rounded-lg">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

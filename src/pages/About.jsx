import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="w-[90%] mx-auto max-w-5xl bg-white rounded-xl shadow-lg p-10">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 leading-relaxed mb-6">
          Welcome to E-store — your destination for high quality audio
          equipment. We curate the best headphones, earbuds and speakers from
          top brands.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Our mission</h2>
        <p className="text-gray-700 mb-6">
          To make premium sound accessible for everyone while providing
          exceptional service.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Contact</h2>
        <p className="text-gray-700">
          For business inquiries please use the contact page.
        </p>
      </div>
    </div>
  );
}

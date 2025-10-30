import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16 text-center">
      <p className="text-gray-400">
        © {new Date().getFullYear()} 3legant. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;

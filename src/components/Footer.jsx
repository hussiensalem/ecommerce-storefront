export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-10">

          <div>
            <h1 className="text-xl font-semibold">E-store.</h1>
            <p className="text-sm text-gray-400 mt-1">Electronics Store</p>
          </div>

          <div className="flex gap-10 text-sm">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Product</a>
            <a href="#">Blog</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      <div className="mt-14">
        <hr className="mb-5"/> 
        <div className="flex flex-col lg:flex-row justify-between items-center  text-xs text-gray-400 gap-4">
          <p>Copyright © 2023 E-store. All rights reserved</p>

          <div className="flex gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}

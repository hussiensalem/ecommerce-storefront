import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHeart, FiShare2 } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { useAppDispatch } from "../app/hooks";
import { addItem } from "../features/cart/cartSlice";
import headphone1 from "../assets/headphone1.png";
import headphone2 from "../assets/headphone2.png";
import headphone3 from "../assets/headphone3.png";
import headphone4 from "../assets/headphone4.png";
import earbuds1 from "../assets/earbuds1.png";

// Local product database that matches shop.jsx
const PRODUCTS_DB = [
  {
    id: 1,
    name: "Sony - WH-1000XM5 Wireless Noise Canceling",
    image: headphone1,
    price: 299.99,
    oldPrice: 399.99,
    isNew: true,
    discount: 25,
    category: "Headphones",
    description:
      "Industry-leading noise cancelation, up to 30 hours of battery life, comfortable over-ear design.",
    rating: 4.5,
    colors: ["Black", "Silver", "Navy Blue"],
  },
  {
    id: 2,
    name: "Beats Studio Pro",
    image: headphone2,
    price: 349.99,
    oldPrice: 449.99,
    isNew: false,
    discount: 22,
    category: "Headphones",
    description:
      "Industry-leading noise cancelation, up to 30 hours of battery life, comfortable over-ear design.",
    rating: 4.3,
    colors: ["Black", "Red", "Gold"],
  },
  {
    id: 3,
    name: "Sony - WH-CH720N Wireless Noise Canceling",
    image: headphone3,
    price: 149.99,
    oldPrice: 199.99,
    isNew: true,
    discount: 25,
    category: "Headphones",
    description:
      "Industry-leading noise cancelation, up to 30 hours of battery life, comfortable over-ear design.",
    rating: 4.4,
    colors: ["Black", "White", "Gray"],
  },
  {
    id: 4,
    name: "Skullcandy - Rail True Wireless Earbuds",
    image: headphone4,
    price: 79.99,
    oldPrice: 99.99,
    isNew: false,
    discount: 20,
    category: "Earbuds",
    description:
      "Industry-leading noise cancelation, up to 30 hours of battery life, comfortable over-ear design.",
    rating: 4.2,
    colors: ["Black", "White", "Purple"],
  },
  {
    id: 5,
    name: "Beats Studio Pro (Limited)",
    image: earbuds1,
    price: 249.99,
    oldPrice: 299.99,
    isNew: true,
    discount: 17,
    category: "Earbuds",
    description:
      "Industry-leading noise cancelation, up to 30 hours of battery life, comfortable over-ear design.",
    rating: 4.6,
    colors: ["Black", "White", "Blue"],
  },
  {
    id: 6,
    name: "Sony - WH-1000XM5 Wireless Noise Canceling",
    image: headphone1,
    price: 299.99,
    oldPrice: 399.99,
    isNew: true,
    discount: 25,
    category: "Headphones",
    description:
      "Industry-leading noise cancelation, up to 30 hours of battery life, comfortable over-ear design.",
    rating: 4.5,
    colors: ["Black", "Silver", "Navy Blue"],
  },
  {
    id: 7,
    name: "Beats Studio Pro",
    image: headphone2,
    price: 349.99,
    oldPrice: 449.99,
    isNew: false,
    discount: 22,
    category: "Headphones",
    description:
      "Industry-leading noise cancelation, up to 30 hours of battery life, comfortable over-ear design.",
    rating: 4.3,
    colors: ["Black", "Red", "Gold"],
  },
  {
    id: 8,
    name: "Sony - WH-CH720N Wireless Noise Canceling",
    image: headphone3,
    price: 149.99,
    oldPrice: 199.99,
    isNew: true,
    discount: 25,
    category: "Headphones",
    description:
      "Industry-leading noise cancelation, up to 30 hours of battery life, comfortable over-ear design.",
    rating: 4.4,
    colors: ["Black", "White", "Gray"],
  },
  {
    id: 9,
    name: "Skullcandy - Rail True Wireless Earbuds",
    image: headphone4,
    price: 79.99,
    oldPrice: 99.99,
    isNew: false,
    discount: 20,
    category: "Earbuds",
    description:
      "Industry-leading noise cancelation, up to 30 hours of battery life, comfortable over-ear design.",
    rating: 4.2,
    colors: ["Black", "White", "Purple"],
  },
  {
    id: 10,
    name: "Beats Studio Pro (Limited)",
    image: earbuds1,
    price: 249.99,
    oldPrice: 299.99,
    isNew: true,
    discount: 17,
    category: "Earbuds",
    description:
      "Industry-leading noise cancelation, up to 30 hours of battery life, comfortable over-ear design.",
    rating: 4.6,
    colors: ["Black", "White", "Blue"],
  },
  {
    id: 11,
    name: "Beats Studio Pro",
    image: headphone2,
    price: 349.99,
    oldPrice: 449.99,
    isNew: false,
    discount: 22,
    category: "Headphones",
    description:
      "Industry-leading noise cancelation, up to 30 hours of battery life, comfortable over-ear design.",
    rating: 4.3,
  },
  {
    id: 12,
    name: "Sony - WH-CH720N Wireless Noise Canceling",
    image: headphone3,
    price: 149.99,
    oldPrice: 199.99,
    isNew: true,
    discount: 25,
    category: "Headphones",
    description:
      "Industry-leading noise cancelation, up to 30 hours of battery life, comfortable over-ear design.",
    rating: 4.4,
  },
  {
    id: 13,
    name: "Skullcandy - Rail True Wireless Earbuds",
    image: headphone4,
    price: 79.99,
    oldPrice: 99.99,
    isNew: false,
    discount: 20,
    category: "Earbuds",
    description:
      "Industry-leading noise cancelation, up to 30 hours of battery life, comfortable over-ear design.",
    rating: 4.2,
  },
];

// Mock comments data
const generateMockComments = () => {
  const names = [
    "John Doe",
    "Sarah Smith",
    "Mike Johnson",
    "Emma Davis",
    "Alex Brown",
  ];
  const comments = [
    "Great product! Excellent quality and fast delivery.",
    "Love it! Better than expected. Highly recommended.",
    "Amazing sound quality and very comfortable to wear.",
    "Worth every penny! Best purchase I made this year.",
    "Perfect! Exactly what I was looking for.",
    "Outstanding! The build quality is superb.",
    "Very satisfied with my purchase. Great service too!",
  ];

  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: names[Math.floor(Math.random() * names.length)],
    rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
    comment: comments[Math.floor(Math.random() * comments.length)],
    date: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    verified: Math.random() > 0.3,
  }));
};

/**
 * ProductDetails Page Component
 * Displays detailed information for a single product
 * Route: /products/:id
 */
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [comments, setComments] = useState([]);
  const [displayedComments, setDisplayedComments] = useState(3);
  const [timeLeft, setTimeLeft] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Find product from local database
        const foundProduct = PRODUCTS_DB.find((p) => p.id === parseInt(id));
        if (!foundProduct) {
          throw new Error("Product not found");
        }
        setProduct(foundProduct);
        setComments(generateMockComments());

        // Check if deadline exists in localStorage for this product
        const storageKey = `offer_deadline_${id}`;
        let deadline = localStorage.getItem(storageKey);

        if (!deadline) {
          // If no deadline exists, create a new one (48 hours from now)
          deadline = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
          localStorage.setItem(storageKey, deadline);
        }

        setTimeLeft(new Date(deadline));

        // Scroll to top when product page loads
        window.scrollTo(0, 0);
      } catch (err) {
        setError(err.message || "Failed to load product details");
        console.error("Error loading product:", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) loadProduct();
  }, [id]);

  // Countdown timer effect
  useEffect(() => {
    if (!timeLeft) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = timeLeft - now;

      if (diff <= 0) {
        setTimeLeft(null);
        clearInterval(interval);
      } else {
        // Force re-render on each second for countdown
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const getTimeLeft = () => {
    if (!timeLeft) return null;
    const now = new Date();
    const diff = timeLeft - now;

    if (diff <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, isEnded: false };
  };

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    // Add item to Redux cart without alerts
    if (!product) return;
    try {
      dispatch(
        addItem({
          id: product.id,
          title: product.name,
          price: product.price,
          image: product.image,
          qty: quantity,
        })
      );
      console.log(`Added ${quantity} of product ${product.id} to cart`);
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  const handleBuyNow = () => {
    // Navigate to checkout placeholder page
    if (!product) return;
    navigate("/checkout");
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const fallbackImage = `https://via.placeholder.com/400x400/CCCCCC/999999?text=No+Image`;

  const handleLoadMoreComments = () => {
    setDisplayedComments((prev) => Math.min(prev + 3, comments.length));
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // no alert on wishlist toggle per requirements
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponMessage("Please enter a coupon code");
      return;
    }

    // Valid coupons for demo
    const validCoupons = {
      SAVE10: { discount: 10, message: "✅ 10% discount applied!" },
      SAVE20: { discount: 20, message: "✅ 20% discount applied!" },
      WELCOME: { discount: 15, message: "✅ 15% discount applied!" },
    };

    const coupon = validCoupons[couponCode.toUpperCase()];
    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponMessage(coupon.message);
      setCouponCode("");
    } else {
      setCouponMessage("❌ Invalid coupon code");
      setAppliedCoupon(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{error || "Product not found"}</p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const avgRating = 4.5;
  const totalReviews = 248;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb and Back Button */}
      <div className="bg-white border-b">
        <div className="w-[90%] mx-auto py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <FiArrowLeft className="text-xl" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Product Section */}
      <div className="w-[90%] mx-auto py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              {/* Time Countdown Display - Minimal, No Box */}
              {product.discount && timeLeft && !getTimeLeft()?.isEnded && (
                <>
                  <p className="text-xs font-bold text-red-600 mb-2 flex items-center gap-1">
                    <span>⏱️</span> Offer Countdown
                  </p>
                  <div className="flex justify-start gap-1 mb-4">
                    {/* Days */}
                    <div className="text-center">
                      <div className="text-white font-extrabold text-sm bg-red-600 rounded p-1 w-10">
                        {String(getTimeLeft()?.days).padStart(2, "0")}
                      </div>
                      <div className="text-gray-600 text-xs font-semibold mt-0.5">
                        Days
                      </div>
                    </div>
                    {/* Hours */}
                    <div className="text-center">
                      <div className="text-white font-extrabold text-sm bg-red-500 rounded p-1 w-10">
                        {String(getTimeLeft()?.hours).padStart(2, "0")}
                      </div>
                      <div className="text-gray-600 text-xs font-semibold mt-0.5">
                        Hours
                      </div>
                    </div>
                    {/* Minutes */}
                    <div className="text-center">
                      <div className="text-white font-extrabold text-sm bg-red-500 rounded p-1 w-10">
                        {String(getTimeLeft()?.minutes).padStart(2, "0")}
                      </div>
                      <div className="text-gray-600 text-xs font-semibold mt-0.5">
                        Mins
                      </div>
                    </div>
                    {/* Seconds */}
                    <div className="text-center">
                      <div className="text-white font-extrabold text-sm bg-red-600 rounded p-1 w-10">
                        {String(getTimeLeft()?.seconds).padStart(2, "0")}
                      </div>
                      <div className="text-gray-600 text-xs font-semibold mt-0.5">
                        Secs
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-6 border border-gray-200">
                <img
                  src={imageError ? fallbackImage : product.image}
                  alt={product.name}
                  onError={handleImageError}
                  className="w-full h-auto max-h-96 object-contain"
                />

                {product.discount && (
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-bold text-2xl shadow-lg transform -rotate-3 hover:rotate-0 transition">
                    -{product.discount}%
                  </div>
                )}
              </div>

              {/* Image Gallery - showing main image for now */}
              <div className="flex gap-3">
                <div className="w-20 h-20 bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300 transition flex items-center justify-center border-2 border-gray-300 hover:border-gray-400">
                  <img
                    src={imageError ? fallbackImage : product.image}
                    alt="thumb"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Category and Badge */}
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                {product.category}
              </p>

              {/* Product Name with Stock & Warranty Badges */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <div className="flex gap-2 flex-shrink-0">
                  {/* Stock Status Badge */}
                  <div className="bg-green-100 border border-green-300 rounded px-2 py-1 flex items-center gap-1">
                    <span className="text-green-700 font-bold text-xs">
                      ✓ In Stock
                    </span>
                  </div>
                  {/* Warranty Badge */}
                  <div className="bg-blue-100 border border-blue-300 rounded px-2 py-1 flex items-center gap-1">
                    <span className="text-blue-700 font-bold text-xs">
                      🛡️ 1Yr
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-base">
                      {i < Math.floor(avgRating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  {avgRating} ({totalReviews} reviews)
                </span>
              </div>

              {/* Price Section */}
              <div className="mb-4 pb-4 border-b-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price?.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg line-through text-gray-400">
                      ${product.oldPrice?.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Discount and Deadline */}
                {product.discount && (
                  <div className="mt-3">
                    <div className="text-xs font-bold">
                      <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                        💰 Save $
                        {((product.oldPrice - product.price) * 100) / 100}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Selection & Quantity - Side by Side */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      🎨 Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => {
                        const colorBg =
                          {
                            Black: "bg-black",
                            White: "bg-white border-2 border-gray-300",
                            Silver: "bg-gray-300",
                            "Navy Blue": "bg-blue-900",
                            Red: "bg-red-600",
                            Gold: "bg-yellow-500",
                            Gray: "bg-gray-500",
                            Purple: "bg-purple-600",
                            Blue: "bg-blue-600",
                          }[color] || "bg-gray-400";

                        return (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-2 rounded-lg font-semibold text-xs transition transform hover:scale-105 ${
                              selectedColor === color
                                ? "ring-2 ring-offset-1 ring-gray-800 shadow-md"
                                : "shadow-sm hover:shadow-md"
                            }`}
                            title={color}
                          >
                            <div
                              className={`w-4 h-4 rounded ${colorBg} mx-auto mb-1`}
                            ></div>
                            <span className="text-gray-700 text-xs">
                              {color}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    📦 Qty
                  </label>
                  <div className="flex items-center border-2 border-gray-400 rounded-lg w-fit bg-gray-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-200 transition font-bold text-lg"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      readOnly
                      className="w-16 text-center outline-none text-lg font-bold bg-transparent"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-200 transition font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Coupon Code Section - Compact */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-3 shadow-md mb-4">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-800 mb-2">
                  <span>🎟️</span> Coupon Code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Code (e.g., SAVE10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs font-medium bg-white"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-xs"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p
                    className={`text-xs font-bold mt-2 ${
                      couponMessage.includes("✅")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {couponMessage}
                  </p>
                )}
                {appliedCoupon && (
                  <p className="text-xs text-blue-700 font-bold mt-2 bg-blue-100 p-2 rounded">
                    ✨ {appliedCoupon.discount}% off!
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-900 to-black text-white font-bold rounded-lg hover:from-gray-800 hover:to-gray-900 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm"
                >
                  <FiShoppingCart className="text-lg" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`flex-1 px-4 py-3 rounded-lg font-bold transition text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                    isWishlisted
                      ? "bg-red-500 text-white border-2 border-red-500 hover:bg-red-600 hover:border-red-600"
                      : "border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  }`}
                  title="Add to Wishlist"
                >
                  <FiHeart
                    className="text-lg"
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                  <span>Wishlist</span>
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full px-4 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold rounded-lg hover:from-orange-500 hover:to-orange-600 transition shadow-lg hover:shadow-xl text-sm mb-4"
              >
                🛒 Buy Now
              </button>

              {/* Share */}
              <button className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition py-2 font-semibold text-sm">
                <FiShare2 className="text-base" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* More Info Section */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-10 mb-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            ℹ️ More Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                <span className="text-2xl">📦</span>Product Details
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex justify-between">
                  <strong className="text-gray-800">Category:</strong>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-semibold text-sm">
                    {product.category}
                  </span>
                </li>
                <li className="flex justify-between">
                  <strong className="text-gray-800">Rating:</strong>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg font-semibold text-sm">
                    {product.rating || "N/A"} / 5
                  </span>
                </li>
                <li className="flex justify-between">
                  <strong className="text-gray-800">Stock Status:</strong>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-semibold text-sm">
                    ✓ In Stock
                  </span>
                </li>
                <li className="flex justify-between">
                  <strong className="text-gray-800">Shipping:</strong>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg font-semibold text-sm">
                    Free {">"}$50
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                <span className="text-2xl">🛡️</span>Warranty & Support
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex justify-between">
                  <strong className="text-gray-800">Warranty:</strong>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-semibold text-sm">
                    1 Year
                  </span>
                </li>
                <li className="flex justify-between">
                  <strong className="text-gray-800">Returns:</strong>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg font-semibold text-sm">
                    30 Days
                  </span>
                </li>
                <li className="flex justify-between">
                  <strong className="text-gray-800">Support:</strong>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg font-semibold text-sm">
                    24/7
                  </span>
                </li>
                <li className="flex justify-between">
                  <strong className="text-gray-800">Delivery:</strong>
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-lg font-semibold text-sm">
                    2-5 Days
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <button
            onClick={() => setShowComments(!showComments)}
            className="w-full flex items-center justify-between mb-8 p-4 hover:bg-gray-50 rounded-lg transition"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              ⭐ Customer Reviews
            </h2>
            <span
              className={`text-3xl transition-transform ${
                showComments ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {/* Show/Hide Content */}
          {!showComments && (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg font-semibold mb-4">
                Click above to view {totalReviews} customer reviews
              </p>
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-3xl">
                    {i < Math.floor(avgRating) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 font-semibold mt-2">
                {avgRating} out of 5 stars
              </p>
            </div>
          )}

          {showComments && (
            <>
              {/* Overall Rating */}
              <div className="mb-10 pb-10 border-b-2">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-5xl font-bold text-gray-900">
                      {avgRating}
                    </div>
                    <div className="flex gap-1 mt-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-2xl">
                          {i < Math.floor(avgRating) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <p className="text-base text-gray-600 mt-3 font-semibold">
                      Based on {totalReviews} reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-8">
                {comments.slice(0, displayedComments).map((comment) => (
                  <div
                    key={comment.id}
                    className="pb-8 border-b-2 last:border-b-0 hover:bg-gray-50 p-4 rounded-lg transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          {comment.name}
                        </h4>
                        {comment.verified && (
                          <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block mt-2 font-semibold">
                            ✓ Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 font-medium">
                        {comment.date}
                      </span>
                    </div>

                    {/* Star Rating */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">
                          {i < comment.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>

                    {/* Comment Text */}
                    <p className="text-gray-700 text-base leading-relaxed">
                      {comment.comment}
                    </p>
                  </div>
                ))}
              </div>

              {/* Load More Comments Button */}
              {displayedComments < comments.length && (
                <div className="mt-10 text-center">
                  <button
                    onClick={handleLoadMoreComments}
                    className="px-10 py-4 border-2 border-gray-900 text-gray-900 font-bold rounded-lg hover:bg-gray-900 hover:text-white transition text-lg"
                  >
                    Load More Comments ({displayedComments} of {comments.length}
                    )
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

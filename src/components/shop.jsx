import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import headphone1 from "../assets/Headphones1.png";
import headphone2 from "../assets/Headphones2.png";
import headphone3 from "../assets/Headphones3.png";
import headphone4 from "../assets/Headphones4.png";
import headphone5 from "../assets/Headphones5.png";
import headphone6 from "../assets/Headphones6.png";
import headphone7 from "../assets/Headphones7.png";
import earbuds1 from "../assets/Earbuds1.png";
import earbuds2 from "../assets/Earbuds2.png";
import earbuds3 from "../assets/Earbuds3.png";
import earbuds4 from "../assets/Earbuds4.png";
import earbuds5 from "../assets/Earbuds5.png";
import earbuds6 from "../assets/Earbuds6.png";
import earbuds7 from "../assets/Earbuds7.png";
import shopBanner from "../assets/shopBanner.jpeg";

const products = [
  {
    id: 1,
    name: "Sony - WH-1000XM5 Wireless Noise Canceling",
    image: headphone1,
    price: 299.99,
    oldPrice: 399.99,
    isNew: true,
    discount: 25,
    category: "Headphones",
    rating: 4.5,
    description:
      "Premium wireless headphones with industry-leading noise cancellation technology. Features 30-hour battery life, quick charge, and exceptional sound quality for music lovers and professionals.",
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
    rating: 4.3,
    description:
      "Professional-grade studio headphones with active noise cancellation. Delivers powerful bass, crystal-clear highs, and premium comfort for extended listening sessions.",
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
    rating: 4.4,
    description:
      "Affordable wireless headphones with excellent noise cancellation. Perfect balance of quality and value with 35-hour battery life and comfortable lightweight design.",
  },
  {
    id: 4,
    name: "Skullcandy - Rail True Wireless Earbuds",
    image: earbuds1,
    price: 79.99,
    oldPrice: 99.99,
    isNew: false,
    discount: 20,
    category: "Earbuds",
    rating: 4.2,
    description:
      "Compact true wireless earbuds with secure fit design. Features 6-hour battery life, IPX4 water resistance, and rich bass for active lifestyles and daily commutes.",
  },
  {
    id: 5,
    name: "Beats Studio Pro (Limited)",
    image: earbuds2,
    price: 249.99,
    oldPrice: 299.99,
    isNew: true,
    discount: 17,
    category: "Earbuds",
    rating: 4.6,
    description:
      "Limited edition premium earbuds with active noise cancellation and spatial audio. Delivers studio-quality sound with 8-hour battery and wireless charging case.",
  },
  {
    id: 6,
    name: "Sony - WH-1000XM5 Wireless Noise Canceling",
    image: headphone4,
    price: 299.99,
    oldPrice: 399.99,
    isNew: true,
    discount: 25,
    category: "Headphones",
    rating: 4.5,
    description:
      "Top-tier wireless headphones featuring advanced noise cancellation and Hi-Res audio support. Perfect for audiophiles seeking premium sound quality and comfort.",
  },
  {
    id: 7,
    name: "Beats Studio Pro",
    image: headphone5,
    price: 349.99,
    oldPrice: 449.99,
    isNew: false,
    discount: 22,
    category: "Headphones",
    rating: 4.3,
    description:
      "High-performance studio headphones with adaptive noise cancellation. Engineered for music production and critical listening with exceptional clarity and depth.",
  },
  {
    id: 8,
    name: "Sony - WH-CH720N Wireless Noise Canceling",
    image: headphone6,
    price: 149.99,
    oldPrice: 199.99,
    isNew: true,
    discount: 25,
    category: "Headphones",
    rating: 4.4,
    description:
      "Budget-friendly wireless headphones with impressive noise cancellation. Great for students and professionals who want quality sound without breaking the bank.",
  },
  {
    id: 9,
    name: "Skullcandy - Rail True Wireless Earbuds",
    image: earbuds3,
    price: 79.99,
    oldPrice: 99.99,
    isNew: false,
    discount: 20,
    category: "Earbuds",
    rating: 4.2,
    description:
      "Sport-focused wireless earbuds with secure ear hooks. Ideal for workouts with sweat resistance, long battery life, and powerful bass for motivation.",
  },
  {
    id: 10,
    name: "Beats Studio Pro (Limited)",
    image: earbuds4,
    price: 249.99,
    oldPrice: 299.99,
    isNew: true,
    discount: 17,
    category: "Earbuds",
    rating: 4.6,
    description:
      "Exclusive limited edition earbuds with premium materials and signature Beats sound. Features transparency mode and seamless device switching.",
  },
  {
    id: 11,
    name: "Beats Studio Pro",
    image: headphone7,
    price: 349.99,
    oldPrice: 449.99,
    isNew: false,
    discount: 22,
    category: "Headphones",
    rating: 4.3,
    description:
      "Professional studio headphones with dual-mode ANC. Designed for mixing and mastering with flat frequency response and exceptional build quality.",
  },
  {
    id: 12,
    name: "Sony - WH-CH720N Wireless Noise Canceling",
    image: headphone1,
    price: 149.99,
    oldPrice: 199.99,
    isNew: true,
    discount: 25,
    category: "Headphones",
    rating: 4.4,
    description:
      "Entry-level wireless headphones with Sony's signature sound. Features quick attention mode and multipoint pairing for versatile daily use.",
  },
  {
    id: 13,
    name: "Skullcandy - Rail True Wireless Earbuds",
    image: earbuds5,
    price: 79.99,
    oldPrice: 99.99,
    isNew: false,
    discount: 20,
    category: "Earbuds",
    rating: 4.2,
    description:
      "Affordable true wireless earbuds with reliable connectivity. Perfect for casual listening with touch controls and compact charging case.",
  },
  {
    id: 14,
    name: "Sony - WH-1000XM5 Wireless Noise Canceling",
    image: headphone2,
    price: 299.99,
    oldPrice: 399.99,
    isNew: true,
    discount: 25,
    category: "Headphones",
    rating: 4.5,
    description:
      "Flagship wireless headphones with V1 processor for superior noise cancellation. Includes speak-to-chat technology and premium leather ear cups.",
  },
  {
    id: 15,
    name: "Beats Studio Pro (Limited)",
    image: earbuds6,
    price: 249.99,
    oldPrice: 299.99,
    isNew: true,
    discount: 17,
    category: "Earbuds",
    rating: 4.6,
    description:
      "Special edition premium earbuds with custom tuning. Features Apple H1 chip for seamless integration and personalized spatial audio experience.",
  },
];
export default function Shop() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [priceOpen, setPriceOpen] = useState(false);
  const priceRef = useRef(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const categoryRef = useRef(null);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  const priceOptions = [
    { value: "all", label: "All Prices" },
    { value: "under-100", label: "Under $100" },
    { value: "100-300", label: "$100 - $300" },
    { value: "above-300", label: "Above $300" },
  ];
  const currentPriceLabel =
    priceOptions.find((o) => o.value === priceRange)?.label || "All Prices";

  const categoryOptions = [
    { value: "All", label: "All Products" },
    { value: "Headphones", label: "Headphones" },
    { value: "Earbuds", label: "Earbuds" },
  ];
  const currentCategoryLabel =
    categoryOptions.find((o) => o.value === category)?.label || "All Products";

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "low-high", label: "Price: Low → High" },
    { value: "high-low", label: "Price: High → Low" },
  ];
  const currentSortLabel =
    sortOptions.find((o) => o.value === sort)?.label || "Default";

  // Sync filters with URL query params (e.g., /products?category=Headphones)
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory && categoryOptions.some((opt) => opt.value === urlCategory)) {
      setCategory(urlCategory);
    }
    const urlPrice = searchParams.get("priceRange");
    if (urlPrice && priceOptions.some((opt) => opt.value === urlPrice)) {
      setPriceRange(urlPrice);
    }
    const urlSort = searchParams.get("sort");
    if (urlSort && sortOptions.some((opt) => opt.value === urlSort)) {
      setSort(urlSort);
    }
    const urlSearch = searchParams.get("search");
    if (urlSearch) {
      setSearchQuery(urlSearch);
    } else {
      setSearchQuery("");
    }
  }, [searchParams]);

  // Filter products by category, price, and search query
  const filteredProducts = products.filter((p) => {
    const categoryOk = category === "All" || p.category === category;
    const priceOk =
      priceRange === "all" ||
      (priceRange === "under-100" && p.price < 100) ||
      (priceRange === "100-300" && p.price >= 100 && p.price <= 300) ||
      (priceRange === "above-300" && p.price > 300);
    const searchOk = 
      !searchQuery.trim() || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryOk && priceOk && searchOk;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low-high") return a.price - b.price;
    if (sort === "high-low") return b.price - a.price;

    return 0;
  });

  // Reset visible items when filters or sorting change
  useEffect(() => {
    setVisibleCount(10);
  }, [category, sort, priceRange, searchQuery]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (priceRef.current && !priceRef.current.contains(e.target)) {
        setPriceOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  return (
    <section className="w-[90%] mx-auto py-12">
      {/*  Header */}
      <div
        className="relative mb-10 overflow-hidden bg-cover bg-center min-h-[300px] md:min-h-[420px] lg:min-h-[420px] flex items-center justify-center"
        style={{ backgroundImage: `url(${shopBanner})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-6 space-y-2 md:space-y-7">
          <p className="text-white/80 text-md md:text-lg  [word-spacing:0.6rem]">
            <span className="text-white/80">Home {`>`} </span>{" "}
            <span className="underline underline-offset-2 decoration-2">
              Shop
            </span>
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold">Shop Page</h1>
          <p className="text-md md:text-lg font-semibold text-white/80">
            Discover the best audio gear designed for your lifestyle.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <div className="flex gap-4 w-full md:w-auto">
          {/* Category dropdown */}
          <div className="relative w-full md:w-auto" ref={categoryRef}>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={categoryOpen}
              onClick={() => setCategoryOpen((v) => !v)}
              className="border border-gray-300 bg-white rounded-full pl-4 pr-10 py-2 text-sm text-gray-700 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition w-full flex items-center justify-between"
            >
              <span className="truncate">{currentCategoryLabel}</span>
              <FiChevronDown
                aria-hidden
                className={`ml-2 text-gray-500 transition-transform ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {categoryOpen && (
              <ul
                role="listbox"
                className="absolute z-20 mt-2 w-full md:w-56 bg-white rounded-2xl shadow-lg ring-1 ring-black/5 overflow-hidden"
              >
                {categoryOptions.map((opt) => {
                  const selected = opt.value === category;
                  return (
                    <li key={opt.value} role="option" aria-selected={selected}>
                      <button
                        type="button"
                        onClick={() => {
                          setCategory(opt.value);
                          setCategoryOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2 text-sm transition hover:bg-gray-100 focus:bg-gray-100 ${
                          selected
                            ? "bg-gray-50 text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {selected && (
                          <FiCheck aria-hidden className="text-gray-900" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Price dropdown */}
          <div className="relative w-full md:w-auto" ref={priceRef}>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={priceOpen}
              onClick={() => setPriceOpen((v) => !v)}
              className="border border-gray-300 bg-white rounded-full pl-4 pr-10 py-2 text-sm text-gray-700 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition w-full flex items-center justify-between"
            >
              <span className="truncate">{currentPriceLabel}</span>
              <FiChevronDown
                aria-hidden
                className={`ml-2 text-gray-500 transition-transform ${
                  priceOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {priceOpen && (
              <ul
                role="listbox"
                className="absolute z-20 mt-2 w-full md:w-56 bg-white rounded-2xl shadow-lg ring-1 ring-black/5 overflow-hidden"
              >
                {priceOptions.map((opt) => {
                  const selected = opt.value === priceRange;
                  return (
                    <li key={opt.value} role="option" aria-selected={selected}>
                      <button
                        type="button"
                        onClick={() => {
                          setPriceRange(opt.value);
                          setPriceOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2 text-sm transition hover:bg-gray-100 focus:bg-gray-100 ${
                          selected
                            ? "bg-gray-50 text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {selected && (
                          <FiCheck aria-hidden className="text-gray-900" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-sm text-gray-600">Sort by:</span>
          {/* Sort dropdown */}
          <div className="relative w-[80%] md:w-auto" ref={sortRef}>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((v) => !v)}
              className="border border-gray-300 bg-white rounded-full pl-4 pr-10 py-2 text-sm text-gray-700 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition w-full flex items-center justify-between"
            >
              <span className="truncate">{currentSortLabel}</span>
              <FiChevronDown
                aria-hidden
                className={`ml-2 text-gray-500 transition-transform ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sortOpen && (
              <ul
                role="listbox"
                className="absolute z-20 mt-2 w-full md:w-56 bg-white rounded-2xl shadow-lg ring-1 ring-black/5 overflow-hidden"
              >
                {sortOptions.map((opt) => {
                  const selected = opt.value === sort;
                  return (
                    <li key={opt.value} role="option" aria-selected={selected}>
                      <button
                        type="button"
                        onClick={() => {
                          setSort(opt.value);
                          setSortOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2 text-sm transition hover:bg-gray-100 focus:bg-gray-100 ${
                          selected
                            ? "bg-gray-50 text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {selected && (
                          <FiCheck aria-hidden className="text-gray-900" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Search Query Display */}
      {searchQuery && (
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Search results for:</span>
            <span className="font-semibold text-gray-900">"{searchQuery}"</span>
            <span className="text-gray-500">({sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'})</span>
          </div>
          <button
            onClick={() => {
              setSearchQuery("");
              navigate("/products");
            }}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {visibleProducts.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              image={p.image}
              name={p.name}
              price={`$${p.price.toFixed(2)}`}
              isNew={p.isNew}
              isHot={p.isHot}
              rating={p.rating}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-2">
            {searchQuery ? `No products found for "${searchQuery}"` : "No products found"}
          </p>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                navigate("/products");
              }}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              View all products
            </button>
          )}
        </div>
      )}

      {/* Show more button */}
      {visibleCount < sortedProducts.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() =>
              setVisibleCount((v) => Math.min(v + 10, sortedProducts.length))
            }
            className="px-6 py-3 bg-white text-black rounded-3xl border border-black hover:bg-gray-900 hover:text-white transition"
          >
            Show more
          </button>
        </div>
      )}
    </section>
  );
}

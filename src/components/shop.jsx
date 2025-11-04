import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import headphone1 from "../assets/headphone1.png";
import headphone2 from "../assets/headphone2.png";
import headphone3 from "../assets/headphone3.png";
import headphone4 from "../assets/headphone4.png";
import earbuds1 from "../assets/earbuds1.png";
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
  },
];

export default function Shop() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
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

  // Filter products by category
  const filteredProducts = products.filter((p) => {
    const categoryOk = category === "All" || p.category === category;
    const priceOk =
      priceRange === "all" ||
      (priceRange === "under-100" && p.price < 100) ||
      (priceRange === "100-300" && p.price >= 100 && p.price <= 300) ||
      (priceRange === "above-300" && p.price > 300);

    return categoryOk && priceOk;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b  ) => {
    if (sort === "low-high") return a.price - b.price;
    if (sort === "high-low") return b.price - a.price;

    return 0;
  });

  // Reset visible items when filters or sorting change
  useEffect(() => {
    setVisibleCount(10);
  }, [category, sort, priceRange]);

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
        style={{ backgroundImage: `url(${shopBanner})` }} >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-6 space-y-2 md:space-y-7">
          <p className="text-white/80 text-md md:text-lg  [word-spacing:0.6rem]"><span className="text-white/80">Home  {`>`}  </span> <span className="underline underline-offset-2 decoration-2">Shop</span></p>
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
                className={`ml-2 text-gray-500 transition-transform ${categoryOpen ? "rotate-180" : ""}`}
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
                          selected ? "bg-gray-50 text-gray-900" : "text-gray-700"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {selected && <FiCheck aria-hidden className="text-gray-900" />}
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
                className={`ml-2 text-gray-500 transition-transform ${priceOpen ? "rotate-180" : ""}`}
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
                          selected ? "bg-gray-50 text-gray-900" : "text-gray-700"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {selected && <FiCheck aria-hidden className="text-gray-900" />}
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
                className={`ml-2 text-gray-500 transition-transform ${sortOpen ? "rotate-180" : ""}`}
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
                          selected ? "bg-gray-50 text-gray-900" : "text-gray-700"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {selected && <FiCheck aria-hidden className="text-gray-900" />}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {visibleProducts.map((p) => (
          <ProductCard
            key={p.id}
            image={p.image}
            name={p.name}
            price={`$${p.price.toFixed(2)}`}
            isNew={p.isNew}
            isHot={p.isHot}
          />
        ))}
      </div>

      {/* Show more button */}
      {visibleCount < sortedProducts.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisibleCount((v) => Math.min(v + 10, sortedProducts.length))}
            className="px-6 py-3 bg-white text-black rounded-3xl border border-black hover:bg-gray-900 hover:text-white transition"
          >
            Show more
          </button>
        </div>
      )}
    </section>
  )
}

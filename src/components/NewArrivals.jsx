import React, { useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const NewArrivalsCarousel = ({ products }) => {
  const containerRef = useRef(null);
  const [pageCount, setPageCount] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updatePages = () => {
      const pages = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth));
      setPageCount(pages);

      const currentPage = Math.round(el.scrollLeft / el.clientWidth) || 0;
      setActivePage((prev) => Math.min(currentPage, pages - 1));
    };

    updatePages();

    // update on resize and scroll
    const onResize = () => updatePages();
    const onScroll = () => {
      const page = Math.round(el.scrollLeft / el.clientWidth);
      setActivePage(page);
    };

    window.addEventListener("resize", onResize);
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      el.removeEventListener("scroll", onScroll);
    };
  }, [products]);

  // autoplay: advance to next page every 3s unless paused, with circular looping
  useEffect(() => {
    const el = containerRef.current;
    if (!el || pageCount <= 1) return;

    let currentPage = activePage;

    const interval = setInterval(() => {
      if (paused) return;

      // Circular loop: wrap around to 0 when reaching the end
      currentPage = (currentPage + 1) % pageCount;
      const left = Math.round(currentPage * el.clientWidth);

      el.scrollTo({ left, behavior: "smooth" });
      setActivePage(currentPage);
    }, 3000);

    return () => clearInterval(interval);
  }, [pageCount, paused, activePage]);

  const goToPage = (pageIndex) => {
    const el = containerRef.current;
    if (!el) return;
    const left = Math.round(pageIndex * el.clientWidth);
    el.scrollTo({ left, behavior: "smooth" });
    setActivePage(pageIndex);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-5">
      <div className="flex items-center justify-between mb-4 py-5">
        <h2 className="text-[40px] font-semibold">New Arrivals</h2>
        <div className="flex items-center gap-3">
          {Array.from({ length: pageCount }).map((_, idx) => {
            const isActive = idx === activePage;
            return (
              <button
                key={idx}
                onClick={() => goToPage(idx)}
                aria-label={`Go to page ${idx + 1}`}
                className={
                  "w-2 h-2 rounded-full transition-all duration-200 " +
                  (isActive
                    ? "bg-gray-800 ring-2 ring-gray-800"
                    : "bg-gray-300")
                }
              />
            );
          })}
        </div>
      </div>

      <div className="relative">
        <div
          ref={containerRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2 py-2"
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="snap-start flex-shrink-0 w-[220px] md:w-[240px] lg:w-[260px]"
            >
              <ProductCard
                id={p.id}
                image={p.image}
                name={p.name}
                price={p.price}
                isNew={p.isNew}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsCarousel;

import React, { useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const NewArrivalsCarousel = ({ products }) => {
  const containerRef = useRef(null);
  const [pageCount, setPageCount] = useState(0);
  const [activePage, setActivePage] = useState(0);

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

  const goToPage = (pageIndex) => {
    const el = containerRef.current;
    if (!el) return;
    const left = Math.round(pageIndex * el.clientWidth);
    el.scrollTo({ left, behavior: "smooth" });
    setActivePage(pageIndex);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold">New Arrivals</h2>
      </div>

      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2 py-2"
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="snap-start flex-shrink-0 w-[220px] md:w-[240px] lg:w-[260px]"
            >
              <ProductCard
                image={p.image}
                name={p.name}
                price={p.price}
                isNew={p.isNew}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-3">
            {Array.from({ length: pageCount }).map((_, idx) => {
              const isActive = idx === activePage;
              return (
                <button
                  key={idx}
                  onClick={() => goToPage(idx)}
                  aria-label={`Go to page ${idx + 1}`}
                  className={
                    "w-2.5 h-2.5 rounded-full transition-all duration-200 " +
                    (isActive
                      ? "bg-gray-800 ring-2 ring-gray-800"
                      : "bg-gray-300")
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsCarousel;

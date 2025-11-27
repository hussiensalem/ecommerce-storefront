import React, { useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const NewArrivalsCarousel = ({ products }) => {
  const containerRef = useRef(null);
  const [pageCount, setPageCount] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [paused, setPaused] = useState(false);

  // track user interaction so auto-scroll won't fight manual scroll
  const interactingRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  const CLONE_SETS = 3;
  const SPEED_PX_PER_MS = 0.05; // ~50px/s, tweak as desired
  const RESUME_DELAY_MS = 900; // resume after user stops interacting

  // helper: safe modulo for positive result
  const mod = (n, m) => ((n % m) + m) % m;

  // Build repeated products
  const repeatedProducts = [];
  if (products && products.length > 0) {
    for (let i = 0; i < CLONE_SETS; i++) {
      for (const p of products) {
        repeatedProducts.push({ ...p, _rep: i });
      }
    }
  }

  // layout/update handler: compute pages and ensure initial middle set on mount/resize/load
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !products || products.length === 0) return;

    const ensureMiddle = () => {
      const ow = el.scrollWidth / CLONE_SETS;
      // Position to middle set but keep visual place (use pos inside original)
      const posInOriginal = mod(el.scrollLeft, ow);
      // instantly move to middle + offset (visual position identical because sets repeat)
      const prev = el.style.scrollBehavior;
      el.style.scrollBehavior = "auto";
      el.scrollLeft = Math.round(ow + posInOriginal);
      el.style.scrollBehavior = prev;
    };

    const update = () => {
      const ow = el.scrollWidth / CLONE_SETS;
      const pages = Math.max(1, Math.ceil(ow / el.clientWidth));
      setPageCount(pages);

      // on initial mount/resize ensure middle to avoid hitting edges quickly
      ensureMiddle();

      // set active page based on position inside original set
      const posInOriginal = mod(el.scrollLeft, ow);
      const currentPage = Math.round(posInOriginal / el.clientWidth) || 0;
      setActivePage(Math.min(currentPage, pages - 1));
    };

    update();

    const onResize = () => update();
    const onLoad = () => update();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onLoad);

    // scroll handler: update page; do NOT force wrap while user is interacting
    const onScroll = () => {
      const ow = el.scrollWidth / CLONE_SETS;
      if (!interactingRef.current) {
        // perform instant wrap only when NOT interacting (keeps visuals seamless)
        if (el.scrollLeft >= ow * 2 - 1) {
          el.scrollLeft = el.scrollLeft - ow;
        } else if (el.scrollLeft <= 1) {
          el.scrollLeft = el.scrollLeft + ow;
        }
      }

      const posInOriginal = mod(el.scrollLeft, ow);
      const page = Math.round(posInOriginal / el.clientWidth) || 0;
      setActivePage(page);
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      if (el) el.removeEventListener("scroll", onScroll);
    };
  }, [products]);

  // autoplay RAF loop — behaves like banner; respects interactingRef & paused
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !products || products.length === 0) return;

    // ensure middle at start (keeps content continuous)
    const ensureMiddleOnce = () => {
      const ow = el.scrollWidth / CLONE_SETS;
      const posInOriginal = mod(el.scrollLeft, ow);
      const prev = el.style.scrollBehavior;
      el.style.scrollBehavior = "auto";
      el.scrollLeft = Math.round(ow + posInOriginal);
      el.style.scrollBehavior = prev;
    };
    requestAnimationFrame(ensureMiddleOnce);
    const timeoutId = setTimeout(ensureMiddleOnce, 120);

    let rafId;
    let last = null;

    const step = (time) => {
      if (last == null) last = time;
      const delta = time - last;
      last = time;

      if (!paused && !interactingRef.current) {
        el.scrollLeft += SPEED_PX_PER_MS * delta;

        // when auto-scrolling, perform seamless wrap (safe because not interacting)
        const ow = el.scrollWidth / CLONE_SETS;
        if (el.scrollLeft >= ow * 2 - 1) {
          el.scrollLeft = el.scrollLeft - ow;
        } else if (el.scrollLeft <= 1) {
          el.scrollLeft = el.scrollLeft + ow;
        }
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      last = null;
      clearTimeout(timeoutId);
    };
  }, [paused, products]);

  // interaction handlers: allow manual scroll; pause auto while interacting; resume from current spot
  const startInteraction = () => {
    // clear any pending resume timer
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    interactingRef.current = true;
    setPaused(true);
  };

  const endInteraction = () => {
    // when user stops interacting, re-center into middle set while preserving visual offset,
    // then resume auto after small delay so user can finish momentum
    const el = containerRef.current;
    if (!el) return;

    // schedule resume
    resumeTimeoutRef.current = setTimeout(() => {
      // preserve visual offset (pos inside original) then place into middle set
      const ow = el.scrollWidth / CLONE_SETS;
      const posInOriginal = mod(el.scrollLeft, ow);
      const prev = el.style.scrollBehavior;
      el.style.scrollBehavior = "auto"; // instant reposition (visual identical)
      el.scrollLeft = Math.round(ow + posInOriginal);
      el.style.scrollBehavior = prev;

      interactingRef.current = false;
      setPaused(false);
      resumeTimeoutRef.current = null;
    }, RESUME_DELAY_MS);
  };

  const onPointerDown = (e) => {
    startInteraction();
    // allow pointer to drag: let browser handle it (don't call preventDefault)
  };

  const onPointerUp = () => {
    endInteraction();
  };

  const onMouseEnter = () => {
    // hover pauses but does not mark "interacting" — resume on leave
    setPaused(true);
  };

  const onMouseLeave = () => {
    // if user is actively interacting (dragging), do not resume yet
    if (!interactingRef.current) setPaused(false);
  };

  const goToPage = (pageIndex) => {
    const el = containerRef.current;
    if (!el || !products || products.length === 0) return;
    const ow = el.scrollWidth / CLONE_SETS;
    const leftInOriginal = Math.round(pageIndex * el.clientWidth);
    const left = Math.round(ow + leftInOriginal);
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
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchEnd={onPointerUp}
          onWheel={() => {
            // wheel implies user intent to control — treat as interaction
            startInteraction();
            // schedule resume when wheel stops
            endInteraction();
          }}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-2 py-2"
          // allow user scroll/drag — do not block defaults
        >
          {repeatedProducts.map((p, idx) => (
            <div
              key={`${p.id}-${p._rep}-${idx}`}
              className="flex-shrink-0 w-[220px] md:w-[240px] lg:w-[260px]"
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

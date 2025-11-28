import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scroll to top on every route change so pages don't keep previous scroll position
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use smooth for nicer UX but still jump to top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  return null;
}



import { coupones } from "../data/coupones";

const hasWindow = typeof window !== "undefined";

export const normalizeCode = (code = "") => code.trim().toUpperCase();

export function validateCoupon(code) {
  const normalized = normalizeCode(code);
  if (!normalized) {
    return { valid: false, message: "Enter a coupon code" };
  }

  const coupon = coupones.find((c) => c.code === normalized);
  if (!coupon) return { valid: false, message: "Invalid coupon" };

  if (new Date(coupon.expiresAt) < new Date()) {
    return { valid: false, message: "Coupon expired" };
  }

  return { valid: true, coupon, message: "Coupon applied" };
}

export function applyDiscount(total, coupon) {
  const amount = Number(total) || 0;
  if (!coupon || !amount) return amount;

  if (coupon.discountType === "percentage") {
    return Math.max(0, amount - (amount * coupon.discountValue) / 100);
  }

  if (coupon.discountType === "fixed") {
    return Math.max(0, amount - coupon.discountValue);
  }

  return amount;
}

export function persistCoupon(coupon) {
  if (!hasWindow) return;
  if (coupon) {
    localStorage.setItem("activeCoupon", JSON.stringify(coupon));
  } else {
    localStorage.removeItem("activeCoupon");
  }
}

export function readPersistedCoupon() {
  if (!hasWindow) return null;
  try {
    const stored = localStorage.getItem("activeCoupon");
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("Failed to parse stored coupon", err);
    return null;
  }
}



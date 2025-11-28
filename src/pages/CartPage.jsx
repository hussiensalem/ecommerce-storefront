// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
} from "../features/cart/cartSlice";
import {
  applyDiscount,
  persistCoupon,
  readPersistedCoupon,
  validateCoupon,
} from "../utils/coupons";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(() => readPersistedCoupon());

  useEffect(() => {
    persistCoupon(appliedCoupon);
  }, [appliedCoupon]);

  const handleApplyCoupon = () => {
    const result = validateCoupon(couponInput);
    if (result.valid) {
      setAppliedCoupon(result.coupon);
      setCouponMessage(`✅ ${result.coupon.code} applied`);
      setCouponInput("");
    } else {
      setAppliedCoupon(null);
      setCouponMessage(`❌ ${result.message}`);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponMessage("Coupon removed");
  };

  const discountedTotal = appliedCoupon
    ? applyDiscount(Number(totalPrice) || 0, appliedCoupon)
    : Number(totalPrice) || 0;
  const savings = Math.max(0, (Number(totalPrice) || 0) - discountedTotal);

  if (!items.length)
    return (
      <div className="p-8 text-xl font-semibold text-gray-700">
        Your cart is empty
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Your Cart ({totalItems} items)
      </h2>

      <button
        onClick={() => dispatch(clearCart())}
        className="mb-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Clear Cart
      </button>

      <ul className="space-y-4">
        {items.map((it) => (
          <li
            key={it.id}
            className="p-4 border rounded flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={it.image}
                alt={it.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{it.title}</h3>
                <p className="text-gray-600">
                  ${(Number(it.price) || 0).toFixed(2)}
                </p>

                <div className="flex items-center mt-2">
                  <button
                    className="px-3 py-1 border"
                    onClick={() => dispatch(decreaseQty(it.id))}
                  >
                    -
                  </button>
                  <span className="px-4">{it.qty}</span>
                  <button
                    className="px-3 py-1 border"
                    onClick={() => dispatch(increaseQty(it.id))}
                  >
                    +
                  </button>

                  <button
                    className="ml-4 text-red-600 hover:underline"
                    onClick={() => dispatch(removeItem(it.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="font-semibold text-lg">
              ${(Number(it.qty) * Number(it.price) || 0).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-right text-xl font-semibold">
        <div className="inline-flex flex-col items-end gap-1 w-full md:w-auto">
          <span>Subtotal: ${(Number(totalPrice) || 0).toFixed(2)}</span>
          {appliedCoupon && (
            <span className="text-green-600 text-base font-medium">
              Coupon ({appliedCoupon.code}): −${savings.toFixed(2)}
            </span>
          )}
          <span className="text-2xl">Total: ${discountedTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Have a coupon?</h3>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <button
            onClick={handleApplyCoupon}
            className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Apply
          </button>
          {appliedCoupon && (
            <button
              onClick={handleRemoveCoupon}
              className="px-5 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
            >
              Remove
            </button>
          )}
        </div>
        {couponMessage && (
          <p
            className={`mt-2 text-sm font-medium ${
              couponMessage.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {couponMessage}
          </p>
        )}
      </div>

      {/* Checkout Button */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => navigate("/checkout")}
          className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
          disabled={!items.length}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
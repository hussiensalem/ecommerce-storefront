import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearCart,
  selectCartItems,
  selectCartTotalPrice,
} from "../features/cart/cartSlice";
import {
  applyDiscount,
  readPersistedCoupon,
  persistCoupon,
} from "../utils/coupons";

const countries = ["Egypt", "Saudi Arabia", "UAE", "Jordan", "Other"];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  country: "",
  payment: "cash",
};

// Reusable Input Component
const FormInput = ({ label, id, type = "text", value, onChange, error }) => (
  <div className="col-span-2 md:col-span-1">
    <label htmlFor={id} className="block mb-1 font-medium">
      {label}
    </label>
    <input
      id={id}
      type={type}
      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black"
      value={value}
      onChange={onChange}
    />
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);

// Reusable Select Component
const FormSelect = ({ label, id, value, onChange, options, error }) => (
  <div>
    <label htmlFor={id} className="block mb-1 font-medium">
      {label}
    </label>
    <select
      id={id}
      className="w-full border p-3 rounded-lg bg-white focus:ring-2 focus:ring-black"
      value={value}
      onChange={onChange}
    >
      <option value="">Select Country</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);

export default function Checkout() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotalPrice);
  const [coupon] = useState(() => readPersistedCoupon());
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState(null);

  // Simple shipping rules to mimic a real store:
  // - Apply coupon to items first
  // - Then add shipping: free shipping for orders >= $200, otherwise $20
  const totals = useMemo(() => {
    const subtotal = Number(cartTotal) || 0;
    const discounted = coupon ? applyDiscount(subtotal, coupon) : subtotal;
    const savings = Math.max(0, subtotal - discounted);
    const shipping =
      discounted === 0 ? 0 : discounted >= 200 ? 0 : 20; // free shipping over $200
    const total = discounted + shipping;
    return { subtotal, discounted, shipping, total, savings };
  }, [cartTotal, coupon]);

  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "This field is required";
    if (!form.email.trim()) e.email = "This field is required";
    else if (!form.email.includes("@")) e.email = "Email must contain @";

    if (!form.phone.trim()) e.phone = "This field is required";
    else if (!/^\d+$/.test(form.phone))
      e.phone = "Phone must contain digits only";

    if (!form.address.trim()) e.address = "This field is required";
    if (!form.country.trim()) e.country = "Select a country";
    if (!form.payment) e.payment = "Select payment method";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Visa is not available yet: show message and force back to cash
    if (form.payment === "visa") {
      // Simple browser alert to inform the user
      window.alert("Visa payment is not available right now. Please use CASH on delivery.");
      setForm((prev) => ({ ...prev, payment: "cash" }));
      return;
    }

    const customer = { ...form };
    const itemsSnapshot = cartItems.map((item) => ({
      id: item.id,
      title: item.title,
      qty: item.qty,
      price: Number(item.price) || 0,
      image: item.image,
    }));

    setPopup({
      customer,
      items: itemsSnapshot,
      totals,
      payment: form.payment,
      coupon,
    });
    setForm(initialForm);
    setErrors({});
    dispatch(clearCart());
    persistCoupon(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 relative px-4">
      {/* Popup Summary */}
      {popup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-3xl">✓</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Order Placed Successfully!
            </h2>

            <p className="text-gray-600 text-sm mb-5">
              Here is a summary of your order:
            </p>

            <div className="bg-gray-100 p-4 rounded-xl text-sm border border-gray-300 text-left mb-6 space-y-4">
              <div>
                <p className="font-semibold text-gray-800">Items</p>
                <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto pr-2">
                  {popup.items.map((item) => (
                    <li
                      key={`${item.id}-${item.title}`}
                      className="flex items-center justify-between text-gray-700"
                    >
                      <span>
                        {item.title} × {item.qty}
                      </span>
                      <span className="font-semibold">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-gray-200 space-y-1">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span>${popup.totals.subtotal.toFixed(2)}</span>
                </div>
                {popup.totals.savings > 0 && (
                  <div className="flex justify-between text-green-600 text-sm">
                    <span>
                      Coupon {popup.coupon?.code ? `(${popup.coupon.code})` : ""}
                    </span>
                    <span>- ${popup.totals.savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Shipping</span>
                  <span>
                    {popup.totals.shipping === 0
                      ? "FREE"
                      : `$${popup.totals.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold">
                  <span>Order Total</span>
                  <span>${popup.totals.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Shipping to:</strong> {popup.customer.address},{" "}
                  {popup.customer.country}
                </p>
                <p>
                  <strong>Contact:</strong> {popup.customer.phone} /{" "}
                  {popup.customer.email}
                </p>
                <p>
                  <strong>Payment:</strong> {popup.payment.toUpperCase()}
                </p>
              </div>
            </div>

            <button
              onClick={() => setPopup(null)}
              className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Checkout Form</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="md:col-span-2">
            <FormInput
              label="Full Name"
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
            />
          </div>

          <FormInput
            label="Email"
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
          />

          <FormInput
            label="Phone Number"
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            error={errors.phone}
          />

          <div className="md:col-span-2">
            <FormInput
              label="Address"
              id="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              error={errors.address}
            />
          </div>

          <FormSelect
            label="Country"
            id="country"
            options={countries}
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            error={errors.country}
          />

          {/* Payment */}
          <div className="col-span-2">
            <label className="block mb-2 font-medium">Payment Method</label>
            <div className="flex gap-6">
              {["cash", "visa"].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={form.payment === method}
                    onChange={(e) =>
                      setForm({ ...form, payment: e.target.value })
                    }
                  />
                  {method.toUpperCase()}
                </label>
              ))}
            </div>
            {errors.payment && (
              <p className="text-red-600 text-sm mt-1">{errors.payment}</p>
            )}
          </div>

          <div className="col-span-2 flex items-center justify-between mt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800"
            >
              Submit Order
            </button>
          </div>
        </form>

        <div className="mt-10 bg-gray-50 border rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Order Summary
          </h2>
          {cartItems.length ? (
            <>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-3 flex justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.qty} × ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      ${(Number(item.price) * item.qty).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-1">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </div>
                {totals.savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Coupon {coupon?.code ? `(${coupon.code})` : ""}
                    </span>
                    <span>- ${totals.savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {totals.shipping === 0
                      ? "FREE"
                      : `$${totals.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${totals.total.toFixed(2)}</span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-600">
              Your cart is empty.{" "}
              <Link to="/products" className="underline font-semibold">
                Browse products
              </Link>
            </p>
          )}
        </div>

        <div className="text-center mt-8">
          <Link to="/cart" className="text-blue-600 underline">
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

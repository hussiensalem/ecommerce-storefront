// src/pages/CartPage.jsx
import React from "react";
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

const CartPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

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
          <li key={it.id} className="p-4 border rounded flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={it.image} alt={it.title} className="w-20 h-20 object-cover rounded" />
              <div>
                <h3 className="font-semibold">{it.title}</h3>
                <p className="text-gray-600">${(Number(it.price) || 0).toFixed(2)}</p>

                <div className="flex items-center mt-2">
                  <button className="px-3 py-1 border" onClick={() => dispatch(decreaseQty(it.id))}>-</button>
                  <span className="px-4">{it.qty}</span>
                  <button className="px-3 py-1 border" onClick={() => dispatch(increaseQty(it.id))}>+</button>

                  <button className="ml-4 text-red-600 hover:underline" onClick={() => dispatch(removeItem(it.id))}>Remove</button>
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
        Total: ${(Number(totalPrice) || 0).toFixed(2)}
      </div>
    </div>
  );
};

export default CartPage;

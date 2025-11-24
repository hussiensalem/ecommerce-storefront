// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// dev helper (optional)
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line no-undef
  window.store = store;
}

export default store;

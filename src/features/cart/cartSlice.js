// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { id, title, price (number), image, qty }
  totalItems: 0,
  totalPrice: 0,
};

const recalcTotals = (state) => {
  state.totalItems = state.items.reduce((sum, it) => sum + (it.qty || 0), 0);
  state.totalPrice = state.items.reduce(
    (sum, it) => sum + (Number(it.price) || 0) * (it.qty || 0),
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      // payload: { id, title, price (number), image, qty? }
      const prod = action.payload;
      if (!prod || !prod.id) return;
      const existing = state.items.find((i) => i.id === prod.id);
      if (existing) {
        existing.qty = (existing.qty || 0) + (prod.qty || 1);
      } else {
        state.items.push({ ...prod, qty: prod.qty || 1 });
      }
      recalcTotals(state);
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      recalcTotals(state);
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.qty = (item.qty || 0) + 1;
      recalcTotals(state);
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.qty = (item.qty || 0) - 1;
        if (item.qty <= 0) state.items = state.items.filter((i) => i.id !== id);
      }
      recalcTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      recalcTotals(state);
    },
    setCart: (state, action) => {
      state.items = action.payload.items || [];
      recalcTotals(state);
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQty,
  decreaseQty,
  clearCart,
  setCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalItems = (state) => state.cart.totalItems;
export const selectCartTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;

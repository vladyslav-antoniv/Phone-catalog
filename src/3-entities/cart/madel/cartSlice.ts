import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/entities/product/model/types';
import { RootState } from '@/src/app/store/store';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.product.itemId === product.itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product: product,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.product.itemId !== itemId);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item.product.itemId === itemId);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item.product.itemId === itemId);
      
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.product.itemId !== itemId);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} = cartSlice.actions;

// SELECTORS
//They calculate values on the fly.

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotalCount = (state: RootState) => 
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotalPrice = (state: RootState) => 
  state.cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

export const selectIsItemInCart = (itemId: string) => (state: RootState) =>
  state.cart.items.some((item) => item.product.itemId === itemId);

export default cartSlice.reducer;
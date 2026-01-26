import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/entities/product/model/types'; // Adjust path if needed

interface FavouritesState {
  favouritesProducts: Product[];
  count: number;
}

const initialState: FavouritesState = {
  favouritesProducts: [],
  count: 0,
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    // Note: We don't need initFavourites() anymore because 
    // redux-persist in store.ts handles the loading automatically.

    toggleFavourites(state, action: PayloadAction<Product>) {
      const product = action.payload;
      
      // Check if product is already in favourites using itemId
      const index = state.favouritesProducts.findIndex(
        (p) => p.itemId === product.itemId
      );

      if (index !== -1) {
        // If exists: Remove it
        state.favouritesProducts.splice(index, 1);
        state.count -= 1;
      } else {
        // If not exists: Add it
        state.favouritesProducts.push(product);
        state.count += 1;
      }
      
      // No need to manually save to localStorage here
    },
    
    // Optional: Helper to clear all
    clearFavourites(state) {
      state.favouritesProducts = [];
      state.count = 0;
    }
  },
});

export const { toggleFavourites, clearFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
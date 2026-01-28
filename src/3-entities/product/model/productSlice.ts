import { createAsyncThunk, createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Product, FullProduct } from './types';
import { RootState } from '@/src/app/store/store';
import { getAllProducts, getProductDetails, getFullProducts, prepareData } from "@/shared/api/products";

export type SortBy = { param: keyof Product; order: 'asc' | 'desc' };

interface ProductState {
  products: Product[];
  clearProducts: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  countItemsPage: number;
  category: string;
  sortBy: SortBy;
  fullProduct: FullProduct[];
  selectedProduct: FullProduct | null;
  selectedForCart: Product | null;
  searchQuery: string;
}

const initialState: ProductState = {
  products: [],
  clearProducts: [],
  loading: false,
  error: null,
  currentPage: 1,
  countItemsPage: 16,
  category: 'phones',
  sortBy: {
    param: 'year',
    order: 'desc',
  },
  fullProduct: [],
  selectedForCart: null,
  selectedProduct: null,
  searchQuery: '',
};

const updateVisibleProducts = (state: ProductState) => {
  const processed = prepareData(
    state.clearProducts, 
    state.category, 
    state.sortBy, 
    state.searchQuery
  );

  // Paginate (Slice)
  const start = (state.currentPage - 1) * state.countItemsPage;
  const end = start + state.countItemsPage;
  
  state.products = processed.slice(start, end);
};

export const getProductsStore = createAsyncThunk('products/get', async () => {
  return await getAllProducts();
});

export const getProductById = createAsyncThunk(
  'products/getById',
  async ({ id, table }: { id: string; table: string }, { rejectWithValue }) => {
    try {
      // Your existing API call logic...
      // const response = await ...
      return await getProductDetails(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
  //   return await getProductDetails(id);
  // },
);

export const getProductByIdForCart = createAsyncThunk(
  'products/getByIdForCart',
  async (id: string) => {
    return await getProductDetails(id);
  },
);

export const getCategoryFullProducts = createAsyncThunk(
  'products/getFullCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      switch (category) {
        case 'phones': return await getFullProducts('phones');
        case 'tablets': return await getFullProducts('tablets');
        default: return await getFullProducts('accessories');
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
      state.searchQuery = '';
      state.currentPage = 1;
      updateVisibleProducts(state);
    },

    // Change Sort -> Reset Page -> Update View
    changeSortValue(state, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload;
      state.currentPage = 1; 
      updateVisibleProducts(state);
    },

    // Change Search -> Reset Page -> Update View
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.currentPage = 1; 
      updateVisibleProducts(state);
    },

    // Change Page -> Update View
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
      updateVisibleProducts(state);
    },

    // Find Product Details
    findById(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.selectedProduct = state.fullProduct.find((p) => p.id === id) || null;
      state.selectedForCart = state.clearProducts.find((p) => p.itemId === id) || null;
    },
    
    // Initial Load for a specific category (called from Page)
    getCategoryProducts(state, action: PayloadAction<string>) {
      if (!state.clearProducts.length) return;
      state.category = action.payload;
      state.currentPage = 1;
      updateVisibleProducts(state);
    },
  },
  
  extraReducers: (builder) => {
    builder
      // LOAD ALL PRODUCTS
      .addCase(getProductsStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsStore.fulfilled, (state, action) => {
        state.clearProducts = action.payload;
        state.loading = false;
        updateVisibleProducts(state);
      })
      .addCase(getProductsStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading products';
      })

      // LOAD DETAILS
      .addCase(getProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      
      // LOAD CART ITEM
      .addCase(getProductByIdForCart.fulfilled, (state, action) => {
        state.selectedForCart = action.payload;
      })

      // LOAD FULL CATEGORY
      .addCase(getCategoryFullProducts.fulfilled, (state, action) => {
        state.fullProduct = action.payload || [];
      });
  },
});

// SELECTORS (Memoized)

const selectClearProducts = (state: RootState) => state.products.clearProducts;

// Optimized selector to prevent re-renders
export const selectTotalByCategory = createSelector(
  [selectClearProducts, (state: RootState, category: string) => category],
  (products, category) => products.filter((p) => p.category === category)
);

export const {
  setCategory,
  changeSortValue,
  setSearchQuery,
  setCurrentPage,
  findById,
  getCategoryProducts
} = productSlice.actions;

export default productSlice.reducer;
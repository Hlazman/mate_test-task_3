import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    pinProduct: (state, action) => {
      const pined = state.products.filter(product => product.id === action.payload);
      pined[0].isPined = true;
      const otherProducts = state.products.filter(product => product.id !== action.payload);
      otherProducts.forEach(product => product.isPined = false);
      state.products = [...pined, ...otherProducts];
    },

    addProduct: (state, action) => {
      state.products = [...state.products, action.payload ]
    }
  },
});


export default productsSlice.reducer;
export const { setProducts, removeProduct, pinProduct, addProduct } = productsSlice.actions;
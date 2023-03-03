import { createSlice } from "@reduxjs/toolkit";
import {
  PRODUCT_INFO_S,
  PRODUCT_INFO_F,
  PRODUCT_LIST_S,
  PRODUCT_LIST_F,
  API_PRODUCT,
} from "../constants";

const initialState = {
  isLoading: false,
  productList: [],
  productInfo: {},
};

export const getProductList = (data) => ({
  type: "API2",
  payload: {
    url: API_PRODUCT,
    method: "GET",
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: PRODUCT_LIST_S,
      payload: data,
    }),
    error: (data) => ({
      type: PRODUCT_LIST_F,
      payload: [],
    }),
  },
});

// Reducer
const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  // reducers: {
  //   loaderChange: (state, payload) => {
  //     state.isLoading = payload.payload;
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(PRODUCT_LIST_S, (state, action) => {
      // console.log(action.payload);
      state.productList = action.payload;
    });
    builder.addCase(PRODUCT_LIST_F, (state) => {
      state.productList = [];
    });
    builder.addCase(PRODUCT_INFO_S, (state, action) => {
      state.productInfo = action.payload;
    });
    builder.addCase(PRODUCT_INFO_F, (state) => {
      state.productInfo = {};
    });
  },
});

// export const { loaderChange } = productSlice.actions;
export default productSlice.reducer;

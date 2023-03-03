import { configureStore } from "@reduxjs/toolkit";
import reduxApiMiddleware from "./Middleware";
import thunk from "redux-thunk";
import AuthSlice from "./AuthSlice";
import UserSlice from "./UserSlice";
import productMiddleware from "./Middleware/productMiddleware";
import ProductSlice from "./ProductSlice";
import AlbumSlice from "./AlbumSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    user: UserSlice,
    product: ProductSlice,
    Album: AlbumSlice,
  },
  middleware: [thunk, reduxApiMiddleware],
});

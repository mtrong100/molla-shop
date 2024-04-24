import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slices/userSlice";
import sortSlice from "./slices/sortSlice";
import createProductSlice from "./slices/createProductSlice";
import commentSlice from "./slices/commentSlice";
import wishlistSlice from "./slices/wishlistSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";

const rootReducer = combineReducers({
  user: userSlice,
  sort: sortSlice,
  createProduct: createProductSlice,
  comment: commentSlice,
  wishlist: wishlistSlice,
  product: productSlice,
  cart: cartSlice,
  order: orderSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "sort",
    "createProduct",
    "comment",
    "product",
    "wishlist",
    "order",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

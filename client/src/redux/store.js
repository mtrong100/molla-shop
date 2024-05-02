import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";
import wishlistSlice from "./slices/wishlistSlice";
import globalSlice from "./slices/globalSlice";

const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  order: orderSlice,
  wishlist: wishlistSlice,
  global: globalSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["order", "wishlist", "global"],
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

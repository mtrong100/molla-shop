import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slices/userSlice";
import sortSlice from "./slices/sortSlice";
import createProductSlice from "./slices/createProductSlice";

const rootReducer = combineReducers({
  user: userSlice,
  sort: sortSlice,
  createProduct: createProductSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["sort", "createProduct"],
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

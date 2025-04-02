import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage için
import { ProductAPI } from "./apis/product/productApi";
import { SignInAPI } from "./apis/signInApi";
import authReducer from "./slices/authSlice/AuthSlice";
import searchSlice from "./slices/product/ProductSeachSlice";

// Persist konfigürasyonu
const persistConfig = {
  key: 'root', // localStorage'ta "root" key'i altında saklanacak
  storage,
  whitelist: ['auth'] // Sadece auth slice'ını kalıcı yap
};
const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    auth: persistedReducer,
    search: searchSlice,
    [SignInAPI.reducerPath]: SignInAPI.reducer,
    [ProductAPI.reducerPath]: ProductAPI.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: { ignoredActions: ['persist/PERSIST'] }}).concat(SignInAPI.middleware, ProductAPI.middleware),
})

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

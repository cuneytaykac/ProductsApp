import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { SignInAPI } from "./apis/signInApi";
import authReducer from "./slices/authSlice/AuthSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    auth: authReducer,
    [SignInAPI.reducerPath]: SignInAPI.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(SignInAPI.middleware),
})

setupListeners(store.dispatch);

export { useFetchSignInMutation } from './apis/signInApi';

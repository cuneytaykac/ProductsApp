import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInModel } from "../models/SignInModel";

// SignInAPI.ts
export const SignInAPI = createApi({
  reducerPath: 'signInAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/auth/' }),
  endpoints: (builder) => ({
    fetchSignIn: builder.mutation<SignInModel, { username: string; password: string }>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST', // POST isteği zorunlu
        body: credentials,
      }),
    }),
  }),
});

export const { useFetchSignInMutation } = SignInAPI; // DİKKAT: Artık mutation kullanıyoruz
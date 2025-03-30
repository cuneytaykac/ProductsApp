// src/store/apis/signInApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 1. Response tipini güncelle
export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;  // Ana token
  refreshToken?: string; // Opsiyonel
}

export const SignInAPI = createApi({
  reducerPath: 'signInAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://dummyjson.com/auth/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    fetchSignIn: builder.mutation<AuthResponse, { username: string; password: string }>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: JSON.stringify(credentials)
      }),
      // 2. API'den gelen token alanını düzelt
      transformResponse: (response: any) => ({
        ...response,
        accessToken: response.accessToken // API'nin döndüğü gerçek alan adı
      })
    }),
  }),
});

export const { useFetchSignInMutation } = SignInAPI; 
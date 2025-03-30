// src/store/slices/authSlice/AuthSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Tipleri tanımla
interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface AuthState {
  showPassword: boolean;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  accessToken: string | null; // 2. 'token' -> 'accessToken'
  refreshToken: string | null;
  user: User | null;
}

// 3. Başlangıç state'i
  const initialState: AuthState = {
  showPassword: false,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 4. Mevcut reducer'lar
    togglePasswordVisibility: (state) => {
      state.showPassword = !state.showPassword;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // 5. Yeni loginSuccess reducer'ı
    loginSuccess: (state, action: PayloadAction<{
      accessToken: string;
      refreshToken?: string;
      user: User;
    }>) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken || null;
      state.user = action.payload.user;
      
      // 6. localStorage'a kaydet
      localStorage.setItem('auth', JSON.stringify({
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user
      }));
    },
    // 7. Logout reducer'ı
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem('auth');
    }
  }
});

// 8. Action'ları export et
export const { 
  togglePasswordVisibility, 
  setLoading, 
  setError,
  loginSuccess,
  logout 
} = authSlice.actions;

export default authSlice.reducer;

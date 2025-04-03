import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/products/ProductsResponse";

interface BasketState {
  items: (Product & { count: number })[];
}

const loadBasketFromStorage = (): BasketState => {
  const storedBasket = localStorage.getItem('basket');
  return storedBasket 
    ? JSON.parse(storedBasket)
    : { items: [] };
};

const initialState: BasketState = loadBasketFromStorage();

const BasketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Eğer ürün sepette varsa count'u 1 arttır
        existingItem.count += 1;
      } else {
        // Yeni ürün eklerken count: 1 olarak başlat
        state.items.push({ ...action.payload, count: 1 });
      }
      updateLocalStorage(state);
    },
    
    removeItem: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      
      if (existingItem && existingItem.count > 1) {
        // Eğer count 1'den fazlaysa 1 azalt
        existingItem.count -= 1;
      } else {
        // Count 1 ise veya bulunamazsa ürünü tamamen kaldır
        state.items = state.items.filter(item => item.id !== action.payload);
      }
      updateLocalStorage(state);
    },
    
    clearBasket: (state) => {
      state.items = [];
      localStorage.removeItem('basket');
    },
    
    // İsteğe bağlı: Belirli bir miktarda ekleme
    addItemWithQuantity: (state, action: PayloadAction<{product: Product; quantity: number}>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.count += quantity;
      } else {
        state.items.push({ ...product, count: quantity });
      }
      updateLocalStorage(state);
    },
    
    // İsteğe bağlı: Belirli bir miktara ayarlama
    setItemQuantity: (state, action: PayloadAction<{id: number; quantity: number}>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.count = quantity;
        }
        updateLocalStorage(state);
      }
    }
  }
});

// LocalStorage güncelleme fonksiyonu
const updateLocalStorage = (state: BasketState) => {
  localStorage.setItem('basket', JSON.stringify({
    items: state.items
  }));
};

// Sepet öğe sayısını döndüren selector (toplam ürün adedi)
export const selectBasketItemCount = (state: { basket: BasketState }) => {
  // state.basket ve state.basket.items kontrolü ekliyoruz
  if (!state?.basket?.items) return 0;
  return state.basket.items.reduce((total, item) => total + (item.count || 0), 0);
};
// Benzersiz ürün sayısını döndüren selector
export const selectUniqueBasketItemCount = (state: { basket: BasketState }) =>
  state.basket.items.length;

// Sepet toplam fiyatını hesaplayan selector
export const selectBasketTotal = (state: { basket: BasketState }) =>
  state.basket.items.reduce((total, item) => total + (item.price * item.count), 0);

export const { 
  addItem, 
  removeItem, 
  clearBasket,
  addItemWithQuantity,
  setItemQuantity
} = BasketSlice.actions;

export default BasketSlice.reducer;
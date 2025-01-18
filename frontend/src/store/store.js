import { configureStore } from '@reduxjs/toolkit';
import { agreementApi } from './services/agreementApi';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    [agreementApi.reducerPath]: agreementApi.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(agreementApi.middleware),
});
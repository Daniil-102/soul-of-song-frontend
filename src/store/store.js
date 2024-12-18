import { configureStore } from '@reduxjs/toolkit';
import { songApi } from './songs/songs';
import { authApi } from './auth/auth';
import settingsSlice from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    [songApi.reducerPath]: songApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    settings: settingsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(songApi.middleware)
      .concat(authApi.middleware),
});

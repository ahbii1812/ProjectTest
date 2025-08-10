import { configureStore } from '@reduxjs/toolkit';
import MovieSlice from './MovieSlice';

export const store = configureStore({
  reducer: {
    movie: MovieSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const AppDispatch = store.dispatch;

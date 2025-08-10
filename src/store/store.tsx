import { configureStore } from '@reduxjs/toolkit';
import MovieSlice from './MovieSlice';
import UserSlice from './UserSlice';

export const store = configureStore({
  reducer: {
    movie: MovieSlice,
    user: UserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const AppDispatch = store.dispatch;

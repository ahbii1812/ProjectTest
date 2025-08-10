import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { get } from '../network/APIRequest';

type Status = 'idle' | 'succeeded' | 'rejected' | 'pending';

export type MovieCategory = 'now_playing' | 'popular' | 'upcoming';

interface InterfaceInitialState {
  status: Status;
  message: string;
  payload: any;
}

interface InitialState {
  getNowPlayingMovieListObj: InterfaceInitialState;
  getUpcomingMovieListObj: InterfaceInitialState;
  getPopularMovieListObj: InterfaceInitialState;
}

export const getNowPlayingMovieList = createAsyncThunk(
  '/movie/now-playing',
  async ({ page }: { page: number }) => {
    return get(`/now_playing?language=en-US&page=${page}`);
  },
);

export const getUpcomingMovieList = createAsyncThunk(
  '/movie/upcoming',
  async ({ page }: { page: number }) => {
    return get(`/upcoming?language=en-US&page=${page}`);
  },
);

export const getPopularMovieList = createAsyncThunk(
  '/movie/popular',
  async ({ page }: { page: number }) => {
    return get(`/popular?language=en-US&page=${page}`);
  },
);

export const MovieSlice = createSlice({
  name: 'movie',
  initialState: {
    getNowPlayingMovieListObj: {
      status: 'idle',
      message: '',
      payload: null,
    },
    getUpcomingMovieListObj: {
      status: 'idle',
      message: '',
      payload: null,
    },
    getPopularMovieListObj: {
      status: 'idle',
      message: '',
      payload: null,
    },
  } satisfies InitialState as InitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getNowPlayingMovieList.pending, state => {
      state.getNowPlayingMovieListObj.status = 'pending';
      state.getNowPlayingMovieListObj.payload = null;
    });
    builder.addCase(getNowPlayingMovieList.fulfilled, (state, action) => {
      state.getNowPlayingMovieListObj.message = '';
      state.getNowPlayingMovieListObj.status = 'succeeded';
      state.getNowPlayingMovieListObj.payload = action.payload;
    });
    builder.addCase(getNowPlayingMovieList.rejected, (state, action) => {
      state.getNowPlayingMovieListObj.message = action.error.message || '';
      state.getNowPlayingMovieListObj.status = 'rejected';
      state.getNowPlayingMovieListObj.payload = null;
    });
    builder.addCase(getUpcomingMovieList.pending, state => {
      state.getUpcomingMovieListObj.status = 'pending';
      state.getUpcomingMovieListObj.payload = null;
    });
    builder.addCase(getUpcomingMovieList.fulfilled, (state, action) => {
      state.getUpcomingMovieListObj.message = '';
      state.getUpcomingMovieListObj.status = 'succeeded';
      state.getUpcomingMovieListObj.payload = action.payload;
    });
    builder.addCase(getUpcomingMovieList.rejected, (state, action) => {
      state.getUpcomingMovieListObj.message = action.error.message || '';
      state.getUpcomingMovieListObj.status = 'rejected';
      state.getUpcomingMovieListObj.payload = null;
    });
    builder.addCase(getPopularMovieList.pending, state => {
      state.getPopularMovieListObj.status = 'pending';
      state.getPopularMovieListObj.payload = null;
    });
    builder.addCase(getPopularMovieList.fulfilled, (state, action) => {
      state.getPopularMovieListObj.message = '';
      state.getPopularMovieListObj.status = 'succeeded';
      state.getPopularMovieListObj.payload = action.payload;
    });
    builder.addCase(getPopularMovieList.rejected, (state, action) => {
      state.getPopularMovieListObj.message = action.error.message || '';
      state.getPopularMovieListObj.status = 'rejected';
      state.getPopularMovieListObj.payload = null;
    });
  },
});

export const movieSelector = (state: RootState) => state.movie;
export default MovieSlice.reducer;

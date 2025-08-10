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
  getMovieDetailObj: InterfaceInitialState;
  getMovieCreditObj: InterfaceInitialState;
}

export const getNowPlayingMovieList = createAsyncThunk(
  '/movie/now-playing',
  async ({ page }: { page: number }) => {
    return get(`/movie/now_playing?language=en-US&page=${page}`);
  },
);

export const getUpcomingMovieList = createAsyncThunk(
  '/movie/upcoming',
  async ({ page }: { page: number }) => {
    return get(`/movie/upcoming?language=en-US&page=${page}`);
  },
);

export const getPopularMovieList = createAsyncThunk(
  '/movie/popular',
  async ({ page }: { page: number }) => {
    return get(`/movie/popular?language=en-US&page=${page}`);
  },
);

export const getMovieDetails = createAsyncThunk(
  '/movie/details',
  async ({ movieId }: { movieId: number }) => {
    return get(`/movie/${movieId}?language=en-US`);
  },
);

export const getMovieCredit = createAsyncThunk(
  '/movie/credit',
  async ({ movieId }: { movieId: number }) => {
    return get(`/movie/${movieId}/credits?language=en-US`);
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
    getMovieDetailObj: {
      status: 'idle',
      message: '',
      payload: null,
    },
    getMovieCreditObj: {
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
    builder.addCase(getMovieDetails.pending, state => {
      state.getMovieDetailObj.status = 'pending';
      state.getMovieDetailObj.payload = null;
    });
    builder.addCase(getMovieDetails.fulfilled, (state, action) => {
      state.getMovieDetailObj.message = '';
      state.getMovieDetailObj.status = 'succeeded';
      state.getMovieDetailObj.payload = action.payload;
    });
    builder.addCase(getMovieDetails.rejected, (state, action) => {
      state.getMovieDetailObj.message = action.error.message || '';
      state.getMovieDetailObj.status = 'rejected';
      state.getMovieDetailObj.payload = null;
    });
    builder.addCase(getMovieCredit.pending, state => {
      state.getMovieCreditObj.status = 'pending';
      state.getMovieCreditObj.payload = null;
    });
    builder.addCase(getMovieCredit.fulfilled, (state, action) => {
      state.getMovieCreditObj.message = '';
      state.getMovieCreditObj.status = 'succeeded';
      state.getMovieCreditObj.payload = action.payload;
    });
    builder.addCase(getMovieCredit.rejected, (state, action) => {
      state.getMovieCreditObj.message = action.error.message || '';
      state.getMovieCreditObj.status = 'rejected';
      state.getMovieCreditObj.payload = null;
    });
  },
});

export const movieSelector = (state: RootState) => state.movie;
export default MovieSlice.reducer;

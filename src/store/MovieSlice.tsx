import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { get } from '../network/APIRequest';

type Status = 'idle' | 'succeeded' | 'rejected' | 'pending';

interface InterfaceInitialState {
  status: Status;
  message: string;
  payload: any;
}

interface InitialState {
  getNowPlayingMovieObj: InterfaceInitialState;
}

export const getNowPlayingMovie = createAsyncThunk(
  '/movie/now-playing',
  async () => {
    return get('/now_playing?language=en-US&page=1');
  },
);

export const MovieSlice = createSlice({
  name: 'movie',
  initialState: {
    getNowPlayingMovieObj: {
      status: 'idle',
      message: '',
      payload: null,
    },
  } satisfies InitialState as InitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getNowPlayingMovie.pending, state => {
      state.getNowPlayingMovieObj.status = 'pending';
    });
    builder.addCase(getNowPlayingMovie.fulfilled, (state, action) => {
      state.getNowPlayingMovieObj.message = '';
      state.getNowPlayingMovieObj.status = 'succeeded';
      state.getNowPlayingMovieObj.payload = action.payload;
    });
    builder.addCase(getNowPlayingMovie.rejected, (state, action) => {
      state.getNowPlayingMovieObj.message = action.error.message || '';
      state.getNowPlayingMovieObj.status = 'rejected';
      state.getNowPlayingMovieObj.payload = null;
    });
  },
});

export const movieSelector = (state: RootState) => state.movie;
export default MovieSlice.reducer;

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
  getUserDetailsObj: InterfaceInitialState;
}

export const getUserDetails = createAsyncThunk('/user/details', async () => {
  return get(`/account/22213405`);
});

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    getUserDetailsObj: {
      status: 'idle',
      message: '',
      payload: null,
    },
  } satisfies InitialState as InitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserDetails.pending, state => {
      state.getUserDetailsObj.status = 'pending';
      state.getUserDetailsObj.payload = null;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.getUserDetailsObj.message = '';
      state.getUserDetailsObj.status = 'succeeded';
      state.getUserDetailsObj.payload = action.payload;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.getUserDetailsObj.message = action.error.message || '';
      state.getUserDetailsObj.status = 'rejected';
      state.getUserDetailsObj.payload = null;
    });
  },
});

export const userSelector = (state: RootState) => state.user;
export default UserSlice.reducer;

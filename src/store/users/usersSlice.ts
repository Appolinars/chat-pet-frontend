import { isRejectedAction } from '..';
import { getAllUsers } from './usersActions';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IUsersState } from './usersSlice.interface';

const initialState: IUsersState = {
  list: [],
};

const sliceName = 'users';

export const usersSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addMatcher(
        (action) => isRejectedAction(action, sliceName),
        (state, action) => {
          toast.error(action.payload as string);
        }
      );
  },
});

export const usersReducer = usersSlice.reducer;

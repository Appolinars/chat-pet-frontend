import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUser } from '@/shared/types/user';

interface IAuthState {
  user: IUser | null;
}
const initialState: IAuthState = {
  user: null,
};

const sliceName = 'auth';

export const authSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { resetAuth, setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;

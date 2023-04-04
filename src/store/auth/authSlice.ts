import { isRejectedAction } from '..';
import { checkAuth, login, logout, registerUser, updateAvatar, updateUser } from './authActions';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';



import { localStorageHelper } from '@/shared/utils';



import { IAuthState } from './authSlice.interface';


const initialState: IAuthState = {
  user: null,
  isLoading: false,
  isCheckingAuth: false,
  checkAuthSuccess: false,
  checkAuthError: false,
  isAvatarUpdating: false,
};

const sliceName = 'auth';

export const authSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isCheckingAuth = false;
      state.checkAuthSuccess = false;
      state.checkAuthError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        localStorageHelper.set('token', action.payload.accessToken);
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        localStorageHelper.set('token', action.payload.accessToken);
      })
      .addCase(checkAuth.pending, (state, action) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.checkAuthSuccess = true;
        state.user = action.payload.user;
        localStorageHelper.set('token', action.payload.accessToken);
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isCheckingAuth = false;
        state.checkAuthError = true;
        localStorageHelper.remove('token');
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateAvatar.pending, (state) => {
        state.isAvatarUpdating = true;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isAvatarUpdating = false;
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        localStorageHelper.remove('token');
      })
      .addMatcher(
        (action) => isRejectedAction(action, sliceName),
        (state, action) => {
          state.isLoading = false;
          toast.error(action.payload as string);
        }
      );
  },
});

export const { resetAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;
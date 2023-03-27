import { createAsyncThunk } from '@reduxjs/toolkit';

import { authService } from '@/services/auth.service';

import { ILoginPayload, IRegisterPayload } from '@/shared/types/user';
import { errorCatch, localStorageHelper } from '@/shared/utils';

export const register = createAsyncThunk(
  'auth/register',
  async (userData: IRegisterPayload, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error: any) {
      const message = errorCatch(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk('auth/login', async (user: ILoginPayload, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: any) {
    const message = errorCatch(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const checkAuth = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    return await authService.refresh();
  } catch (error: any) {
    const message = errorCatch(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error: any) {
    const message = errorCatch(error);
    return thunkAPI.rejectWithValue(message);
  }
});

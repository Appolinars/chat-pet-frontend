import { createAsyncThunk } from '@reduxjs/toolkit';

import { usersService } from '@/services/users.service';

import { errorCatch } from '@/shared/utils';

export const getAllUsers = createAsyncThunk('users/getAll', async (_, thunkAPI) => {
  try {
    return await usersService.getAll();
  } catch (error: any) {
    const message = errorCatch(error);
    return thunkAPI.rejectWithValue(message);
  }
});

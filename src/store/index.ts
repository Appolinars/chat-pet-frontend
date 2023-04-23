import {
  Action,
  AnyAction,
  Middleware,
  MiddlewareAPI,
  configureStore,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { uploadApi } from '@/services/upload.service';

import { apiSlice } from './apiSlice';
import { authReducer } from './auth/authSlice';

interface IRejectedAction extends Action {
  payload: string;
}
export const isRejectedAction = (action: AnyAction, name: string): action is IRejectedAction =>
  action.type.startsWith(name) && action.type.endsWith('rejected');

const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast.error(action?.payload?.data?.message || 'Something went wrong');
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, uploadApi.middleware, rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

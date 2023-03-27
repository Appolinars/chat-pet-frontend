import { Action, AnyAction, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { authReducer } from './auth/authSlice';
import { usersReducer } from './users/usersSlice';

interface IRejectedAction extends Action {
  payload: string;
}
export const isRejectedAction = (action: AnyAction, name: string): action is IRejectedAction =>
  action.type.startsWith(name) && action.type.endsWith('rejected');

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
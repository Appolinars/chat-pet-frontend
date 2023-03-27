import { CircularProgress } from '@mui/material';
import { FC, PropsWithChildren, useEffect } from 'react';

import { checkAuth } from '@/store/auth/authActions';
import {
  authErrorSelector,
  authSuccessSelector,
  isCheckingAuthSelector,
} from '@/store/auth/authSelectors';

import { setupAxiosInterceptors } from '@/shared/api';
import { localStorageHelper } from '@/shared/utils';

import { store, useAppDispatch, useAppSelector } from '@/store';

let renderCount = 0;
export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(isCheckingAuthSelector);
  const isSuccess = useAppSelector(authSuccessSelector);
  const error = useAppSelector(authErrorSelector);
  const token = localStorageHelper.get('token');

  useEffect(() => {
    setupAxiosInterceptors(store);

    const handleUserAuth = () => {
      if (!token) return;

      const isProd = import.meta.env.PROD;
      if (isProd) return dispatch(checkAuth());
      // dispatch once in development
      if (renderCount !== 0) {
        dispatch(checkAuth());
      }
      renderCount++;
    };

    handleUserAuth();
  }, []);

  if (!token) return <>{children}</>;

  // prevent flash login page if manually open it, you'll see it if you use only loading state
  const isAppLoading = (token && !isSuccess && !error) || loading;

  if (isAppLoading)
    return (
      <div className="min-h-screen flex justify-center items-center text-accentColor">
        <CircularProgress color="inherit" size={70} />
      </div>
    );

  return <>{children}</>;
};

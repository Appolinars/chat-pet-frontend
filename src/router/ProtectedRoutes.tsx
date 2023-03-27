import { FC, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthHeader } from '@/components/layout/authHeader/AuthHeader';

import { authErrorSelector, userSelector } from '@/store/auth/authSelectors';
import { resetAuth } from '@/store/auth/authSlice';

import { localStorageHelper } from '@/shared/utils';

import { useAppDispatch, useAppSelector } from '@/store';

export const ProtectedRoutes: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const error = useAppSelector(authErrorSelector);
  const token = localStorageHelper.get('token');

  useEffect(() => {
    if (error) dispatch(resetAuth());
  }, [error]);

  if (!token || error) return <Navigate to="/login" replace />;

  return user ? (
    <>
      <AuthHeader />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

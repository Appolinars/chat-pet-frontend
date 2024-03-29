import Cookies from 'js-cookie';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthHeader } from '@/components/layout/authHeader/AuthHeader';

import { userSelector } from '@/store/auth/auth.selectors';

import { useAppSelector } from '@/store';

export const ProtectedRoutes: FC = () => {
  const user = useAppSelector(userSelector);
  const token = Cookies.get('token_pet');

  if (!token) return <Navigate to="/login" replace />;

  return user ? (
    <>
      <AuthHeader />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

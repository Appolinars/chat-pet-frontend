import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { userSelector } from '@/store/auth/authSelectors';

import { useAppSelector } from '@/store';

export const RequireNotAuth: FC = () => {
  const user = useAppSelector(userSelector);
  return user ? <Navigate to="/chat" replace /> : <Outlet />;
};

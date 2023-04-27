import { CircularProgress } from '@mui/material';
import { PropsWithChildren, useEffect, useState } from 'react';

import { useCheckAuthMutation } from '@/store/auth/authApi.slice';

import { localStorageHelper } from '@/shared/utils';

let renderCount = 0;
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [checkAuth, { isLoading }] = useCheckAuthMutation();
  const [success, setSuccess] = useState<boolean>(false);
  const token = localStorageHelper.get('token');

  useEffect(() => {
    const handleUserAuth = async () => {
      if (!token) return;

      const isProd = import.meta.env.PROD;
      if (isProd) {
        await checkAuth('');
        setSuccess(true);
        return;
      }
      // dispatch once in development
      if (renderCount !== 0) {
        await checkAuth('');
        setSuccess(true);
      }
      renderCount++;
    };

    void handleUserAuth();
  }, []);

  if (!token) return <>{children}</>;
  const isAppLoading = (token && !success) || isLoading;

  return (
    <>
      {isAppLoading ? (
        <div className="min-h-screen flex justify-center items-center text-accentColor">
          <CircularProgress color="inherit" size={70} />
        </div>
      ) : (
        children
      )}
    </>
  );
};

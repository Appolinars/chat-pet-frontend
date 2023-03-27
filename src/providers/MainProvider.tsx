import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from '@/store';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
      <ToastContainer theme="dark" />
    </Provider>
  );
};

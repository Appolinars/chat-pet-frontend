import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';
import { store } from '@/store';

export const MainProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
      <ToastContainer theme="dark" />
    </Provider>
  );
};

import { ProtectedRoutes } from './ProtectedRoutes';
import { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Settings } from '@/pages/Settings';
import { Chat } from '@/pages/chat/Chat';
import { Dialog } from '@/pages/chat/dialog/Dialog';

import { AnimatedBackground } from '@/components/layout/AnimatedBackground';

import { RequireNotAuth } from './RequireNotAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AnimatedBackground />,
    errorElement: <div>Route not found</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <RequireNotAuth />,
        children: [
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/register',
            element: <Register />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/chat',
        element: <Chat />,
        children: [
          {
            path: ':chatId',
            element: <Dialog />,
          },
        ],
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]);

export const AppRouter: FC = () => {
  return <RouterProvider router={router} />;
};

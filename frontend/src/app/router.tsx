import { DashboardPage } from '@/common/pages';
import { LoginPage, RegisterPage, LogoutPage } from '@/features/auth';
import { AuthLayout, DashboardLayout } from '@/layouts';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: 'logout',
    element: <LogoutPage />,
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/',
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
]);

export default router;

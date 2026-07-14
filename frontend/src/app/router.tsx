import { DashboardPage } from '@/common/pages';
import { LoginPage, RegisterPage } from '@/features/auth';
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
    path: '/',
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;

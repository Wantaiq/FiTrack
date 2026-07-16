import { DashboardPage } from '@/common/pages';
import { LoginPage, RegisterPage, LogoutPage } from '@/features/auth';
import ExercisesPage from '@/features/exercises/pages/ExercisesPage';
import NewExercisePage from '@/features/exercises/pages/NewExercisePage';
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
      {
        path: '/exercises',
        children: [
          {
            index: true,
            element: <ExercisesPage />,
          },
          {
            path: 'new',
            element: <NewExercisePage />,
          },
        ],
      },
    ],
  },
]);

export default router;

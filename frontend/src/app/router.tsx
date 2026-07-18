import { DashboardPage } from '@/common/pages';
import { LoginPage, RegisterPage, LogoutPage } from '@/features/auth';
import {
  ExerciseDetailsPage,
  ExercisesPage,
  NewExercisePage,
} from '@/features/exercises';
import { NewWorkoutTemplatePage } from '@/features/workout-templates';
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
          {
            path: ':id',
            element: <ExerciseDetailsPage />,
          },
        ],
      },
      {
        path: '/workout-templates',
        children: [
          {
            path: 'new',
            element: <NewWorkoutTemplatePage />,
          },
        ],
      },
    ],
  },
]);

export default router;

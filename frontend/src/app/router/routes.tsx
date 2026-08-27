import { DashboardPage } from "@/common/pages";
import { LoginPage, RegisterPage, LogoutPage } from "@/features/auth";
import {
  ExerciseDetailsPage,
  ExercisesPage,
  NewExercisePage,
  EditExercisePage,
} from "@/features/exercises";
import { SchedulePage } from "@/features/schedule";
import {
  NewWorkoutTemplatePage,
  WorkoutTemplateDetailsPage,
  WorkoutTemplatesPage,
  EditWorkoutTemplatePage,
} from "@/features/workout-templates";
import { AuthLayout, DashboardLayout } from "@/layouts";
import type { AppRouteObject } from "./types";

const routes: AppRouteObject[] = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "logout",
    element: <LogoutPage />,
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        element: <DashboardLayout />,
        handle: {
          nav: {
            label: "Dashboard",
          },
        },
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "exercises",
            handle: {
              nav: {
                label: "Exercises",
              },
            },
            children: [
              {
                index: true,
                element: <ExercisesPage />,
              },
              {
                path: "new",
                element: <NewExercisePage />,
              },
              {
                path: ":id",
                element: <ExerciseDetailsPage />,
              },
              {
                path: ":id/edit",
                element: <EditExercisePage />,
              },
            ],
          },
          {
            path: "workout-templates",
            handle: {
              nav: {
                label: "Workout templates",
              },
            },
            children: [
              {
                index: true,
                element: <WorkoutTemplatesPage />,
              },
              {
                path: "new",
                element: <NewWorkoutTemplatePage />,
              },
              {
                path: ":id",
                element: <WorkoutTemplateDetailsPage />,
              },
              {
                path: ":id/edit",
                element: <EditWorkoutTemplatePage />,
              },
            ],
          },
          {
            path: "schedule",
            handle: {
              nav: {
                label: "Schedule",
              },
            },
            children: [
              {
                index: true,
                element: <SchedulePage />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;

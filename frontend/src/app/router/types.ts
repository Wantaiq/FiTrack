import type { RouteObject } from 'react-router';
export interface AppRouteHandle {
  nav?: {
    label: string;
  };
}

export type AppRouteObject = RouteObject & {
  handle?: AppRouteHandle;
  children?: AppRouteObject[];
};

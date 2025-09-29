// src/router/Router.tsx
import { Children, cloneElement, isValidElement, useMemo } from 'react';
import { useCurrentPath } from './useCurrentPath';
import type { RouteProps } from './Route';

type RoutesProps = {
  children: React.ReactNode;
};

export const Routes = ({ children }: RoutesProps) => {
  const currentPath = useCurrentPath();

  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(isValidElement);
    return routes.find(
      (route) =>
        isValidElement<RouteProps>(route) &&
        route.props.path === currentPath
    );
  }, [children, currentPath]);

  if (!activeRoute || !isValidElement(activeRoute)) return null;
  return cloneElement(activeRoute);
};

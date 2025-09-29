// src/router/Route.tsx
import type { FC } from 'react';

export type RouteProps = {
  path: string;
  component: FC;
};

export const Route = ({ component: Component }: RouteProps) => {
  return <Component />;
};

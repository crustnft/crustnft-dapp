import React from 'react';
import { RouteObject } from 'react-router';
import { IChildRoute, IRoute } from '../@types/routes';

export function getRouteConfig(
  route: IRoute,
  wrapper?: (Component: React.FunctionComponent | React.ComponentClass) => React.FunctionComponent
): RouteObject {
  const path = route.route;
  const children = route.children?.map((config) => getRouteConfig(config, wrapper));
  if (!(route as IChildRoute).Component) {
    return {
      path,
      children
    };
  }
  return {
    path,
    element: React.createElement(
      (wrapper && wrapper((route as IChildRoute).Component)) || (route as IChildRoute).Component
    ),
    children
  };
}

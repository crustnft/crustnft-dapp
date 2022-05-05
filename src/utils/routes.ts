import React from 'react';
import { RouteObject } from 'react-router';
import { IRoute } from '../@types/routes';

export function getRouteConfig(
  route: IRoute,
  wrapper?: (Component: React.FunctionComponent | React.ComponentClass) => React.FunctionComponent
): RouteObject {
  const { Component } = route;
  return {
    path: route.route,
    element: React.createElement((wrapper && wrapper(Component)) || Component),
    children: route.children?.map((config) => getRouteConfig(config, wrapper))
  };
}

import React from 'react';
export type IRoute = IParentRoute | IChildRoute;
export interface IChildRoute {
  route: string;
  Component: React.FunctionComponent | React.ComponentClass;
  children?: Array<IRoute>;
  exact?: boolean;
}
export interface IParentRoute {
  route: string;
  children: Array<IRoute>;
}

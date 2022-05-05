import React from 'react';

export interface IRoute {
  route: string;
  Component: React.FunctionComponent | React.ComponentClass;
  children?: Array<IRoute>;
  exact?: boolean;
}

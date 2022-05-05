import React from 'react';
const routes = {
  route: 'create-collection',
  Component: React.lazy(() => import('./CreateCollection')),
  exact: true,
  children: [
    {
      route: 'expandable',
      Component: React.lazy(() => import('./ExpandableCollection'))
    }
  ]
};
export default routes;

import React from 'react';
const routes = {
  route: 'create-collection',
  children: [
    { route: '', Component: React.lazy(() => import('./CreateCollection')) },
    {
      route: 'expandable',
      Component: React.lazy(() => import('./ExpandableCollection'))
    },
    {
      route: 'expandable/:tab',
      Component: React.lazy(() => import('./ExpandableCollection'))
    }
  ]
};
export default routes;

import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import MainLayout from '../layouts/main';
import CollectionsExplorer from '../pages/CollectionsExplorer';

const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            top: 0,
            left: 0,
            width: 1,
            zIndex: 9999,
            position: 'fixed'
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

const LoadWithoutSpinner = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<span />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/wallet" replace /> },
        { path: 'wallet', element: <MyNFT /> },
        { path: 'create-collection', element: <CreateCollection /> },
        { path: 'mint-nft/:chain/:contractAddr', element: <MintNft /> },
        { path: 'collection-explore', element: <CollectionsExplorer /> },
        { path: 'collection/:chain/:contractAddr/:pageNb', element: <CollectionViewer /> },
        { path: 'projects-dashboard', element: <CPProjectsDashboard /> },
        { path: 'project-details', element: <CPProjectDetails /> },
        { path: 'project-upload', element: <CPProjectUpload /> },
        {
          path: 'faucets',
          children: [
            { path: '/faucets', element: <FunBox /> },
            { path: '/faucets/crust', element: <CruFaucet /> },
            { path: '/faucets/polygon', element: <MaticFaucet /> }
          ]
        },
        {
          path: 'learn-more',
          element: <LearnMore />
        },
        { path: 'assets/:chain/:contractAddr/:tokenId', element: <AssetViewer /> }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: 'terms-of-service', element: <TermsOfService /> },
        { path: 'disclaimer', element: <Disclaimer /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Dashboard
const Universe = Loadable(lazy(() => import('../pages/Universe')));
const NftManager = Loadable(lazy(() => import('../pages/NftManager')));
const FunBox = Loadable(lazy(() => import('../pages/FunBox')));
const CruFaucet = Loadable(lazy(() => import('../pages/CruFaucet')));
const MaticFaucet = Loadable(lazy(() => import('../pages/MaticFaucet')));
const LearnMore = Loadable(lazy(() => import('../pages/LearnMore')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const TermsOfService = Loadable(lazy(() => import('../pages/TermsOfService')));
const Disclaimer = Loadable(lazy(() => import('../pages/Disclaimer')));
const AssetViewer = LoadWithoutSpinner(lazy(() => import('../pages/AssetViewer')));
const Homepage = LoadWithoutSpinner(lazy(() => import('../pages/Homepage')));
const CreateCollection = LoadWithoutSpinner(lazy(() => import('../pages/CreateCollection')));
const MyNFT = LoadWithoutSpinner(lazy(() => import('../pages/MyNFT')));
const CollectionViewer = LoadWithoutSpinner(lazy(() => import('../pages/CollectionViewer')));
const MintNft = LoadWithoutSpinner(lazy(() => import('../pages/MintNft')));
const CPProjectsDashboard = LoadWithoutSpinner(lazy(() => import('../pages/CPProjectsDashboard')));
const CPProjectDetails = LoadWithoutSpinner(lazy(() => import('../pages/CPProjectDetails')));
const CPProjectUpload = LoadWithoutSpinner(lazy(() => import('../pages/CPProjectUpload')));
// const Universe = lazy(() => import('../pages/Universe'));
// const NftMinting = lazy(() => import('../pages/NftMinting'));
// const NftManager = lazy(() => import('../pages/NftManager'));
// const FunBox = lazy(() => import('../pages/FunBox'));
// const CruFaucet = lazy(() => import('../pages/CruFaucet'));
// const MaticFaucet = lazy(() => import('../pages/MaticFaucet'));
// const LearnMore = lazy(() => import('../pages/LearnMore'));
// const NotFound = lazy(() => import('../pages/Page404'));
// const TermsOfService = lazy(() => import('../pages/TermsOfService'));
// const Disclaimer = lazy(() => import('../pages/Disclaimer'));
// const AssetViewer = lazy(() => import('../pages/AssetViewer'));
// const Homepage from '../pages/Homepage';

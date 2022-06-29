// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '';

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  app: {
    homepage: path(ROOTS_DASHBOARD, '/dashboard'),
    WelcomeBack: path(ROOTS_DASHBOARD, '/my-nft'),
    createCollection: path(ROOTS_DASHBOARD, '/create-collection'),
    collectionExplore: path(ROOTS_DASHBOARD, '/collection-explore')
  },
  createCollection: {
    expandableCollection: path(ROOTS_DASHBOARD, '/create-collection')
  },
  gallery: {
    root: path(ROOTS_DASHBOARD, '/gallery'),
    universe: path(ROOTS_DASHBOARD, '/gallery/universe/1')
  },
  about: {
    learnMore: path(ROOTS_DASHBOARD, '/learn-more')
  },
  funbox: {
    cruFaucet: path(ROOTS_DASHBOARD, '/faucets/crust'),
    maticFaucet: path(ROOTS_DASHBOARD, '/faucets/polygon')
  },
  download: path(ROOTS_DASHBOARD, '/download')
};

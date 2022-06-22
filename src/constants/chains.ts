const PROD_CHAINS = [
  {
    name: 'Ethereum',
    currencySymbol: 'ETH',
    icon: './static/icons/networks/ethereum.svg',
    iconDark: './static/icons/networks/ethereum-dark.svg',
    chainId: 1,
    rpcUrl: 'https://mainnet.infura.io/v3/741c5f1257a24106934fe4105c784478',
    blockExplorerUrl: 'https://etherscan.io'
  },
  {
    name: 'Binance',
    currencySymbol: 'BNB',
    icon: './static/icons/networks/binance.svg',
    iconDark: './static/icons/networks/binance-dark.png',
    chainId: 56,
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    blockExplorerUrl: 'https://bscscan.com'
  },
  {
    name: 'Polygon',
    currencySymbol: 'MATIC',
    icon: './static/icons/networks/polygon.svg',
    iconDark: './static/icons/networks/polygon-dark.png',
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com/',
    blockExplorerUrl: 'https://polygonscan.com'
  }
];

const TEST_CHAINS = [
  {
    name: 'Rinkeby',
    currencySymbol: 'RIN',
    icon: './static/icons/networks/rinkeby.svg',
    iconDark: './static/icons/networks/rinkeby-dark.svg',
    chainId: 4,
    rpcUrl: 'https://rinkeby.infura.io/v3/741c5f1257a24106934fe4105c784478',
    blockExplorerUrl: 'https://rinkeby.etherscan.io'
  },
  {
    name: 'BSC Testnet',
    currencySymbol: 'tBNB',
    icon: './static/icons/networks/binance.svg',
    iconDark: './static/icons/networks/binance-dark.png',
    chainId: 97,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    blockExplorerUrl: 'https://testnet.bscscan.com'
  }
];

const supportedTestnet = process.env.REACT_APP_SUPPORT_TESTNET === 'true';

export const SUPPORTED_CHAINS = supportedTestnet ? [...TEST_CHAINS, ...PROD_CHAINS] : PROD_CHAINS;

export const EMPTY_CHAIN = {
  name: 'Unknown',
  currencySymbol: 'UNK',
  icon: '',
  iconDark: '',
  chainId: 0,
  rpcUrl: '',
  blockExplorerUrl: ''
};

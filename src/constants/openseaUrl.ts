export const openseaAssetUrl = new Map<string, string>([
  ['binance', ''],
  ['polygon', 'https://opensea.io/assets/matic'],
  ['ethereum', 'https://opensea.io/assets'],
  ['klaytn', 'https://opensea.io/assets/klaytn'],
  ['bsc testnet', ''],
  ['rinkeby', 'https://testnets.opensea.io/assets'],
  ['mumbai', 'https://testnets.opensea.io/assets/mumbai']
]);

const OPENSEA_COLLECTION_URL_MAINNET = 'https://opensea.io/collection';
const OPENSEA_COLLECTION_URL_TESTNET = 'https://testnets.opensea.io/collection';

export const openseaCollectionUrl = new Map<string, string>([
  ['polygon', OPENSEA_COLLECTION_URL_MAINNET],
  ['rinkeby', OPENSEA_COLLECTION_URL_TESTNET]
]);

const OPENSEA_API_MAINNET = 'https://api.opensea.io/api/v1';
const OPENSEA_API_TESTNET = 'https://testnets-api.opensea.io/api/v1';
const API_KEY_MAINNET = '6524d46495a2498589928fc59599e8ac';
const API_KEY_TESTNET = ' ';

export interface OpenSeaCollectionAPI {
  apiUrl: string;
  apiKey: string;
}

export const OPENSEA_API = new Map<string, OpenSeaCollectionAPI>([
  [
    'polygon',
    {
      apiUrl: OPENSEA_API_MAINNET,
      apiKey: API_KEY_MAINNET
    }
  ],
  [
    'rinkeby',
    {
      apiUrl: OPENSEA_API_TESTNET,
      apiKey: API_KEY_TESTNET
    }
  ]
]);

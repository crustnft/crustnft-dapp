const OPENSEA_MAINNET_GET_COLLECTION_API_URL = 'https://api.opensea.io/api/v1/collections';
const OPENSEA_TESTNET_GET_COLLECTION_API_URL = 'https://testnets-api.opensea.io/api/v1/collections';

const API_KEY_MAINNET = '6524d46495a2498589928fc59599e8ac';
const API_KEY_TESTNET = ' ';

export interface OpenSeaCollectionAPI {
  apiUrl: string;
  apiKey: string;
}

export const OPENSEA_GET_COLLECTION_API = new Map<string, OpenSeaCollectionAPI>([
  [
    'Polygon',
    {
      apiUrl: OPENSEA_MAINNET_GET_COLLECTION_API_URL,
      apiKey: API_KEY_MAINNET
    }
  ],
  [
    'Rinkeby',
    {
      apiUrl: OPENSEA_TESTNET_GET_COLLECTION_API_URL,
      apiKey: API_KEY_TESTNET
    }
  ]
]);

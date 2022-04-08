import axios, { Method } from 'axios';
import axiosRetry from 'axios-retry';
import { OPENSEA_GET_COLLECTION_API } from 'constants/openseaAPI';

const WAIT_TIME_BASE_BEFORE_RETRY = 1000;
const WAIT_TIME_VARIABLE = 1000;
const NB_RETRY_GET_DATA_FROM_TOKEN_URI = 100;
export const ALLOWED_CHAIN_NAME_FOR_OPENSEA = ['Polygon', 'Rinkeby'];
export const OPENSEA_LINK_NOT_FOUND = 'NotFound';

export const getCollectionUrlOpensea = async (
  network: string,
  assetOwner: string,
  collectionAddress: string
) => {
  if (ALLOWED_CHAIN_NAME_FOR_OPENSEA.indexOf(network) === -1) return;
  if (assetOwner === '') return;
  const NUM_TRIES = 300;
  const instance = axios.create();
  axiosRetry(instance, {
    retryCondition: (error) => {
      return error?.response?.status === 429;
    },
    retries: NB_RETRY_GET_DATA_FROM_TOKEN_URI,
    retryDelay: () => {
      return Math.floor(WAIT_TIME_BASE_BEFORE_RETRY + Math.random() * WAIT_TIME_VARIABLE);
    }
  });
  const apiInfo = OPENSEA_GET_COLLECTION_API.get(network);
  if (!apiInfo) return;
  const { apiUrl, apiKey } = apiInfo;

  const options = {
    method: 'GET' as Method,
    url: apiUrl,
    params: { asset_owner: assetOwner, offset: '0', limit: NUM_TRIES },
    headers: { 'X-API-KEY': apiKey }
  };
  const response = await instance.request(options);

  if (response.status === 200) {
    const responseJson = response.data;
    for (let i = 0; i < NUM_TRIES; i++) {
      if (!responseJson[i]) return OPENSEA_LINK_NOT_FOUND;

      const foundAddress = responseJson[i].primary_asset_contracts[0].address;
      if (collectionAddress.toLowerCase() === foundAddress.toLowerCase()) {
        const slug = responseJson[i].slug;
        return `https://testnets.opensea.io/collection/${slug}`;
      }
    }
  }
  if (response.status === 400) return OPENSEA_LINK_NOT_FOUND;
  throw new Error('Error while fetching data');
};

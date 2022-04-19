import axios, { Method } from 'axios';
import axiosRetry from 'axios-retry';
import { openseaCollectionUrl, OPENSEA_API } from 'constants/openseaUrl';

const WAIT_TIME_BASE_BEFORE_RETRY = 1000;
const WAIT_TIME_VARIABLE = 1000;
const NB_RETRY_GET_DATA_FROM_TOKEN_URI = 100;

export const getCollectionUrlOpensea = async (network: string, collectionAddress: string) => {
  if (!collectionAddress) return;
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

  const apiInfo = OPENSEA_API.get(network.toLowerCase());
  if (!apiInfo) return;
  const { apiUrl, apiKey } = apiInfo;

  console.log('apiUrl', apiUrl);
  const options = {
    method: 'GET' as Method,
    url: apiUrl + '/asset_contract/' + collectionAddress,
    headers: { 'X-API-KEY': apiKey }
  };

  const response = await instance.request(options);

  if (response.status === 200) {
    const responseJson = response.data;
    console.log('responseJson', responseJson);
    const slug = responseJson?.collection?.slug;
    if (slug) {
      return `${openseaCollectionUrl.get(network.toLocaleLowerCase())}/${slug}`;
    }
  }
  return;
};

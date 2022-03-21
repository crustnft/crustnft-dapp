import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';

const WAIT_TIME_BASE_BEFORE_RETRY = 500;
const WAIT_TIME_VARIABLE = 1000;
const NB_RETRY_GET_DATA_FROM_TOKEN_URI = 10;
export const OPENSEA_LINK_NOT_FOUND = 'NotFound';

const retryIfRequestError = (axiosInstance: AxiosInstance, options: any) => {
  const maxTime = options.retry_time || 0;
  if (!maxTime) {
    return axiosInstance;
  }
  let counter = 0;
  axiosInstance.interceptors.response.use((response: { config: any; status: number }) => {
    const config = response.config as AxiosRequestConfig;
    if (counter < maxTime && response?.status !== 429) {
      counter++;
      return new Promise((resolve) => {
        const waitTime = Math.floor(
          WAIT_TIME_BASE_BEFORE_RETRY + Math.random() * WAIT_TIME_VARIABLE
        );
        setTimeout(() => resolve(axiosInstance(config)), waitTime);
      });
    }
    return response;
  });
};

export const getCollectionUrlOpensea = async (assetOwner: string, collectionAddress: string) => {
  if (assetOwner === '') return;
  const NUM_TRIES = 50;
  const instance = axios.create();
  retryIfRequestError(instance, { retry_time: NB_RETRY_GET_DATA_FROM_TOKEN_URI });

  const options = {
    method: 'GET' as Method,
    url: 'https://testnets-api.opensea.io/api/v1/collections',
    params: { asset_owner: assetOwner, offset: '0', limit: NUM_TRIES },
    headers: { 'X-API-KEY': '' }
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

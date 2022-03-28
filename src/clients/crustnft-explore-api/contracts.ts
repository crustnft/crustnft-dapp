import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { EXPLORE_API } from 'constants/crustNftExploreApis';
import type { CreateContractDto } from './types';

const retryWrapper = (axios: AxiosInstance, options: any) => {
  const maxTime = options.retry_time || 0;
  if (!maxTime) {
    return axios;
  }
  let counter = 0;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const config = error.config as AxiosRequestConfig;
      console.log('Error in retryWrapper', error.response);
      if (counter < maxTime) {
        counter++;
        return new Promise((resolve) => {
          const waitTime = Math.floor(5000 + Math.random() * 1000);
          setTimeout(() => resolve(axios(config)), waitTime);
        });
      }
      return Promise.reject(error);
    }
  );
};

export async function createContract(accessToken: string, createContractObj: CreateContractDto) {
  const instance = axios.create();
  retryWrapper(instance, { retry_time: 15 });
  return instance.post(EXPLORE_API + '/contracts', createContractObj, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
}

export async function getListingContracts(pageSize: number, orderBy = 'createdAt desc') {
  const instance = axios.create();
  retryWrapper(instance, { retry_time: 5 });
  return instance.get(`${EXPLORE_API}/contracts/listing?pageSize=${pageSize}&order=${orderBy}`); // or asc
}

export async function getContractsByAccount(
  accessToken: string,
  pageSize: number,
  account: string,
  orderBy = 'createdAt desc'
) {
  const instance = axios.create();
  retryWrapper(instance, { retry_time: 5 });
  return instance.get(
    `${EXPLORE_API}/contracts?pageSize=${pageSize}&creator=${account}&order=${orderBy}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );
}

export async function getContractByTxHash(txHash: string) {
  const instance = axios.create();
  retryWrapper(instance, { retry_time: 5 });
  const response = await instance.get(`${EXPLORE_API}/contracts/${txHash}`).catch((err) => {
    console.log('get collections error', err.response);
    return;
  });
  if (!response?.data?.data) return;
  return response.data.data;
}

export async function publishCollection(accessToken: string, txHash: string, published: boolean) {
  const instance = axios.create();
  retryWrapper(instance, { retry_time: 5 });
  const response = await instance
    .put(
      `${EXPLORE_API}/contracts`,
      { id: txHash, published },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    .catch((err) => {
      console.log('Publish collection error', err.response);
      return;
    });
  if (!response?.data?.data) return;
  return response.data.data;
}

export async function getCollectionPublishStatus(accessToken: string, txHash: string) {
  const instance = axios.create();
  retryWrapper(instance, { retry_time: 5 });
  const response = await instance
    .get(`${EXPLORE_API}/contracts/${txHash}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .catch((err) => {
      console.log('Get publish status error', err.response);
      return;
    });

  if (response?.data?.data?.published) return true;

  return false;
}

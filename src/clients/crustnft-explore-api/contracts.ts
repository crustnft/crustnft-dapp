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

export async function getContracts(pageSize: number) {
  const instance = axios.create();
  retryWrapper(instance, { retry_time: 5 });
  return instance.get(`${EXPLORE_API}/contracts?pageSize=${pageSize}&order=createdAt desc`); // or asc
}

export async function getContractsByAccount(pageSize: number, account: string) {
  const instance = axios.create();
  retryWrapper(instance, { retry_time: 5 });
  return instance.get(
    `${EXPLORE_API}/contracts?pageSize=${pageSize}&creator=${account}&order=createdAt desc`
  ); // or asc
}

import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CONTRACT_API_V1 } from 'configs/crustnft-explore-api';
import type { PostContractObj } from './types';

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

export async function postContract(postContractObj: PostContractObj) {
  const instance = Axios.create();
  retryWrapper(instance, { retry_time: 5 });
  return instance.post(CONTRACT_API_V1, postContractObj);
}

export async function getContracts(pageSize: number) {
  const instance = Axios.create();
  retryWrapper(instance, { retry_time: 5 });
  return instance.get(`${CONTRACT_API_V1}?pageSize=${pageSize}&order=createdAt desc`); // or asc
}

export async function getContractsByAccount(pageSize: number, account: string) {
  const instance = Axios.create();
  retryWrapper(instance, { retry_time: 5 });
  return instance.get(`${CONTRACT_API_V1}?pageSize=${pageSize}&account=${account}`); // or asc
}

import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { EtherScanResponse, VerifyContractRequest } from './types';

const NOT_OK_STATUS = '0';

const retryWrapper = (axios: AxiosInstance, options: any) => {
  const maxTime = options.retry_time || 0;
  if (!maxTime) {
    return axios;
  }
  let counter = 0;
  axios.interceptors.response.use((response) => {
    const config = response.config as AxiosRequestConfig;
    console.log('Response: ', response);
    if (counter < maxTime && response?.data?.status === NOT_OK_STATUS) {
      counter++;
      return new Promise((resolve) => {
        const waitTime = Math.floor(5000 + Math.random() * 1000);
        setTimeout(() => resolve(axios(config)), waitTime);
      });
    }
    return response;
  });
};

const statusVerificationRetryWrapper = (axios: AxiosInstance, options: any) => {
  const maxTime = options.retry_time || 0;
  if (!maxTime) {
    return axios;
  }
  let counter = 0;
  axios.interceptors.response.use((response) => {
    const config = response.config as AxiosRequestConfig;
    console.log('Response: ', response);
    if (
      counter < maxTime &&
      response?.data?.status === NOT_OK_STATUS &&
      response?.data?.result !== 'Already Verified'
    ) {
      counter++;
      return new Promise((resolve) => {
        const waitTime = Math.floor(5000 + Math.random() * 1000);
        setTimeout(() => resolve(axios(config)), waitTime);
      });
    }
    return response;
  });
};

const API_ENDPOINTS: Record<string, string> = {
  '1': 'https://api.etherscan.io/api',
  '3': 'https://api-ropsten.etherscan.io/api',
  '4': 'https://api-rinkeby.etherscan.io/api',
  '5': 'https://api-goerli.etherscan.io/api',
  '42': 'https://api-kovan.etherscan.io/api',
  '56': 'https://api.bscscan.com/api',
  '97': 'https://api-testnet.bscscan.com/api',
  '137': 'https://api.polygonscan.com/api'
};

export async function verifyAndPublicContractSourceCode(
  apiKey: string,
  chainId: string,
  requestBody: VerifyContractRequest
) {
  const bodyFormData = new FormData();
  bodyFormData.append('apiKey', apiKey);
  bodyFormData.append('module', 'contract');
  bodyFormData.append('action', 'verifysourcecode');
  bodyFormData.append('contractaddress', requestBody.address);
  bodyFormData.append('sourceCode', requestBody.sourceCode);
  bodyFormData.append('codeformat', 'solidity-standard-json-input');
  bodyFormData.append('contractname', requestBody.name);
  bodyFormData.append('compilerversion', requestBody.compilerversion);
  bodyFormData.append('optimizationUsed', '0');
  bodyFormData.append('runs', '200');
  bodyFormData.append('licenseType', requestBody.licenseType);
  if (requestBody.constructorArguments) {
    bodyFormData.append('constructorArguements', requestBody.constructorArguments);
  }

  const instance = Axios.create();
  retryWrapper(instance, { retry_time: 500 });
  return instance.post<any, EtherScanResponse>(API_ENDPOINTS[chainId], bodyFormData);
}

export async function codeVerificationStatus(apiKey: string, chainId: string, txHash: string) {
  const bodyFormData = new FormData();
  bodyFormData.append('apiKey', apiKey);
  bodyFormData.append('guid', txHash);
  bodyFormData.append('module', 'contract');
  bodyFormData.append('action', 'checkverifystatus');

  const instance = Axios.create();
  statusVerificationRetryWrapper(instance, { retry_time: 500 });
  return instance.post<any, EtherScanResponse>(API_ENDPOINTS[chainId], bodyFormData);
}

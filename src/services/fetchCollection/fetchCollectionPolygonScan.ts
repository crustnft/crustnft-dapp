import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_POLYGONSCAN_URL } from 'constants/explorerApis';
import { NB_RETRY_GET_DATA_FROM_API } from 'constants/httpConfig';
import { INFTCollection } from 'interfaces/collection';

const WAIT_TIME_BASE_BEFORE_RETRY = 2000;
const WAIT_TIME_VARIABLE = 1000;

const addNewCollection = (contractAddress: string, finalResult: Array<INFTCollection>) => {
  let newCollection: INFTCollection = {
    contractAddress: contractAddress,
    tokenIn: [],
    tokenOut: []
  };
  finalResult.push(newCollection);
};

const fillCollection = (
  collection: INFTCollection,
  tokenId: string,
  from: string,
  to: string,
  walletaddress: string
) => {
  if (to === walletaddress.toLowerCase() && !collection.tokenOut.includes(tokenId)) {
    collection.tokenIn.push(tokenId);
  } else if (from === walletaddress.toLowerCase() && !collection.tokenIn.includes(tokenId)) {
    collection.tokenOut.push(tokenId);
  }
};

const retryIfRequestError = (axiosInstance: AxiosInstance, options: any) => {
  const maxTime = options.retry_time || 0;
  if (!maxTime) {
    return axiosInstance;
  }
  let counter = 0;
  axiosInstance.interceptors.response.use((response) => {
    const config = response.config as AxiosRequestConfig;
    if (counter < maxTime && response?.status !== 200 && response.data?.status !== '1') {
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

export async function getERC271CollectionByAddress(walletaddress: string) {
  const instance = axios.create();
  retryIfRequestError(instance, { retry_time: NB_RETRY_GET_DATA_FROM_API });
  let finalResult: Array<INFTCollection> = [];
  let params = {
    params: {
      module: 'account',
      action: 'tokennfttx',
      address: walletaddress,
      sort: 'desc'
    }
  };

  await instance
    .get(API_POLYGONSCAN_URL, params)
    .then((returnData: any) => {
      const listTransaction = returnData.data.result;
      for (let i = 0; i < listTransaction.length; i++) {
        let tokenId = listTransaction[i].tokenID;
        let from = listTransaction[i].from;
        let to = listTransaction[i].to.toLowerCase();
        let contractAddress = listTransaction[i].contractAddress;
        let contractAddressIndex = -1;
        if (finalResult.length === 0) {
          addNewCollection(contractAddress, finalResult);
          contractAddressIndex = 0;
        } else {
          let i = 0;
          let index = -1;
          for (i; i < finalResult.length; i++) {
            if (finalResult[i].contractAddress === contractAddress) {
              index = i;
              break;
            }
          }
          if (index === -1) {
            addNewCollection(contractAddress, finalResult);
            contractAddressIndex = i;
          } else {
            contractAddressIndex = index;
          }
        }
        fillCollection(finalResult[contractAddressIndex], tokenId, from, to, walletaddress);
      }
    })
    .catch((error: any) => {
      //TODO check what if error
      console.log(error);
    });
  return finalResult;
}

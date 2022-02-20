import * as etherscanClient from '../../../clients/etherscan-client';
import { EXPLORER_API_SECRET_KEY } from './constants';

export const getPublishingStatus = async (etherscanPublishingHx: string, chainId: number) => {
  try {
    const verifyStatusResponse = await etherscanClient.codeVerificationStatus(
      EXPLORER_API_SECRET_KEY[chainId],
      chainId + '',
      etherscanPublishingHx
    );
    if (
      verifyStatusResponse.data.status === '1' ||
      verifyStatusResponse.data.result === 'Already Verified'
    ) {
      console.log('success verifying');
    } else {
      console.log('error verifying');
      return;
    }
    console.log('verifyStatusResponse : ', verifyStatusResponse.data);
    return verifyStatusResponse.data;
  } catch (e) {
    console.log('Error on verifying', e);
  }
};

import { TransactionReceipt } from '@ethersproject/providers';
import { CompilerAbstract } from '@remix-project/remix-solidity';
import * as etherscanClient from '../../../clients/etherscan-client';
import {
  SOLIDITY_COMPILER_VERSION,
  SPDX_LICENSE_IDENTIFIER
} from '../../../constants/solcEnvironments';
import { CONTRACT_FILE_NAME, CONTRACT_NAME, EXPLORER_API_SECRET_KEY } from './constants';

export const publishSmartContract = async (
  chainId: number,
  txReceipt?: TransactionReceipt,
  compileResult?: CompilerAbstract
): Promise<string | undefined> => {
  try {
    const verifiedResponse = await etherscanClient.verifyAndPublicContractSourceCode(
      EXPLORER_API_SECRET_KEY[chainId],
      chainId + '',
      {
        address: txReceipt?.contractAddress || '',
        name: CONTRACT_FILE_NAME + ':' + CONTRACT_NAME,
        sourceCode: JSON.stringify({
          sources: compileResult?.source.sources,
          language: 'Solidity'
        }),
        compilerversion: 'v' + SOLIDITY_COMPILER_VERSION,
        licenseType: SPDX_LICENSE_IDENTIFIER.MIT
      }
    );
    console.log('verifiedResponse: ', verifiedResponse.data);
    if (verifiedResponse.data.status === '0') {
      console.log('error publishing');
      return;
    }
    if (verifiedResponse.data.status === '1') {
      console.log('success publishing', verifiedResponse.data.result);
    }
    // return etherscan publishing hash
    return (verifiedResponse.data as any).result;
  } catch (e: any) {
    console.log('Error on publishing', e);
    console.log(e.response || '');
  }
};

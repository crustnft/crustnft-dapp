import { TransactionReceipt } from '@ethersproject/providers';
import { CompilerAbstract } from '@remix-project/remix-solidity';
import { EXPLORER_API_SECRET_KEY } from 'constants/explorerApis';
import * as etherscanClient from '../../../clients/etherscan-client';
import {
  SOLIDITY_COMPILER_VERSION,
  SPDX_LICENSE_IDENTIFIER
} from '../../../constants/solcEnvironments';

export const publishSmartContract = async (
  chainId: number,
  contractName: string,
  txReceipt?: TransactionReceipt,
  compileResult?: CompilerAbstract,
  constructorArguments?: string
): Promise<string | undefined> => {
  try {
    const verifiedResponse = await etherscanClient.verifyAndPublicContractSourceCode(
      EXPLORER_API_SECRET_KEY[chainId],
      chainId + '',
      {
        address: txReceipt?.contractAddress || '',
        name: contractName + '.sol:' + contractName,
        sourceCode: JSON.stringify({
          sources: compileResult?.source.sources,
          language: 'Solidity'
        }),
        compilerversion: 'v' + SOLIDITY_COMPILER_VERSION,
        licenseType: SPDX_LICENSE_IDENTIFIER.MIT,
        constructorArguments: constructorArguments
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

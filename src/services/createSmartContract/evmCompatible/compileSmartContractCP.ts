import { baseURLBin, compile, CompilerAbstract, pathToURL } from '@remix-project/remix-solidity';
import { SOLIDITY_COMPILER_VERSION } from '../../../constants/solcEnvironments';
import { handleNpmImport } from '../../../utils/content-resolver';
import { CONTRACT_FILE_NAME } from './constants';
import { YourNftToken } from './YourNftToken';

(function initSupportedSolcVersion() {
  (pathToURL as any)['soljson-v0.8.11+commit.d7f03943.js'] = baseURLBin;
})();

export const compileSmartContractCP = async (): Promise<CompilerAbstract | undefined> => {
  try {
    const response = (await compile(
      {
        [CONTRACT_FILE_NAME]: {
          content: YourNftToken
        }
      },
      {
        version: SOLIDITY_COMPILER_VERSION
      },
      handleNpmImport
    )) as CompilerAbstract;
    if (response.data.errors) {
      console.log('error');
      return;
    }
    return response;
  } catch (e) {
    console.log('Error compiling contract: ', e);
  }
};

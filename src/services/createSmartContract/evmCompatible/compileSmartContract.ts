import { baseURLBin, compile, CompilerAbstract, pathToURL } from '@remix-project/remix-solidity';
import { SOLIDITY_COMPILER_VERSION } from '../../../constants/solcEnvironments';
import { handleNpmImport } from '../../../utils/content-resolver';

(function initSupportedSolcVersion() {
  (pathToURL as any)[`soljson-v${SOLIDITY_COMPILER_VERSION}.js`] = baseURLBin;
})();

export const compileSmartContract = async (
  source: string,
  fileName: string
): Promise<CompilerAbstract | undefined> => {
  try {
    const response = (await compile(
      {
        [fileName]: {
          content: source
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

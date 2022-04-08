import { JsonRpcSigner } from '@ethersproject/providers';
import { CompilerAbstract } from '@remix-project/remix-solidity';
import { ContractFactory } from 'ethers';

export async function* deploySmartContract(
  compileResult: CompilerAbstract,
  contractName: string,
  signer: JsonRpcSigner,
  ...args: any[]
): AsyncGenerator<any, any, any> {
  try {
    const compiledContract = compileResult?.getContract(contractName);
    const contractBinary = '0x' + compiledContract?.object.evm.bytecode.object;
    const contractABI = compiledContract?.object.abi;
    const contractFactory: ContractFactory = new ContractFactory(
      contractABI,
      contractBinary,
      signer
    );
    const deployingContract = await contractFactory.deploy(...args);
    yield deployingContract.deployTransaction;
    const txReceipt = await deployingContract.deployTransaction.wait(1);
    console.log('TransactionReceipt: ', txReceipt);
    return txReceipt;
  } catch (e: any) {
    if (e.reason === 'repriced') {
      return e.receipt;
    } else {
      console.log('Error deploying', e);
    }
  }
}

import { JsonRpcSigner, TransactionReceipt } from '@ethersproject/providers';
import { CompilerAbstract } from '@remix-project/remix-solidity';
import { ContractFactory } from 'ethers';
import { CONTRACT_NAME } from './constants';

export async function deploySmartContract(
  compileResult: CompilerAbstract,
  signer: JsonRpcSigner
): Promise<TransactionReceipt | undefined> {
  try {
    const compiledContract = compileResult?.getContract(CONTRACT_NAME);
    const contractBinary = '0x' + compiledContract?.object.evm.bytecode.object;
    const contractABI = compiledContract?.object.abi;
    const contractFactory: ContractFactory = new ContractFactory(
      contractABI,
      contractBinary,
      signer
    );
    const deployingContract = await contractFactory.deploy();
    const txReceipt = await deployingContract.deployTransaction.wait(1);
    console.log('TransactionReceipt: ', txReceipt);
    return txReceipt;
  } catch (e) {
    if (e.reason === 'repriced') {
      return e.receipt;
    } else {
      throw e;
    }
  }
}

import { ethers, Contract } from 'ethers';

const connectEVMContract = (
  contractAddress: string,
  ABI: ethers.ContractInterface,
  providerRpc: string
): Contract => {
  const provider = new ethers.providers.JsonRpcProvider(providerRpc);
  const contract = new ethers.Contract(contractAddress, ABI, provider);
  return contract;
};

export default connectEVMContract;

import { ethers } from 'ethers';
export async function encodeArguments(abi: any, constructorArguments: any[]) {
  const { Interface } = await import('@ethersproject/abi');
  const contractInterface = new Interface(abi);
  let deployArgumentsEncoded;
  try {
    deployArgumentsEncoded = contractInterface.encodeDeploy(constructorArguments).replace('0x', '');
  } catch (error) {
    console.log(error);
  }

  return deployArgumentsEncoded;
}

export const getConstructorArgumentABI = (argumentTypes: any[], argumentValues: any[]): string => {
  return ethers.utils.defaultAbiCoder.encode(argumentTypes, argumentValues).replace('0x', '');
};

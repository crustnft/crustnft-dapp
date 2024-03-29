import { Contract, ethers, Signer } from 'ethers';
import asyncWithCache from '../../utils/asyncWithCache';

export function connectContract(
  contractAddress: string,
  ABI: ethers.ContractInterface,
  providerRpc: string
): Contract {
  const provider = new ethers.providers.JsonRpcProvider(providerRpc);
  const contract = new ethers.Contract(contractAddress, ABI, provider);
  return contract;
}

export function connectRWContract(
  contractAddress: string,
  ABI: ethers.ContractInterface,
  signer: Signer
): Contract {
  const contract = new ethers.Contract(contractAddress, ABI, signer);
  return contract;
}

// Total supply is changed frequently so no need to cache
export async function getTotalSupply(contract: Contract): Promise<number> {
  const NftBalance = await contract.totalSupply();
  return NftBalance.toNumber();
}

export async function getTokenURI(contract: Contract, tokenId: number): Promise<string> {
  return asyncWithCache(
    contract.tokenURI.bind(null, tokenId),
    contract.address + '-getTokenURI-' + tokenId
  );
}

export async function getOwner(contract: Contract, tokenId: number): Promise<string> {
  return asyncWithCache(
    contract.ownerOf.bind(null, tokenId),
    contract.address + '-ownerOf-' + tokenId
  );
}

export async function getName(contract: Contract): Promise<string> {
  return asyncWithCache(contract.name, contract.address + '-getName');
}

export async function getSymbol(contract: Contract): Promise<string> {
  return asyncWithCache(contract.symbol, contract.address + '-getSymbol');
}

export async function getContractOwner(contract: Contract): Promise<string> {
  return asyncWithCache(contract.owner, contract.address + '-getContractOwner');
}

/** ------------------------------------------------------ */

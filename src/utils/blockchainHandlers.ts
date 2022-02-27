import { SUPPORTED_CHAINS } from 'constants/chains';
import { Chain } from 'interfaces/chain';

export function getRpcUrlByNetworkName(chain: string): string {
  const chainObj = SUPPORTED_CHAINS.find((c) => c.name.toLowerCase() === chain.toLowerCase());
  return chainObj?.rpcUrl || '';
}

export function getRpcUrlByChainId(chainId: number): string {
  const chainObj = SUPPORTED_CHAINS.find((c) => c.chainId === chainId);
  return chainObj?.rpcUrl || '';
}

export function getChainByChainId(chainId: number): Chain | undefined {
  return SUPPORTED_CHAINS.find((c) => c.chainId === chainId);
}

export function getChainNameByChainId(chainId: number): string {
  const chainObj = getChainByChainId(chainId);
  return chainObj?.name || '';
}

import { IPFS_GATEWAY } from 'constants/ipfsGateways';

export function getUrlFromCid(cid: string): string {
  return `${IPFS_GATEWAY}/ipfs/${cid}`;
}

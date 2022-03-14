import { Contract } from 'ethers';
import { getDataFromTokenUri } from 'services/http';
import { getOwner, getTokenURI } from 'services/smartContract/evmCompatible';
import { getChainNameByChainId } from 'utils/blockchainHandlers';
import { parseNftUri } from 'utils/tokenUriHandlers';

export type NftItem = {
  key: string;
  failToLoad: boolean;
  tokenId: string;
  tokenURI?: string;
  imageUrl: string;
  name: string;
  owner?: string;
  chainName: string;
  contractAddr: string;
};

export const getNftList4CollectionCard = async (
  contract: Contract,
  chainId: number,
  totalSupply: number,
  numNFT2Load: number
) => {
  const numLoadableNFT = numNFT2Load < totalSupply ? numNFT2Load : totalSupply;
  const tokenIds = Array.from(Array(numNFT2Load).keys()).map((x) => x + 1);
  const emptyNftList = new Array(numNFT2Load).fill(null).map((_, index) => ({
    key: index.toString(),
    failToLoad: false,
    tokenId: '',
    tokenURI: '',
    imageUrl: '',
    name: '',
    owner: '',
    chainName: '',
    contractAddr: ''
  }));

  let nftList = [...emptyNftList.slice(0)];

  for (let i = 0; i < numLoadableNFT; i++) {
    const tokenId = i + 1;
    const tokenUri = await getTokenURI(contract, tokenId).catch((e: any) => {
      nftList[i] = { ...nftList[i], failToLoad: true };
    });
    if (!tokenUri) return;
    const parsedTokenUri = parseNftUri(tokenUri);
    const data = await getDataFromTokenUri(parsedTokenUri);
    const owner = await getOwner(contract, tokenId);
    const parsedImageUrl = parseNftUri(data.image || '');
    nftList[i] = {
      key: contract.address.slice(-4, -1) + tokenId,
      failToLoad: false,
      tokenId: tokenId.toString(),
      tokenURI: tokenUri,
      imageUrl: parsedImageUrl,
      name: data.name || '',
      owner,
      chainName: getChainNameByChainId(chainId),
      contractAddr: contract.address
    };
  }
  return nftList;
};

import { Contract } from 'ethers';
import { getDataFromTokenUri } from 'services/http';
import { getOwner, getTokenURI } from 'services/smartContract/evmCompatible';
import { getChainNameByChainId } from 'utils/blockchainHandlers';
import { parseNftUri } from 'utils/tokenUriHandlers';
import { createEmptyNFTList } from './createEmptyNFTList';

export const getNftList4CollectionCard = async (
  contract: Contract,
  chainId: number,
  totalSupply: number,
  startIndex: number,
  stopIndex: number
) => {
  const numLoadableNFT = stopIndex < totalSupply ? stopIndex : totalSupply;
  if (numLoadableNFT <= 0 || numLoadableNFT <= startIndex) return;
  const emptyNftList = createEmptyNFTList(numLoadableNFT - startIndex);

  let nftList = [...emptyNftList.slice(0)];

  for (let i = 0; i < numLoadableNFT - startIndex; i++) {
    const tokenId = i + 1 + startIndex;
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

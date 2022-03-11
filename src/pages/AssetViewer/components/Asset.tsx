// material
import { Box, Grid, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { SIMPLIFIED_ERC721_ABI } from 'constants/simplifiedERC721ABI';
import { Contract } from 'ethers';
import NftCard from 'pages/MyNFT/components/NftCard';
import { useEffect, useState } from 'react';
import { getDataFromTokenUri } from 'services/http';
import {
  connectContract,
  getOwner,
  getTokenURI,
  getTotalSupply
} from 'services/smartContract/evmCompatible';
import {
  getChainByNetworkName,
  getChainNameByChainId,
  getRpcUrlByChainId
} from 'utils/blockchainHandlers';
import { parseNftUri } from 'utils/tokenUriHandlers';
// import ProfileSocialInfo from './ProfileSocialInfo';
import { AssetAndOwnerType } from '../AssetViewer.types';
import AssetAttributes from './AssetAttributes';
import AssetCard from './AssetCard';
//
import AssetDetails from './AssetDetails';

export default function Asset({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const NB_OF_NFT_PER_PAGE = 5;
  const emptyNftList = new Array(NB_OF_NFT_PER_PAGE).fill(null).map((_, index) => ({
    key: index.toString(),
    failToLoad: false,
    tokenId: '',
    imageUrl: '',
    name: '',
    nftContract: '',
    owner: '',
    chainName: '',
    contractAddr: ''
  }));

  type NftItem = {
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
  const theme = useTheme();
  const [chainID, setChainID] = useState(-1);
  const [totalSupply, setTotalSupply] = useState(0);
  const [nbFailedNft, setFailedNft] = useState(0);
  const [NftList, setNftList] = useState<NftItem[]>(emptyNftList);
  const [nbEmptyCarouselItems, setNbEmptyCarouselItems] = useState(0);
  const [nbOfFrames, setNbOfFrames] = useState(4);

  useEffect(() => {
    async function getNftList(contract: Contract, chainID: number) {
      const _totalSupply = await getTotalSupply(contract).catch((e) => {
        console.log(e);
      });
      setTotalSupply(_totalSupply || 0);
      const nbOfNftPerCarousel =
        _totalSupply < NB_OF_NFT_PER_PAGE ? (_totalSupply as number) : NB_OF_NFT_PER_PAGE;
      setNftList((prevList) => [...emptyNftList.slice(0, nbOfNftPerCarousel || 0)]);

      let offset = 1;
      for (let i = 0; i < nbOfNftPerCarousel; i++) {
        const tokenId = i + offset;
        if (tokenId.toString() !== assetAndOwner.tokenId) {
          getTokenURI(contract, tokenId)
            .then(async (tokenUri) => {
              const parsedTokenUri = parseNftUri(tokenUri);
              const data = await getDataFromTokenUri(parsedTokenUri);
              const owner = await getOwner(contract, tokenId);
              const parsedImageUrl = parseNftUri(data.image || '');
              console.log('name', getChainNameByChainId(chainID));
              setNftList((prevList) => {
                prevList[i] = {
                  key: assetAndOwner.contractAddress.slice(-4, -1) + tokenId,
                  failToLoad: false,
                  tokenId: tokenId.toString(),
                  tokenURI: tokenUri,
                  imageUrl: parsedImageUrl,
                  name: data.name || '',
                  owner,
                  chainName: getChainNameByChainId(chainID),
                  contractAddr: assetAndOwner.contractAddress
                };
                return [...prevList];
              });
            })
            .catch((e) => {
              setNftList((prevList) => {
                prevList[i] = { ...prevList[i], failToLoad: true };
                return [...prevList];
              });
              setFailedNft((prevNb) => prevNb + 1);
              console.log(`Error token ${tokenId}: `, e);
            });
        } else {
          i--;
          offset++;
        }
      }
      setNftList((prevList) => {
        let currentList = JSON.parse(JSON.stringify(prevList));
        currentList.splice(parseInt(assetAndOwner.tokenId) - 1, 1);
        return [...currentList];
      });
    }
    if (assetAndOwner.chain) {
      const _chainID = getChainByNetworkName(assetAndOwner.chain)?.chainId as number;
      const _contract = connectContract(
        assetAndOwner.contractAddress || '',
        SIMPLIFIED_ERC721_ABI,
        getRpcUrlByChainId(_chainID)
      );
      setChainID(_chainID);
      getNftList(_contract, _chainID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetAndOwner]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Stack spacing={5}>
          <AssetCard assetAndOwner={assetAndOwner} />
          <AssetDetails assetAndOwner={assetAndOwner} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={7}>
        <Stack spacing={3}>
          <AssetAttributes assetAndOwner={assetAndOwner} />
        </Stack>
      </Grid>

      {chainID !== -1 ? (
        <Grid item xs={12}>
          <Stack direction="column">
            <Stack>
              <Typography variant="h3">More from this collection</Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              {NftList.filter((nft) => !nft.failToLoad).map((nft) => (
                <Box key={nft.key} sx={{ width: '20%' }}>
                  <NftCard {...nft} />
                </Box>
              ))}
            </Stack>
          </Stack>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
}

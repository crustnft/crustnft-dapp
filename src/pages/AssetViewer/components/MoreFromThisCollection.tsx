import { Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
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
import { AssetAndOwnerType } from '../AssetViewer.types';

function MoreFromThisCollection({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const theme = useTheme();
  const upperMd = useMediaQuery(theme.breakpoints.up('md'));
  const NB_OF_NFT_PER_ROW = upperMd ? 6 : 3;
  const [maxDisplayRows, setMaxDisplayRows] = useState(0);
  const [displayedRows, setDisplayedRows] = useState(1);

  const emptyNftList = new Array(NB_OF_NFT_PER_ROW).fill(null).map((_, index) => ({
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
  const [NftList, setNftList] = useState<NftItem[]>(emptyNftList);
  const [totalSupply, setTotalSupply] = useState(0);

  const handleSeeMore = () => {
    setDisplayedRows((prev: number) => {
      return prev + 1;
    });
  };

  useEffect(() => {
    async function getNftList(contract: Contract, chainId: number) {
      const totalSupply =
        (await getTotalSupply(contract).catch((e) => {
          console.log(e);
        })) || 0;
      setTotalSupply(totalSupply);
      setMaxDisplayRows(Math.ceil((totalSupply - 1) / NB_OF_NFT_PER_ROW));
      const tokenIds = Array.from(Array(totalSupply).keys()).map((x) => x + 1);
      tokenIds.splice(parseInt(assetAndOwner.tokenId) - 1, 1);

      const nbOfNftDisplayed =
        tokenIds.length < NB_OF_NFT_PER_ROW * displayedRows
          ? tokenIds.length
          : NB_OF_NFT_PER_ROW * displayedRows;
      if (displayedRows === 1) {
        setNftList([...emptyNftList.slice(0, nbOfNftDisplayed || 0)]);
      } else {
        setNftList((prev) => {
          return [...prev, ...emptyNftList.slice(0, nbOfNftDisplayed - prev.length || 0)];
        });
      }

      tokenIds.forEach(function (tokenId, i) {
        if (i < nbOfNftDisplayed && i >= nbOfNftDisplayed - NB_OF_NFT_PER_ROW) {
          getTokenURI(contract, tokenId)
            .then(async (tokenUri) => {
              const parsedTokenUri = parseNftUri(tokenUri);
              const data = await getDataFromTokenUri(parsedTokenUri);
              const owner = await getOwner(contract, tokenId);
              const parsedImageUrl = parseNftUri(data.image || '');
              setNftList((prevList) => {
                prevList[i] = {
                  key: assetAndOwner.contractAddress.slice(-4, -1) + tokenId,
                  failToLoad: false,
                  tokenId: tokenId.toString(),
                  tokenURI: tokenUri,
                  imageUrl: parsedImageUrl,
                  name: data.name || '',
                  owner,
                  chainName: getChainNameByChainId(chainId),
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

              console.log(`Error token ${tokenId}: `, e);
            });
        }
      });
    }
    if (assetAndOwner.chain) {
      const { chainId } = getChainByNetworkName(assetAndOwner.chain) || { chainId: -1 };
      const contract = connectContract(
        assetAndOwner.contractAddress || '',
        SIMPLIFIED_ERC721_ABI,
        getRpcUrlByChainId(chainId)
      );
      getNftList(contract, chainId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetAndOwner, displayedRows]);

  return (
    <Stack direction="column">
      {totalSupply > 1 ? (
        <>
          <Stack>
            <Typography variant="h3">More from this collection</Typography>
          </Stack>

          <Grid container xs={12}>
            {NftList.filter((nft) => {
              return nft && !nft.failToLoad; //&& nft.tokenId !== '';
            }).map((nft) => (
              <Grid item xs={4} md={2} key={nft.key}>
                <Box>
                  <NftCard {...nft} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <></>
      )}
      {displayedRows < maxDisplayRows ? (
        <Button onClick={handleSeeMore}>
          <Typography variant="h4">More...</Typography>
        </Button>
      ) : (
        <></>
      )}
    </Stack>
  );
}

export default MoreFromThisCollection;

import { Icon } from '@iconify/react';
import { Box, Button, Grid, Link, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { SIMPLIFIED_ERC721_ABI } from 'constants/simplifiedERC721ABI';
import { Contract } from 'ethers';
import { useEffect, useState } from 'react';
import { createEmptyNFTList, NftItem } from 'services/fetchCollection/createEmptyNFTList';
import { getDataFromTokenUri } from 'services/http';
import {
  connectContract,
  getOwner,
  getTokenURI,
  getTotalSupply
} from 'services/smartContract/evmCompatible';
import { getChainByNetworkName, getChainNameByChainId } from 'utils/blockchainHandlers';
import { parseNftUri } from 'utils/tokenUriHandlers';
import { AssetAndOwnerType } from '../AssetViewer.types';
import NftCard from './NftCard';

function MoreFromThisCollection({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const theme = useTheme();
  const upperMd = useMediaQuery(theme.breakpoints.up('md'));
  const NB_OF_NFT_PER_ROW = upperMd ? 6 : 3;
  const [maxDisplayRows, setMaxDisplayRows] = useState(0);
  const [displayedRows, setDisplayedRows] = useState(1);
  const [nbOfNftDisplayed, setNbOfNftDisplayed] = useState(0);
  const [chainId, setChainId] = useState(-1);
  const [contract, setContract] = useState<Contract>();
  const [contractLoading, setContractLoading] = useState(true);

  const emptyNftList = createEmptyNFTList(NB_OF_NFT_PER_ROW);

  const [NftList, setNftList] = useState<NftItem[]>(emptyNftList);
  const [totalSupply, setTotalSupply] = useState(0);

  const handleSeeMore = () => {
    setDisplayedRows((prev: number) => {
      return prev + 1;
    });
  };

  const getNftList = async (contract: Contract, chainId: number) => {
    const totalSupply =
      (await getTotalSupply(contract).catch((e) => {
        console.log(e);
      })) || 0;
    setTotalSupply(totalSupply);
    setMaxDisplayRows(Math.ceil((totalSupply - 1) / NB_OF_NFT_PER_ROW));
    const tokenIds = Array.from(Array(totalSupply).keys()).map((x) => x + 1);
    const _displayedRows = Math.ceil(displayedRows);
    setDisplayedRows(_displayedRows);

    const nbOfNftDisplayed =
      tokenIds.length < NB_OF_NFT_PER_ROW * _displayedRows
        ? tokenIds.length
        : parseInt(assetAndOwner.tokenId) <= NB_OF_NFT_PER_ROW * _displayedRows
        ? NB_OF_NFT_PER_ROW * _displayedRows + 1
        : NB_OF_NFT_PER_ROW * _displayedRows;
    setNbOfNftDisplayed(nbOfNftDisplayed);
    if (_displayedRows === 1) {
      setNftList([...emptyNftList.slice(0, nbOfNftDisplayed || 0)]);
    } else {
      setNftList((prev) => {
        return [...prev, ...emptyNftList.slice(0, nbOfNftDisplayed - prev.length || 0)];
      });
    }

    tokenIds.forEach(function (tokenId, i) {
      const nbNft2Load =
        parseInt(assetAndOwner.tokenId) <= NB_OF_NFT_PER_ROW * _displayedRows
          ? parseInt(assetAndOwner.tokenId) > NB_OF_NFT_PER_ROW * (_displayedRows - 1)
            ? NB_OF_NFT_PER_ROW + 1
            : NB_OF_NFT_PER_ROW
          : NB_OF_NFT_PER_ROW;
      if (i < nbOfNftDisplayed && i >= nbOfNftDisplayed - nbNft2Load) {
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
  };

  useEffect(() => {
    if (assetAndOwner.chain && contractLoading) {
      const { chainId, rpcUrl } = getChainByNetworkName(assetAndOwner.chain) || {
        chainId: -1,
        rpcUrl: ''
      };
      const contract = connectContract(
        assetAndOwner.contractAddress || '',
        SIMPLIFIED_ERC721_ABI,
        rpcUrl
      );
      setChainId(chainId);
      setContract(contract);
      setContractLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetAndOwner]);

  useEffect(() => {
    if (upperMd) {
      setDisplayedRows((prev: number) => {
        return prev / 2;
      });
    } else {
      if (nbOfNftDisplayed > 3) {
        setDisplayedRows((prev: number) => {
          return prev * 2;
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upperMd]);

  useEffect(() => {
    if (contract) {
      getNftList(contract, chainId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, displayedRows]);

  return (
    <Stack direction="column">
      {totalSupply > 1 ? (
        <>
          <Stack direction="row" alignItems="flex-end" spacing={1}>
            <Typography variant="h4">More from this collection</Typography>

            <Link href={`#/collection/${assetAndOwner.chain}/${assetAndOwner.contractAddress}/1`}>
              <Icon icon="akar-icons:link-out" width="20px" />
            </Link>
          </Stack>

          <Grid container>
            {NftList.filter((nft) => {
              return nft && nft.tokenId !== assetAndOwner.tokenId && !nft.failToLoad;
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

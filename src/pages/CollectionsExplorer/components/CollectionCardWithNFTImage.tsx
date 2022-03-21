import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardMedia,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { SIMPLIFIED_ERC721_ABI } from 'constants/simplifiedERC721ABI';
import useWeb3 from 'hooks/useWeb3';
import React, { useEffect, useMemo, useState } from 'react';
import { nftItem } from 'services/fetchCollection/createEmptyNFTList';
import {
  getCollectionUrlOpensea,
  OPENSEA_LINK_NOT_FOUND
} from 'services/fetchCollection/getCollectionUrlOpensea';
import { getNftList4CollectionCard } from 'services/fetchCollection/getNFTList';
import {
  connectContract,
  getContractOwner,
  getName,
  getTotalSupply
} from 'services/smartContract/evmCompatible';
import { getChainByChainId, getRpcUrlByChainId } from 'utils/blockchainHandlers';
import EmptyNFT, { cornerPosition } from './EmptyNFT';
import { CollectionData } from './SimpleCollectionCard';
import SkeletonCollectionCardWithNFTImage from './SkeletonCollectionCardWithNFTImage';

type CollectionCardProps = {
  collection: CollectionData;
};

const CollectionCardWithNFTImage = ({ collection }: CollectionCardProps) => {
  const { account } = useWeb3();
  const NB_NFT_TO_SHOW = 4;
  const emptyNftList = new Array(NB_NFT_TO_SHOW).fill(null).map((_, index) => ({
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
  const [nftList, setNftList] = useState<nftItem[]>(emptyNftList);
  const { contractAddress, chainId } = collection;
  const [network, setNetwork] = useState('');
  const [name, setName] = useState('');
  const [contractOwner, setContractOwner] = useState('');
  const [openseaLink, setOpenseaLink] = useState('');
  const [totalSupply, setTotalSupply] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);

  const contract = useMemo(() => {
    return connectContract(
      contractAddress || '',
      SIMPLIFIED_ERC721_ABI,
      getRpcUrlByChainId(chainId)
    );
  }, [contractAddress, chainId]);

  useEffect(() => {
    getName(contract)
      .then((name) => setName(name))
      .catch((e) => {
        console.log(e);
      });
    getTotalSupply(contract)
      .then((totalSupply) => setTotalSupply(totalSupply))
      .catch((e) => {
        console.log('ee', e, contract.address);
      });
    getContractOwner(contract)
      .then((contractOwner) => setContractOwner(contractOwner))
      .catch((e) => {
        console.log(e);
      });
    const chain = getChainByChainId(chainId);
    setNetwork(chain?.name || '');
  }, []);

  useEffect(() => {
    const fetchOpenseaLink = async () => {
      const _openseaLink = await getCollectionUrlOpensea(contractOwner, contract.address);

      if (!_openseaLink) return;
      setOpenseaLink(_openseaLink);
    };
    fetchOpenseaLink();
  }, [contract.address, contractOwner, totalSupply]);

  useEffect(() => {
    if (chainId === 4) {
      const fetchData = async () => {
        const _nftList = await getNftList4CollectionCard(
          contract,
          chainId,
          totalSupply,
          0,
          NB_NFT_TO_SHOW
        );
        if (!_nftList) return;
        setNftList(_nftList);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSupply]);

  useEffect(() => {
    if (nftList[0].contractAddr !== '' || totalSupply === 0) {
      setIsLoaded(true);
    }
  }, [nftList, totalSupply]);

  const FourNFT = () => {
    return (
      <Stack>
        <Box
          sx={{
            borderRadius: '15px',
            overflow: 'hidden'
          }}
        >
          <Grid container spacing={0.5}>
            {nftList.map((nft, index) => {
              return (
                <Grid item xs={6} key={index}>
                  {nft.imageUrl !== '' ? (
                    <ButtonBase>
                      <Link
                        href={
                          index === 3 && totalSupply > 4
                            ? `#/collection/${network.toLowerCase()}/${contractAddress}/1`
                            : `#/assets/${network.toLowerCase()}/${contract.address}/${index + 1}`
                        }
                      >
                        <CardMedia
                          component="img"
                          image={nft.imageUrl}
                          sx={{
                            aspectRatio: '1.5'
                          }}
                        />

                        {index === 3 && totalSupply > 4 ? (
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                              width: '100%',
                              height: '100%',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              aspectRatio: '1.5',
                              opacity: '70%',
                              backgroundColor: 'white'
                            }}
                          >
                            <Typography variant="h3" noWrap sx={{ color: 'black' }}>
                              {`+${totalSupply - 3}`}
                            </Typography>
                          </Box>
                        ) : (
                          <></>
                        )}
                      </Link>
                    </ButtonBase>
                  ) : (
                    <Stack>
                      <ButtonBase>
                        <EmptyNFT text="Add More!" corner={cornerPosition[index]} />
                      </ButtonBase>
                    </Stack>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Stack>
    );
  };

  return (
    <>
      {isLoaded ? (
        <Card>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Stack direction="column" sx={{ width: '90%' }}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: 'baseline', justifyContent: 'space-between', py: 1, pb: 2 }}
              >
                <Link
                  underline="none"
                  href={`#/collection/${network.toLowerCase()}/${contractAddress}/1`}
                  sx={{ maxWidth: '70%' }}
                >
                  <Typography variant="h5" noWrap>
                    {name}
                  </Typography>
                </Link>

                <Typography variant="caption">({totalSupply} NFTs)</Typography>
              </Stack>

              {totalSupply > 0 ? (
                <FourNFT />
              ) : (
                <Stack>
                  <ButtonBase>
                    <EmptyNFT text="This collection is empty!" corner={cornerPosition[0]} />
                  </ButtonBase>
                </Stack>
              )}
              <Stack
                sx={{ width: '100%', height: 50, my: 1 }}
                justifyContent="flex-end"
                direction="row"
                alignItems="center"
              >
                <Tooltip title="Opensea Viewer" sx={{ height: 50, width: 50 }}>
                  <ButtonBase
                    href={openseaLink}
                    target="_blank"
                    disabled={openseaLink === OPENSEA_LINK_NOT_FOUND}
                  >
                    {chainId === 4 ? (
                      <Box
                        component="img"
                        src="./static/icons/shared/opensea.svg"
                        sx={{
                          height: 34,
                          width: 34,
                          opacity:
                            openseaLink === '' || openseaLink === OPENSEA_LINK_NOT_FOUND
                              ? '30%'
                              : '100%'
                        }}
                      />
                    ) : (
                      <></>
                    )}
                    {chainId !== 4 || openseaLink !== '' ? (
                      <></>
                    ) : (
                      <CircularProgress
                        color="info"
                        size={24}
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px'
                        }}
                      />
                    )}
                  </ButtonBase>
                </Tooltip>
                <Button
                  size="small"
                  variant="contained"
                  color="warning"
                  sx={{ px: 3, py: 1, borderRadius: '26px' }}
                  href={`#/mint-nft/${network}/${contract.address}`}
                  disabled={
                    account && contractOwner
                      ? account?.toLowerCase() !== contractOwner?.toLowerCase()
                      : true
                  }
                >
                  <Typography variant="caption" noWrap>
                    Mint NFT
                  </Typography>
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Card>
      ) : (
        <SkeletonCollectionCardWithNFTImage />
      )}
    </>
  );
};

export default CollectionCardWithNFTImage;

import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardMedia,
  CircularProgress,
  createStyles,
  Grid,
  Link,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SIMPLIFIED_ERC721_ABI } from 'constants/simplifiedERC721ABI';
import useWeb3 from 'hooks/useWeb3';
import { Chain } from 'interfaces/chain';
import { useEffect, useMemo, useState } from 'react';
import { createEmptyNFTList, NftItem } from 'services/fetchCollection/createEmptyNFTList';
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
import {
  getChainByChainId,
  getCollectionUrlByChainId,
  getRpcUrlByChainId
} from 'utils/blockchainHandlers';
import EmptyNFT, { cornerPosition } from './EmptyNFT';
import { CollectionData } from './SimpleCollectionCard';
import SkeletonCollectionCardWithNFTImage from './SkeletonCollectionCardWithNFTImage';

const useStyles = makeStyles(
  createStyles({
    tooltip: {
      height: 50,
      width: 50
    },
    internalIcon: {
      height: 34,
      width: 34
    }
  })
);

type CollectionCardProps = {
  collection: CollectionData;
};

const CollectionCardWithNFTImage = ({ collection }: CollectionCardProps) => {
  const { account } = useWeb3();
  const NB_NFT_TO_SHOW = 4;
  const emptyNftList = createEmptyNFTList(NB_NFT_TO_SHOW);
  const [nftList, setNftList] = useState<NftItem[]>(emptyNftList);
  const { contractAddress, chainId } = collection;
  const [network, setNetwork] = useState('');
  const [name, setName] = useState('');
  const [contractOwner, setContractOwner] = useState('');
  const [openseaLink, setOpenseaLink] = useState('');
  const [collectionLink, setCollectionLink] = useState('');
  const [totalSupply, setTotalSupply] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chain, setChain] = useState<Chain | undefined>(undefined);
  const classes = useStyles();

  const contract = useMemo(() => {
    return connectContract(
      contractAddress || '',
      SIMPLIFIED_ERC721_ABI,
      getRpcUrlByChainId(chainId)
    );
  }, [contractAddress, chainId]);

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      const name = await getName(contract);
      const totalSupply = await getTotalSupply(contract);
      const contractOwner = await getContractOwner(contract);
      const chain = getChainByChainId(chainId);
      const _collectionLink = getCollectionUrlByChainId(chainId, contractAddress);
      if (isSubscribed) {
        setName(name || 'Unknown');
        setTotalSupply(totalSupply);
        setContractOwner(contractOwner);
        setNetwork(chain?.name || '');
        setChain(chain);
        setCollectionLink(_collectionLink);
      }
    };
    fetchData();
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    if (chainId === 4) {
      const fetchOpenseaLink = async () => {
        const _openseaLink = await getCollectionUrlOpensea(contractOwner, contract.address);
        if (!_openseaLink) return;
        if (isSubscribed) {
          setOpenseaLink(_openseaLink);
        }
      };
      fetchOpenseaLink();
    }
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract.address, contractOwner, totalSupply]);

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      const _nftList = await getNftList4CollectionCard(
        contract,
        chainId,
        totalSupply,
        0,
        NB_NFT_TO_SHOW
      );
      if (!_nftList) return;
      const emptyNft2FillIn = createEmptyNFTList(NB_NFT_TO_SHOW - _nftList.length);
      if (isSubscribed) {
        setNftList([..._nftList, ...emptyNft2FillIn]);
      }
    };
    fetchData();
    return () => {
      isSubscribed = false;
    };

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
            borderRadius: 2,
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
                  <ButtonBase sx={{ borderRadius: 3.5, overflow: 'hidden' }}>
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
                <Tooltip title="Transaction History" className={classes.tooltip}>
                  <ButtonBase href={collectionLink} target="_blank">
                    <Box component="img" src={chain?.icon || ''} className={classes.internalIcon} />
                  </ButtonBase>
                </Tooltip>
                {chainId === 4 ? (
                  <Tooltip title="Opensea Viewer" className={classes.tooltip}>
                    <ButtonBase
                      href={openseaLink}
                      target="_blank"
                      disabled={openseaLink === OPENSEA_LINK_NOT_FOUND}
                    >
                      <Box
                        component="img"
                        src="./static/icons/shared/opensea.svg"
                        className={classes.internalIcon}
                        sx={{
                          opacity:
                            openseaLink === '' || openseaLink === OPENSEA_LINK_NOT_FOUND
                              ? '30%'
                              : '100%'
                        }}
                      />
                      {openseaLink !== '' ? (
                        <></>
                      ) : (
                        <CircularProgress
                          color="info"
                          size={24}
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: -1.5,
                            marginLeft: -1.5
                          }}
                        />
                      )}
                    </ButtonBase>
                  </Tooltip>
                ) : (
                  <></>
                )}
                {!(collection.collectionType === 'expandable' && contractOwner !== account) && (
                  <Button
                    size="small"
                    variant="contained"
                    color="warning"
                    sx={{ ml: 1, px: 3, py: 1, borderRadius: 3 }}
                    href={
                      collection.collectionType === 'cryptopunks'
                        ? `#/mint-cp-nft/${network.toLowerCase()}/${contract.address}`
                        : `#/mint-nft/${network.toLowerCase()}/${contract.address}`
                    }
                  >
                    Mint NFT
                  </Button>
                )}
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

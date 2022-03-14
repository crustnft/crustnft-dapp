import { Box, Button, Card, CardHeader, Link, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SIMPLIFIED_ERC721_ABI } from 'constants/simplifiedERC721ABI';
import { useEffect, useMemo, useRef, useState } from 'react';
import Slider from 'react-slick';
import { getDataFromTokenUri } from 'services/http';
import {
  connectContract,
  getName,
  getOwner,
  getTokenURI,
  getTotalSupply
} from 'services/smartContract/evmCompatible';
import { getChainNameByChainId, getRpcUrlByChainId } from 'utils/blockchainHandlers';
import { parseNftUri } from 'utils/tokenUriHandlers';
import CarouselArrows from './CarouselArrows';
import CollectionSliderSkeleton from './CollectionSliderSkeleton';
import EmptyCollectionBox from './EmptyCollectionBox';
import NftCard from './NftCard';
import { TypographyWithSubtitle } from './TitleWithSubtitle';

const NB_OF_NFT_PER_CAROUSEL = 10;

const emptyNftList = new Array(NB_OF_NFT_PER_CAROUSEL).fill(null).map((_, index) => ({
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

export default function CollectionSlider({
  contractAddr,
  chainId
}: {
  contractAddr: string;
  chainId: number;
}) {
  const theme = useTheme();
  const carouselRef = useRef<Slider | null>(null);
  const [nbFailedNft, setFailedNft] = useState(0);

  const contract = useMemo(() => {
    return connectContract(contractAddr || '', SIMPLIFIED_ERC721_ABI, getRpcUrlByChainId(chainId));
  }, [contractAddr, chainId]);

  const [name, setName] = useState('Getting name...');
  const [chainName, setChainName] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [nbEmptyCarouselItems, setNbEmptyCarouselItems] = useState(0);
  const [NftList, setNftList] = useState<NftItem[]>(emptyNftList);
  const [loading, setLoading] = useState(true);
  // const [filteredNftList, setFilteredNftList] = useState<NftItem[]>([]);

  useEffect(() => {
    setChainName(getChainNameByChainId(chainId).toLowerCase());
  }, [chainId]);

  useEffect(() => {
    async function getNftList() {
      getName(contract)
        .then((name: string) => setName(name))
        .catch(() => setName('Unknown'));
      const _totalSupply = await getTotalSupply(contract).catch((e) => {
        console.log(e);
      });
      setTotalSupply(_totalSupply || 0);
      const nbOfNftPerCarousel =
        _totalSupply < NB_OF_NFT_PER_CAROUSEL ? _totalSupply : NB_OF_NFT_PER_CAROUSEL;

      setNftList((prevList) => [...emptyNftList.slice(0, nbOfNftPerCarousel || 0)]);
      for (let i = 0; i < nbOfNftPerCarousel; i++) {
        const tokenId = i + 1;
        getTokenURI(contract, tokenId)
          .then(async (tokenUri) => {
            const parsedTokenUri = parseNftUri(tokenUri);
            const data = await getDataFromTokenUri(parsedTokenUri);
            const owner = await getOwner(contract, tokenId);
            const parsedImageUrl = parseNftUri(data.image || '');
            setNftList((prevList) => {
              prevList[i] = {
                key: contractAddr.slice(-4, -1) + tokenId,
                failToLoad: false,
                tokenId: tokenId.toString(),
                tokenURI: tokenUri,
                imageUrl: parsedImageUrl,
                name: data.name || '',
                owner,
                chainName: getChainNameByChainId(chainId),
                contractAddr: contractAddr
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
      }
    }

    getNftList().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setFilteredNftList(NftList.filter((nft) => !nft.failToLoad));
  // }, [NftList]);

  const [nbOfFrames, setNbOfFrames] = useState(4);
  const fourFrames = useMediaQuery(theme.breakpoints.up(800));
  const threeFrames = useMediaQuery(theme.breakpoints.up(600));
  const twoFrames = useMediaQuery(theme.breakpoints.up(400));

  useEffect(() => {
    setNbOfFrames(fourFrames ? 4 : threeFrames ? 3 : twoFrames ? 2 : 1);
  }, [fourFrames, threeFrames, twoFrames]);

  useEffect(() => {
    setNbEmptyCarouselItems(
      nbOfFrames - (totalSupply - nbFailedNft) < 0 ? 0 : nbOfFrames - (totalSupply - nbFailedNft)
    );
  }, [totalSupply, nbFailedNft, nbOfFrames]);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box>
      {loading ? (
        <CollectionSliderSkeleton />
      ) : (
        <Stack>
          {totalSupply === 0 ? (
            <EmptyCollectionBox
              contractAddr={contractAddr}
              chainId={chainId}
              totalSupply={totalSupply}
              collectionTitle={name}
              chainName={chainName}
            />
          ) : (
            <Card
              sx={{
                p: { xs: 1, sm: 2, md: 3 },
                bgcolor: theme.palette.collectionSlider,
                borderRadius: '16px'
              }}
            >
              <CardHeader
                title={
                  <TypographyWithSubtitle
                    title={name}
                    subTitle={`(${totalSupply} NFTs)`}
                    titleSize="h4"
                    subTitleSize="subtitle2"
                  />
                }
                action={
                  <Stack sx={{ mr: 3 }}>
                    <CarouselArrows
                      customIcon={'ic:round-keyboard-arrow-right'}
                      onNext={handleNext}
                      onPrevious={handlePrevious}
                      sx={{ '& .arrow': { width: 28, height: 28, p: 0, ml: 2 } }}
                    />
                  </Stack>
                }
                sx={{
                  p: 0,
                  '& .MuiCardHeader-action': { alignSelf: 'center' }
                }}
              />

              <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                {totalSupply !== 0 && (
                  <Link href={`#/collection/${chainName}/${contractAddr}/1`}>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        px: 3,
                        py: 0.5,
                        borderRadius: '26px',
                        bgcolor: theme.palette.additional.blueButton,
                        color: theme.palette.text.primary
                      }}
                    >
                      View all
                    </Button>
                  </Link>
                )}

                <Link href={`#/mint-nft/${chainName}/${contractAddr}`}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      px: 3,
                      py: 0.5,
                      borderRadius: '26px',
                      bgcolor: theme.palette.additional.yellowButton,
                      color: theme.palette.text.primary
                    }}
                  >
                    Mint NFT
                  </Button>
                </Link>
              </Stack>

              <Stack sx={{ mx: -1 }}>
                <Slider ref={carouselRef} {...settings}>
                  {NftList.filter((nft) => !nft.failToLoad).map((nft) => (
                    <Box key={nft.key}>
                      <NftCard {...nft} />
                    </Box>
                  ))}

                  {[...Array(nbEmptyCarouselItems)].map((_, index) => (
                    <Box key={index} />
                  ))}
                </Slider>
              </Stack>
            </Card>
          )}
        </Stack>
      )}
    </Box>
  );
}

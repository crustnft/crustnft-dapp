import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { AddCollectionIcon } from 'assets/icons/customIcons';
import { CreateContractDto } from 'clients/crustnft-explore-api/types';
import { SIMPLIFIED_ERC721_ABI } from 'constants/simplifiedERC721ABI';
import { useEffect, useMemo, useState } from 'react';
import { getDataFromTokenUri } from 'services/http';
import {
  connectContract,
  getName,
  getTokenURI,
  getTotalSupply
} from 'services/smartContract/evmCompatible';
import { getRpcUrlByChainId } from 'utils/blockchainHandlers';
import { parseNftUri } from 'utils/tokenUriHandlers';
import MCard from './@material-extend/MCard';

interface CollectionSumaryProps {
  collection: CreateContractDto;
}

const CollectionSumary = ({ collection }: CollectionSumaryProps) => {
  const [name, setName] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [displayImages, setDisplayImages] = useState<string[]>([]);

  const contract = useMemo(() => {
    return connectContract(
      collection.contractAddress,
      SIMPLIFIED_ERC721_ABI,
      getRpcUrlByChainId(collection.chainId)
    );
  }, [collection]);

  useEffect(() => {
    const fetchCollectionInfo = async () => {
      try {
        let _totalSupply = await getTotalSupply(contract);
        setTotalSupply(_totalSupply);
      } catch (e) {
        console.error(e);
      }
    };

    fetchCollectionInfo();
  }, [contract]);

  useEffect(() => {
    const fetchCollectionImages = async () => {
      if (!contract) {
        return;
      } else {
        console.log(contract);
      }
      try {
        setName(await getName(contract));
        let images: string[] = [];
        for (let i = 1; i < Math.min(totalSupply, 5); i++) {
          const tokenUri = await getTokenURI(contract, i);
          const parsedTokenUri = parseNftUri(tokenUri);
          const data = await getDataFromTokenUri(parsedTokenUri);
          const parsedImageUrl = parseNftUri(data.image || '');
          images.push(parsedImageUrl);
        }
        setDisplayImages(images);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCollectionImages();
  }, [contract, totalSupply]);

  const CollectionImage = ({ images }: { images: string[] }) => {
    if (images.length === 0) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            aspectRatio: '1'
          }}
        >
          <AddCollectionIcon />
        </Box>
      );
    } else if (images.length < 4) {
      return (
        <Box
          component="img"
          src={images[0]}
          alt={'nft'}
          sx={{ borderRadius: '6.5px', aspectRatio: '1' }}
        />
      );
    } else {
      return (
        <Grid container spacing="18px">
          {images.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Box
                component="img"
                src={item}
                alt={'nft'}
                sx={{ borderRadius: '6.5px', aspectRatio: '1' }}
              />
            </Grid>
          ))}
        </Grid>
      );
    }
  };

  return (
    <MCard hoverEffect>
      <Stack sx={{ p: '25px' }}>
        <CollectionImage images={displayImages} />
        <Stack direction="row" sx={{ mt: '35px', justifyContent: 'space-between' }}>
          <Typography variant="h6" color="text.primary" sx={{ cursor: 'pointer' }}>
            {name}
          </Typography>
          <Chip
            label={
              <Typography variant="button.small">
                {totalSupply} NFT{totalSupply > 1 && 's'}
              </Typography>
            }
            sx={{
              p: '7px 11px',
              borderRadius: '8px',
              '& .MuiChip-label': {
                p: 0
              }
            }}
          />
        </Stack>
        {/* <Stack
          direction="row"
          sx={{ mt: '25px', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Stack direction="row" spacing="15px">
            {onChain.map((item, index) => (
              <Box
                component="img"
                src={item}
                alt=""
                key={index}
                sx={{ width: '32px', height: '32px' }}
              />
            ))}
          </Stack>

          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ p: '11px 38.5px', textTransform: 'none' }}
          >
            Mint
          </Button>
        </Stack> */}
      </Stack>
    </MCard>
  );
};

export default CollectionSumary;

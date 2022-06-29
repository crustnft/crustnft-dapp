import { Box, Button, Chip, Link, Stack, Typography } from '@mui/material';
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
import {
  getChainNameByChainId,
  getCollectionUrlByChainId,
  getIconByChainId,
  getRpcUrlByChainId
} from 'utils/blockchainHandlers';
import { parseNftUri } from 'utils/tokenUriHandlers';
import MCard from '../@material-extend/MCard';
import CollectionImage from './components/CollectionImage';
import CollectionImageSkeleton from './components/CollectionImageSkeleton';

interface CollectionSummaryProps {
  collection: CreateContractDto;
}

const CollectionSummary = ({ collection }: CollectionSummaryProps) => {
  const [loaded, setLoaded] = useState(false);
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
        setName(await getName(contract));

        let images: string[] = [];
        for (let i = 1; i < Math.min(_totalSupply, 5); i++) {
          const tokenUri = await getTokenURI(contract, i);
          const parsedTokenUri = parseNftUri(tokenUri);
          const data = await getDataFromTokenUri(parsedTokenUri);
          const parsedImageUrl = parseNftUri(data.image || '');
          images.push(parsedImageUrl);
        }
        setDisplayImages(images);
        setLoaded(true);
      } catch (e) {
        console.error(e);
      }
    };

    fetchCollectionInfo();
  }, [contract]);

  return (
    <MCard hoverEffect>
      <Stack sx={{ p: '25px' }}>
        {loaded ? (
          <CollectionImage
            images={displayImages}
            chainName={getChainNameByChainId(collection.chainId)}
            contractAddress={collection.contractAddress}
          />
        ) : (
          <CollectionImageSkeleton />
        )}
        <Stack
          direction="row"
          sx={{ mt: '25px', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Link
            href={`#/collection/${getChainNameByChainId(collection.chainId)}/${
              collection.contractAddress
            }/1`}
            sx={{ p: '10px 0', flex: 1, maxWidth: '70%' }}
          >
            <Typography variant="h6" color="text.primary" noWrap>
              {name}
            </Typography>
          </Link>
          <Chip
            label={
              <Typography variant="buttonSmall">
                {totalSupply} NFT{totalSupply > 1 && 's'}
              </Typography>
            }
            sx={{
              ml: '10px',
              p: '7px 11px',
              borderRadius: '8px',
              '& .MuiChip-label': {
                p: 0
              }
            }}
          />
        </Stack>
        <Stack
          direction="row"
          sx={{ mt: '15px', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Box
            component="a"
            href={getCollectionUrlByChainId(collection.chainId, collection.contractAddress)}
            target="_blank"
            sx={{
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              background: `center / contain no-repeat url(${getIconByChainId(collection.chainId)})`
            }}
          />

          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ p: '11px 38.5px', textTransform: 'none' }}
          >
            Mint
          </Button>
        </Stack>
      </Stack>
    </MCard>
  );
};

export default CollectionSummary;

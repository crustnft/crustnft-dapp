import { Box, Grid, Link } from '@mui/material';
import { AddCollectionIcon } from 'assets/icons/customIcons';

interface CollectionSummaryProps {
  images: string[];
  chainName: string;
  contractAddress: string;
}

const CollectionImage = ({ images, chainName, contractAddress }: CollectionSummaryProps) => {
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
      <Link href={`#/assets/${chainName}/${contractAddress}/1`}>
        <Box
          component="img"
          src={images[0]}
          alt={'nft'}
          sx={{ borderRadius: '6.5px', aspectRatio: '1' }}
        />
      </Link>
    );
  } else {
    return (
      <Grid container spacing="18px">
        {images.map((item, index) => (
          <Grid item xs={6} key={index}>
            <Link href={`#/assets/${chainName}/${contractAddress}/${index + 1}`}>
              <Box
                component="img"
                src={item}
                alt={'nft'}
                sx={{ borderRadius: '6.5px', aspectRatio: '1' }}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  }
};

export default CollectionImage;

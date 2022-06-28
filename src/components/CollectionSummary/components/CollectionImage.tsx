import { Box, Grid } from '@mui/material';
import { AddCollectionIcon } from 'assets/icons/customIcons';

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

export default CollectionImage;

import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material';
import { AddCollectionIcon } from 'assets/icons/customIcons';
import MCard from './@material-extend/MCard';

interface CollectionSumaryProps {
  title: string;
  nfts: string[];
  onChain: string[];
}

const EmptyCollection = () => (
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

const CollectionSumary = ({ title, nfts, onChain }: CollectionSumaryProps) => {
  let CollectionImage;
  if (nfts.length === 0) {
    CollectionImage = () => <EmptyCollection />;
  } else if (nfts.length < 4) {
    CollectionImage = () => (
      <Box
        component="img"
        src={nfts[0]}
        alt={'nft'}
        sx={{ borderRadius: '6.5px', aspectRatio: '1' }}
      />
    );
  } else {
    let fourNfts = nfts.slice(0, 4);
    CollectionImage = () => (
      <Grid container spacing="18px">
        {fourNfts.map((item, index) => (
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

  return (
    <MCard hoverEffect>
      <Stack sx={{ p: '25px' }}>
        <CollectionImage />
        <Stack direction="row" sx={{ mt: '35px', justifyContent: 'space-between' }}>
          <Typography variant="h6" color="text.primary" sx={{ cursor: 'pointer' }}>
            {title}
          </Typography>
          <Chip
            label={
              nfts.length > 1 ? (
                <Typography variant="button.small">{nfts.length} NFTs</Typography>
              ) : (
                <Typography variant="button.small">{nfts.length} NFT</Typography>
              )
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
        <Stack
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
        </Stack>
      </Stack>
    </MCard>
  );
};

export default CollectionSumary;

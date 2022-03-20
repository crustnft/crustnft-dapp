import { Button, Card, CardHeader, Stack, Typography } from '@mui/material';
import NFTCardSkeleton from './NFTCardSkeleton';

export default function CollectionSliderSkeleton() {
  return (
    <Stack>
      <Card
        sx={{
          p: { xs: 1, sm: 2, md: 3 },
          borderRadius: '16px',
          bgcolor: 'transparent',
          border: 'none',
          boxShadow: 'none'
        }}
      >
        <CardHeader
          title={
            <Stack direction="row" sx={{ alignItems: 'baseline' }}>
              <Typography variant="h4" sx={{ color: 'transparent' }}>
                Loading...
              </Typography>
              <Typography variant="subtitle2" sx={{ color: 'transparent' }}>
                Loading...
              </Typography>
            </Stack>
          }
          sx={{
            p: 1
          }}
        />

        <Stack direction="row" spacing={2} sx={{ mb: 1, px: 2 }}>
          <Button
            size="small"
            variant="contained"
            sx={{
              px: 3,
              py: 0.5,
              borderRadius: '26px'
            }}
          >
            View all
          </Button>

          <Button
            size="small"
            variant="contained"
            sx={{
              px: 3,
              py: 0.5,
              borderRadius: '26px'
            }}
          >
            Mint NFT
          </Button>
        </Stack>
        <Stack direction="row" sx={{ mx: 0 }}>
          {[0, 1, 2, 3].map((_, index) => {
            return (
              <Stack key={index} sx={{ px: 2 }}>
                <NFTCardSkeleton />
              </Stack>
            );
          })}
        </Stack>
      </Card>
    </Stack>
  );
}

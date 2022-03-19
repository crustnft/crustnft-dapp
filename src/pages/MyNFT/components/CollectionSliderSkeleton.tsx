import { Box, Divider, Skeleton, Stack } from '@mui/material';
import NFTCardSkeleton from './NFTCardSkeleton';

export default function CollectionSliderSkeleton() {
  return (
    <Box>
      <Box sx={{ backgroundColor: '#F4F6F8', p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Stack direction="column" sx={{ width: '200px' }}>
            <Skeleton animation="wave" height={15} width="50%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={15} width="100%" />
          </Stack>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ pt: 2, pl: 5 }}>
        <NFTCardSkeleton />
      </Box>
    </Box>
  );
}

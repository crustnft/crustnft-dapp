import { Box, Card, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';

function SkeletonCollectionCardWithNFTImage() {
  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Stack direction="column" sx={{ width: '90%' }}>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', py: 1, pb: 2 }}>
            <Typography variant="h5" noWrap sx={{ opacity: '0%' }}>
              Loading...
            </Typography>
          </Stack>
          <Stack>
            <Box
              width="100%"
              sx={{
                aspectRatio: '1.5',
                borderRadius: '15px',
                overflow: 'hidden'
              }}
            >
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </Box>
          </Stack>
          <Stack
            sx={{ width: '100%', height: 50, my: 1 }}
            justifyContent="flex-end"
            direction="row"
            alignItems="center"
          >
            <Skeleton variant="rectangular" width="30%" height={34} sx={{ borderRadius: '26px' }} />
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}

export default SkeletonCollectionCardWithNFTImage;

import { Stack, Typography, Box } from '@mui/material';
import React from 'react';

const CollectionPreview: React.FC = () => {
  return (
    <Stack direction={'column'} spacing={2}>
      <Typography variant="h4">Preview</Typography>
      <Box>
        <Typography variant="h5">Collection</Typography>
      </Box>
      <Box>
        <Typography variant="h5">NFT</Typography>
      </Box>
    </Stack>
  );
};

export default CollectionPreview;

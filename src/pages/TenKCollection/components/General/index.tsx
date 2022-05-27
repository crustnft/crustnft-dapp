import React from 'react';
import { Typography, Stack } from '@mui/material';
import { CrustInput } from '../../../../components/crust';
import { Box } from '@mui/system';
import CollectionPreview from '../CollectionPreview';

const General: React.FC = () => {
  return (
    <Stack direction={'row'} spacing={5}>
      <Box sx={{ flex: '1 1 auto' }}>
        <Typography variant="h4">General collection setting</Typography>
        <CrustInput
          name="collectionName"
          label="Collection name"
          placeholder='e. g. "Redeemable Bitcoin Card with logo"'
        />
        <CrustInput
          name="tokenSymbol"
          label="Collection token symbol"
          placeholder='e. g. "Redeemable Bitcoin Card with logo"'
        />
        <CrustInput
          name="nftName"
          label="NFT name"
          placeholder='e. g. "Redeemable Bitcoin Card with logo"'
        />
        <CrustInput
          name="description"
          label="NFT description"
          placeholder='e. g. "Redeemable Bitcoin Card with logo"'
        />
        <CrustInput
          name="maxNumberNFT"
          label="Max number of NFT"
          placeholder='e. g. "Redeemable Bitcoin Card with logo"'
        />
        <CrustInput
          name="network"
          label="Network"
          placeholder='e. g. "Redeemable Bitcoin Card with logo"'
        />
      </Box>
      <Box sx={{ flexBasis: '300px' }}>
        <CollectionPreview />
      </Box>
    </Stack>
  );
};

export default General;

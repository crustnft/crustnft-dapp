import { Box, Card, Stack } from '@mui/material';
import { useState } from 'react';
import { LineScalePulseOutRapid } from 'react-pure-loaders';
import { AssetAndOwnerType } from '../AssetViewer.types';

export default function AssetCard({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const [loading, setLoading] = useState(true);

  return (
    <Card>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
            <Box
              component="img"
              alt="post media"
              src={assetAndOwner.imageUrl}
              onLoad={() => setLoading(false)}
              sx={{
                display: loading ? 'none' : 'block'
              }}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%', display: loading ? 'flex' : 'none', mt: 5 }}
          >
            <LineScalePulseOutRapid color={'#637381'} loading={loading} />
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}

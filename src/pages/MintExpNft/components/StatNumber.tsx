import { Card, Stack, Typography } from '@mui/material';
import type { StatProps } from '../MintNft.types';

export default function StatNumber({ statType, max, value }: StatProps) {
  return (
    <Stack spacing={1}>
      <Card
        sx={{
          p: 1,
          borderRadius: 1,
          backgroundColor: 'background.neutral',
          borderColor: '#15B2E5'
        }}
        variant="outlined"
      >
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
            {statType}
          </Typography>
          <Typography variant="subtitle2">{value} of&nbsp;</Typography>
          <Typography variant="subtitle2">{max}</Typography>
        </Stack>
      </Card>
    </Stack>
  );
}

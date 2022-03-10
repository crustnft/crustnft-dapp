import { Card, Stack, Typography } from '@mui/material';
import type { PropertyProps } from '../AssetViewer.types';

export default function Property({ propType, name }: PropertyProps) {
  return (
    <Card
      sx={{ p: 2, backgroundColor: 'background.neural', borderColor: 'header.menuText' }}
      variant="outlined"
    >
      <Stack alignItems="center" spacing={1}>
        <Typography variant="overline">{propType}</Typography>
        <Typography variant="body2">{name}</Typography>
      </Stack>
    </Card>
  );
}

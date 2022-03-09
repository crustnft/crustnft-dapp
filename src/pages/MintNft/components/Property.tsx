import { Card, Stack, Typography } from '../../../components/@c-components';
import type { PropertyProps } from '../MintNft.types';

export default function Property({ propType, name }: PropertyProps) {
  return (
    <Card sx={{ p: 2, backgroundColor: '#F4F6F8', borderColor: '#15B2E5' }} variant="outlined">
      <Stack alignItems="center" spacing={1}>
        <Typography variant="overline">{propType}</Typography>
        <Typography variant="body2">{name}</Typography>
      </Stack>
    </Card>
  );
}

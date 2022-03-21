import { Card, Skeleton, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function NFTCardSkeleton() {
  return (
    <Card sx={{ borderRadius: 2, bgcolor: (theme) => theme.palette.card.background }}>
      <Stack direction="row" sx={{ p: 2, display: 'flex', alignItems: 'baseline' }}>
        <Stack
          sx={{
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Skeleton variant="text">
            <Typography variant="caption" noWrap sx={{ px: 2, fontSize: 13 }}>
              #0
            </Typography>
          </Skeleton>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" sx={{ width: '100%' }}>
          <Skeleton variant="text">
            <Typography variant="caption" noWrap sx={{ fontSize: 13 }}>
              Loading...
            </Typography>
          </Skeleton>
        </Stack>
      </Stack>
      <Skeleton sx={{ height: '214px', mx: 2, borderRadius: '5px' }} variant="rectangular" />
      <Stack direction="row" sx={{ p: 2, justifyContent: 'center' }}>
        <Skeleton variant="text">
          <Typography variant="h6" sx={{ fontSize: 13 }}>
            0.00 ETH
          </Typography>
        </Skeleton>
      </Stack>
    </Card>
  );
}

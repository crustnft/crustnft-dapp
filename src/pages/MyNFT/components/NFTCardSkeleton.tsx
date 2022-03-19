import { Card, Skeleton } from '@mui/material';

export default function NFTCardSkeleton() {
  return (
    <Card sx={{ width: '230px' }}>
      <Skeleton sx={{ height: '260px' }} animation="wave" variant="rectangular" />
      <Skeleton animation="wave" height={15} width="100%" />
      <Skeleton animation="wave" height={15} width="100%" />
    </Card>
  );
}

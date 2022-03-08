import { Avatar, Box, Card, Divider, Skeleton, Stack } from '../../../components/@c-components';

export default function skeletonLoadingCard() {
  return (
    <Card>
      <Box sx={{ backgroundColor: '#F4F6F8', p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Stack direction="column" sx={{ width: '200px' }}>
            <Skeleton animation="wave" height={15} width="50%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={20} width="100%" />
          </Stack>
          <Avatar alt="avatar">
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          </Avatar>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack
          direction="column"
          sx={{ mb: 2 }}
          alignItems="center"
          spacing={2}
          justifyContent="space-between"
        >
          <Skeleton animation="wave" height={15} width="100%" />
          <Skeleton animation="wave" height={15} width="100%" />
          <Skeleton animation="wave" height={15} width="100%" />
          <Skeleton animation="wave" height={15} width="100%" />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Skeleton variant="rectangular" width={200} height={20} />
        </Stack>
      </Box>
    </Card>
  );
}

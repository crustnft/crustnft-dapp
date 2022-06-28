import { Box, Skeleton } from '@mui/material';

const CollectionImageSkeleton = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: '1',
        borderRadius: '6.5px',
        overflow: 'hidden'
      }}
    >
      <Skeleton variant="rectangular" width="100%" height="100%" />
    </Box>
  );
};

export default CollectionImageSkeleton;

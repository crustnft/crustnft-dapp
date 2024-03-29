import { Box, Link, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
// To be moved to its place
import type { NftCardCollectionViewerProps } from '../AssetViewer.types';

function NftCard({
  tokenId,
  imageUrl,
  name,
  owner,
  chainName,
  contractAddr
}: NftCardCollectionViewerProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [imageUrl]);

  return (
    <Paper
      sx={{
        borderRadius: 2,
        bgcolor: 'transparent',
        transition: 'all .2s ease-in-out',
        '&:hover': {
          transform: `translateY(-${theme.spacing(1 / 4)})`,
          boxShadow: (theme) => theme.shadows['4']
        }
      }}
    >
      <Box sx={{ p: 1, position: 'relative', paddingBottom: 0 }}>
        <Link href={`#/assets/${chainName.toLowerCase()}/${contractAddr}/${tokenId}`}>
          <Box>
            <Stack
              sx={{
                paddingTop: '100%',
                position: 'relative'
              }}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  display: loading ? 'flex' : 'none !important',
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  height: '100%'
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  sx={{ height: 'inherit', p: 2, borderRadius: '18px' }}
                ></Skeleton>
              </Stack>

              <Box
                component="img"
                src={imageUrl}
                alt="nftcard"
                onLoad={() => setLoading(false)}
                sx={{
                  top: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: loading ? 'none !important' : 'block !important',
                  position: 'absolute',
                  borderRadius: '18px'
                }}
              />
            </Stack>
          </Box>
        </Link>
      </Box>

      <Stack spacing={0.5} sx={{ p: 2, pt: 1, pb: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {loading ? (
            <Skeleton animation="wave" height={15} width="20%" />
          ) : (
            <Link
              color="inherit"
              underline="none"
              href={`#/assets/${chainName.toLowerCase()}/${contractAddr}/${tokenId}`}
              sx={{ maxWidth: '70%' }}
            >
              <Typography variant="body1" noWrap sx={{ fontSize: 13 }}>
                {name}
              </Typography>
            </Link>
          )}
          {loading ? (
            <Skeleton animation="wave" height={15} width="20%" />
          ) : (
            <Typography variant="body1" noWrap sx={{ fontSize: 13, maxWidth: '30%' }}>
              #{tokenId || ''}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}

export default React.memo(NftCard);

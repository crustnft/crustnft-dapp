import { Box, Link, Paper, Stack, Typography } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { BallClipRotateMultiple } from 'react-pure-loaders';
import type { NftCardCollectionViewerProps } from '../CollectionViewer.types';

// To be moved to its place
export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#EAECEF'),
  backgroundColor: '#EAECEF',
  '&:hover': {
    backgroundColor: '#EAECEF'
  },
  boxShadow: 'none',
  padding: '3px 8px',
  minWidth: 0,
  borderRadius: '3px'
}));

const randomColorList = [
  '#dbbc21',
  '#db4021',
  '#91db21',
  '#21db53',
  '#21d2db',
  '#2153db',
  '#b621db',
  '#db2187'
];

export default function NftCard({
  tokenId,
  imageUrl,
  name,
  owner,
  contractAddr,
  chainName
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
        bgcolor: (theme) => theme.palette.card.background,
        transition: 'all .2s ease-in-out',
        '&:hover': {
          transform: `translateY(-${theme.spacing(1 / 4)})`,
          boxShadow: (theme) => theme.shadows['4']
        }
      }}
    >
      <Stack direction="row" sx={{ p: 2, display: 'flex', alignItems: 'baseline' }}>
        <Stack
          sx={{
            borderRadius: 5,
            background: randomColorList[Math.floor(Math.random() * randomColorList.length)],
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="caption" noWrap sx={{ px: 2, fontSize: 13 }}>
            #{tokenId || ''}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" sx={{ width: '100%' }}>
          <Typography variant="caption" noWrap sx={{ fontSize: 13 }}>
            {chainName}
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ p: 2, pt: 0, position: 'relative' }}>
        <Link href={`#/assets/${chainName}/${contractAddr}/${tokenId}`}>
          <Box sx={{ border: 1, borderRadius: '5px', borderColor: '#DFE3E8' }}>
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
                  display: loading ? 'flex' : 'none',
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  height: '100%'
                }}
              >
                <BallClipRotateMultiple color={'#637381'} loading={loading} />
              </Stack>
              <Box
                component="img"
                src={imageUrl}
                onLoad={() => setLoading(false)}
                sx={{
                  top: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: loading ? 'none' : 'block',
                  position: 'absolute',
                  borderRadius: '5px'
                }}
              />
            </Stack>
          </Box>
        </Link>
      </Box>

      <Stack
        direction="row"
        spacing={0.5}
        sx={{ px: 2, pb: 2, justifyContent: 'center', alignItems: 'baseline' }}
      >
        <Typography variant="h6" sx={{ fontSize: 13 }}>
          0.00
        </Typography>
        <Typography variant="caption" sx={{ fontSize: 13 }}>
          ETH
        </Typography>
      </Stack>
    </Paper>
  );
}

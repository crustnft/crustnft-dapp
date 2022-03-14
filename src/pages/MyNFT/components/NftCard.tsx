import { Box, Link, Paper, Stack, Typography } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { BallClipRotateMultiple } from 'react-pure-loaders';
// To be moved to its place
import type { NftCardCollectionViewerProps } from '../MyNFT.types';

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

interface setDisplayTokenIdType {
  setDisplayTokenId?: React.Dispatch<React.SetStateAction<number>>;
}

function NftCard({
  tokenId,
  imageUrl,
  name,
  owner,
  chainName,
  contractAddr,
  setDisplayTokenId
}: NftCardCollectionViewerProps & setDisplayTokenIdType) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [imageUrl]);

  useEffect(() => {
    console.log(`NftCard: ${tokenId}, name: ${name}, loading: ${loading}`);
  }, [loading]);

  const handleClick = (tokenId: number) => {
    if (setDisplayTokenId !== undefined) {
      setDisplayTokenId(tokenId);
    }
  };
  return (
    <Paper
      sx={{
        borderRadius: 2,
        boxShadow: 'none',
        bgcolor: 'transparent',
        transition: 'all .2s ease-in-out',
        '&:hover': {
          transform: `translateY(-${theme.spacing(1 / 4)})`,
          boxShadow: (theme) => theme.shadows['4']
        }
      }}
    >
      <Box sx={{ p: 3, position: 'relative', paddingBottom: 0 }}>
        <Link
          href={`#/assets/${chainName.toLowerCase()}/${contractAddr}/${tokenId}`}
          onClick={() => {
            handleClick(parseInt(tokenId));
          }}
        >
          <Box sx={{ borderRadius: '18px' }}>
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
                <BallClipRotateMultiple color={'#637381'} loading={loading} />
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

      <Stack spacing={0.5} sx={{ p: 2, pt: 1, pb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link
            color="inherit"
            underline="none"
            href={`#/assets/${chainName.toLowerCase()}/${contractAddr}/${tokenId}`}
            sx={{ maxWidth: '70%' }}
          >
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Link>
          <ColorButton
            variant="contained"
            size="small"
            disableElevation
            disableFocusRipple
            disableRipple
          >
            <Typography variant="caption" noWrap>
              {chainName}
            </Typography>
          </ColorButton>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link
            color="inherit"
            underline="none"
            href={`#/assets/${chainName.toLowerCase()}/${contractAddr}/${tokenId}`}
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="caption" noWrap>
                Token ID
              </Typography>
            </Stack>
          </Link>

          <Typography variant="body2" noWrap sx={{ fontSize: 13, maxWidth: '30%' }}>
            #{tokenId || ''}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default React.memo(NftCard);

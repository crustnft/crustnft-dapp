import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Box, ButtonBase, Link, Paper, Skeleton, Stack, Typography } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import LightboxModal from 'components/LightboxModal';
import React, { useEffect, useState } from 'react';
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
  const [openLightbox, setOpenLightbox] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [imageUrl]);

  const handleClick = (tokenId: number) => {
    if (setDisplayTokenId !== undefined) {
      setDisplayTokenId(tokenId);
    }
  };

  const handleOpenLightbox = (url: string) => {
    setOpenLightbox(true);
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
      <Box sx={{ p: 1, position: 'relative', paddingBottom: 0 }}>
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
        <LightboxModal
          images={[imageUrl]}
          mainSrc={imageUrl}
          photoIndex={0}
          setPhotoIndex={() => {}}
          isOpen={openLightbox}
          onCloseRequest={() => setOpenLightbox(false)}
        />
        {loading ? (
          <></>
        ) : (
          <ButtonBase
            sx={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              p: 1,
              borderRadius: '50%',
              opacity: 0.5
            }}
            onClick={() => handleOpenLightbox(imageUrl)}
          >
            <FullscreenIcon />
          </ButtonBase>
        )}
      </Box>
      {loading ? (
        <Stack sx={{ p: 1 }} spacing={1} direction="column">
          <Skeleton animation="wave" height={15} width="100%" />
          <Skeleton animation="wave" height={15} width="100%" />
        </Stack>
      ) : (
        <Stack spacing={0.5} sx={{ p: 1, pb: 0 }}>
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
      )}
    </Paper>
  );
}

export default React.memo(NftCard);

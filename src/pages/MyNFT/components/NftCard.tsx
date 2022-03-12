import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Box, Card, Link, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import LightboxModal from 'components/LightboxModal';
import React, { useEffect, useState } from 'react';
import { BallClipRotateMultiple } from 'react-pure-loaders';
// To be moved to its place
import type { NftCardCollectionViewerProps } from '../MyNFT.types';

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
  const [openLightbox, setOpenLightbox] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [imageUrl]);

  useEffect(() => {
    console.log(`NftCard: ${tokenId}, name: ${name}, loading: ${loading}`);
  }, [loading]);

  const handleOpenLightbox = (url: string) => {
    setOpenLightbox(true);
  };

  return (
    <Card
      sx={{
        bgcolor: 'transparent',
        transition: 'all .2s ease-in-out',
        boxShadow: 'none',
        width: { lg: '230px', xs: '100px' },
        height: { lg: '300px', xs: '130px' },
        margin: '10px',
        '&:hover': {
          transform: `translateY(-${theme.spacing(1 / 4)})`,
          boxShadow: theme.shadows['4']
        }
      }}
    >
      <Box sx={{ position: 'relative', paddingBottom: 0 }}>
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
              {loading ? (
                <></>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<FullscreenIcon />}
                    sx={{
                      position: 'absolute',
                      top: '5px',
                      left: '5px',
                      borderRadius: '15px',
                      opacity: 0.5
                    }}
                    onClick={() => handleOpenLightbox(imageUrl)}
                  >
                    View Full
                  </Button>
                </>
              )}
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
      </Box>
      <Stack spacing={0.5} sx={{ p: 2, pt: 1, pb: 5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link
            color="inherit"
            underline="none"
            href={`#/assets/${chainName.toLowerCase()}/${contractAddr}/${tokenId}`}
            sx={{ maxWidth: '70%' }}
          >
            <Typography variant="h5" noWrap>
              {name}
            </Typography>
          </Link>

          <Typography variant="h5" noWrap sx={{ fontSize: 13, maxWidth: '30%' }}>
            #{tokenId || ''}
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<FullscreenIcon />}
            sx={{
              position: 'absolute',
              top: '5px',
              left: '5px',
              borderRadius: '15px',
              opacity: 0.5
            }}
            onClick={() => handleOpenLightbox(imageUrl)}
          >
            View Full
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}

export default React.memo(NftCard);

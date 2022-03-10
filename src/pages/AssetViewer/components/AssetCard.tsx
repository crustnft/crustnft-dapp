import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Box, Button, Card, Stack } from '@mui/material';
import LightboxModal from 'components/LightboxModal';
import { useState } from 'react';
import { LineScalePulseOutRapid } from 'react-pure-loaders';
import { AssetAndOwnerType } from '../AssetViewer.types';

export default function AssetCard({ assetAndOwner }: { assetAndOwner: AssetAndOwnerType }) {
  const [loading, setLoading] = useState(true);
  const [openLightbox, setOpenLightbox] = useState(false);

  const handleOpenLightbox = (url: string) => {
    setOpenLightbox(true);
  };

  return (
    <Card>
      <Stack spacing={3} sx={{ p: 3, padding: '0px' }}>
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
            <Box
              component="img"
              alt="post media"
              src={assetAndOwner.imageUrl}
              onLoad={() => setLoading(false)}
              sx={{
                display: loading ? 'none' : 'block'
              }}
            />
            {loading ? (
              <></>
            ) : (
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
                onClick={() => handleOpenLightbox(assetAndOwner.imageUrl)}
              >
                View Full
              </Button>
            )}
            <LightboxModal
              images={[assetAndOwner.imageUrl]}
              mainSrc={assetAndOwner.imageUrl}
              photoIndex={0}
              setPhotoIndex={() => {}}
              isOpen={openLightbox}
              onCloseRequest={() => setOpenLightbox(false)}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%', display: loading ? 'flex' : 'none', mt: 5 }}
          >
            <LineScalePulseOutRapid color={'#637381'} loading={loading} />
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}

import { LoadingButton } from '@mui/lab';
import { Box, Dialog, DialogContent, Grid, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPublicUrlFromId } from 'utils/googleApisUtils';
import { useSelector } from '../../../redux/store';
import { normalizeAndMergeImages } from '../service';

export default function PreviewDialog({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [image, setImage] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { board } = useSelector((state) => state.image);

  const getRandomImage = async () => {
    setLoading(true);
    const layerOrder = board.layerOrder;
    const layers = board.layers;
    const images: string[] = [];
    for (let i = 0; i < layerOrder.length; i++) {
      const imageIds = layers[layerOrder[i]].imageIds;
      images.push(getPublicUrlFromId(imageIds[Math.floor(Math.random() * imageIds.length)]));
    }
    if (images.length > 0) {
      const randomImage = await normalizeAndMergeImages(images);
      setImage(randomImage);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open) {
      getRandomImage();
    }
  }, [open]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      scroll="paper"
    >
      <DialogContent dividers={true}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <Stack direction="column" alignItems="center" spacing={1}>
              <Typography variant="h5" sx={{ color: 'text.primary' }}>
                Preview NFT
              </Typography>
              <LoadingButton
                loading={loading}
                variant="contained"
                color="info"
                onClick={getRandomImage}
              >
                Random another
              </LoadingButton>
              <Box component="img" src={image} />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={7}>
            <Paper
              sx={{
                p: 3,
                width: 1,
                position: 'relative',
                border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
              }}
            >
              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Name
                  </Typography>
                  <Typography variant="subtitle2"> Collection Name</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Symbol
                  </Typography>
                  <Typography variant="subtitle2">Crustnft</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Standard
                  </Typography>
                  <Typography variant="subtitle2">ERC721</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Network
                  </Typography>
                  <Typography variant="subtitle2">Name</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Address
                  </Typography>
                  <Typography variant="subtitle2" sx={{ wordBreak: 'break-word' }}>
                    Account
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Features
                </Typography>

                <Stack direction="row" justifyContent="space-between"></Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

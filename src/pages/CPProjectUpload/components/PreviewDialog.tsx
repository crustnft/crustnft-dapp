import { Box, Button, Dialog, DialogContent, Grid, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { normalizeAndMergeImages } from '../service';
export default function PreviewDialog({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [image, setImage] = useState<any>();

  useEffect(() => {
    const loadImage = async () => {
      const back = await normalizeAndMergeImages(
        'https://cdn.pixabay.com/photo/2017/01/03/02/07/vine-1948358__340.png',
        [
          'https://static.remove.bg/remove-bg-web/581d704b6f77ec24f806185a708237a73ce0a356/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png',
          'https://storage.googleapis.com/stage-nft-generator-api-upload/006987c4-fdf1-45d1-ad5b-5c57170c45ba'
        ]
      );
      setImage(back);
    };

    loadImage();
  }, []);

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
        <Grid container>
          <Grid item xs={12} sm={5} spacing={3}>
            <Stack direction="column" alignItems="center" spacing={3}>
              <Typography variant="h5" sx={{ color: 'text.primary' }}>
                Preview NFT
              </Typography>
              <Box component="img" src={image} />
              <Button variant="contained" color="info">
                Random another
              </Button>
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

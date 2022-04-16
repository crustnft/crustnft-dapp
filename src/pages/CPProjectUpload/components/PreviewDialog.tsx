import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import mergeImages from 'merge-images';
import { startGenerateNftCollection } from 'clients/crustnft-explore-api/nft-collections';
import { MAX_ALLOWED_NFT } from 'constants/cryptopunkConfig';
import useAuth from 'hooks/useAuth';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicUrlFromId } from 'utils/googleApisUtils';
import useWeb3 from '../../../hooks/useWeb3';
import { useSelector } from '../../../redux/store';
import { getImageDimension } from '../service';

export default function PreviewDialog({
  open,
  setOpen,
  name,
  status,
  collectionCid,
  metadataCid
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  status: string;
  collectionCid: string;
  metadataCid: string;
}) {
  const { accessToken } = useAuth();
  const { account } = useWeb3();
  const [image, setImage] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [nbPhoto, setNbPhoto] = useState(0);
  const [nbLayer, setNbLayer] = useState(0);
  const [maxNft, setMaxNft] = useState(0);
  const { board } = useSelector((state) => state.image);
  const { id } = useParams();

  const getRandomImage = async () => {
    setLoading(true);
    const layerOrder = board.layerOrder;
    const layers = board.layers;
    const images: string[] = [];
    let _nbPhoto = 0;
    let _maxNft = 1;
    setNbLayer(layerOrder.length);

    for (let i = 0; i < layerOrder.length; i++) {
      const imageIds = layers[layerOrder[i]].imageIds;
      _nbPhoto += imageIds.length;
      _maxNft *= imageIds.length;
      const imageId = imageIds[Math.floor(Math.random() * imageIds.length)];
      images.push(getPublicUrlFromId(`${account?.toLocaleLowerCase()}/${imageId}`));
    }

    setMaxNft(_maxNft);
    setNbPhoto(_nbPhoto);
    if (images.length > 0) {
      const { width, height } = await getImageDimension(images[0]);
      const mergedImage = await mergeImages(images, {
        crossOrigin: 'anonymous',
        width,
        height
      });
      setImage(mergedImage);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open) {
      getRandomImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                border: (theme: any) => `solid 1px ${theme.palette.grey[500_32]} `
              }}
            >
              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Collection
                  </Typography>
                  <Typography variant="subtitle2"> {name}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Number of photos uploaded
                  </Typography>
                  <Typography variant="subtitle2">{nbPhoto}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Number of layers
                  </Typography>
                  <Typography variant="subtitle2">{nbLayer}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Max number of NFT
                  </Typography>
                  <Typography variant="subtitle2">{maxNft}</Typography>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Status
                  </Typography>

                  <Typography variant="subtitle2">{capitalize(status)}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Collection CID
                  </Typography>

                  <Typography variant="subtitle2" sx={{ wordBreak: 'break-word' }}>
                    {collectionCid}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Metadata CID
                  </Typography>

                  <Typography variant="subtitle2" sx={{ wordBreak: 'break-word' }}>
                    {metadataCid}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
            {(status === 'pending' || status === 'failed') && (
              <Button
                variant="contained"
                color="info"
                sx={{ mt: 3 }}
                onClick={() => {
                  startGenerateNftCollection(accessToken, {
                    id: id || '',
                    collectionSize: maxNft < MAX_ALLOWED_NFT ? maxNft : MAX_ALLOWED_NFT
                  });
                }}
              >
                Generate NFTs
              </Button>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

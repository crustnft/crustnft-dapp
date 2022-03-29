import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  Grid,
  Link,
  Paper,
  Stack,
  Switch,
  Typography
} from '@mui/material';
import { getContractByTxHash, publishCollection } from 'clients/crustnft-explore-api/contracts';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { getCollectionUrlByChainId } from 'utils/blockchainHandlers';
export default function DistributeStep({ txHash }: { txHash: string }) {
  const [publishChecked, setPublishChecked] = useState(true);
  const { accessToken } = useAuth();
  const [openDistributeDialog, setOpenDistributeDialog] = useState(false);
  const [contractAddress, setContractAddress] = useState('');
  const [chainId, setChainId] = useState(1);
  const [currencySymbol, setCurrencySymbol] = useState('ETH');

  useEffect(() => {
    if (txHash) {
      getContractByTxHash(txHash).then((res) => {
        setPublishChecked(res.published);
        setContractAddress(res.contractAddress);
        setChainId(res.chainId);
      });
    }
  }, [txHash]);

  const handlePublishChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublishChecked(event.target.checked);
    publishCollection(accessToken, txHash, event.target.checked);
  };

  return (
    <Stack>
      <Typography variant="overline" sx={{ color: 'text.secondary' }}>
        3. NFTs Distribution
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        Connect with trading platform and start selling your NFTs
      </Typography>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              p: 3,
              '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'background.neutral',
                border: '1px solid #15B2E5'
              }
            }}
            onClick={() => setOpenDistributeDialog(true)}
          >
            <Stack
              spacing={2}
              alignItems="center"
              direction={{ xs: 'column', md: 'row' }}
              sx={{
                width: 1,
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              <Icon icon="ci:share-outline" height="40" color="#637381" />

              <Box>
                <Typography gutterBottom variant="h5">
                  Distribute NFTs
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Distribute NFTs to your users
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openDistributeDialog}
        onClose={() => {
          setOpenDistributeDialog(false);
        }}
        scroll="paper"
      >
        <DialogContent dividers>
          <Card sx={{ p: 3, m: -3 }}>
            <Paper
              sx={{
                p: 3,

                width: 1,
                position: 'relative',
                border: (theme: any) => `solid 1px ${theme.palette.grey[500_32]}`
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Address
                  </Typography>

                  <Link href={getCollectionUrlByChainId(chainId, contractAddress)} target="_blank">
                    <Typography variant="subtitle2">{contractAddress}</Typography>
                  </Link>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Network
                  </Typography>

                  <Typography variant="subtitle2">{chainId}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    Publish on crustnft
                  </Typography>

                  <Switch size="small" checked={publishChecked} onChange={handlePublishChange} />
                </Stack>

                <Button variant="contained" color="info" size="small">
                  Minting page
                </Button>

                <Button variant="contained" color="info" size="small">
                  Register on Opensea
                </Button>
              </Stack>
            </Paper>
          </Card>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}

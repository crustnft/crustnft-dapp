import { Box, Card, Container, Grid, Paper, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { useEffect } from 'react';
import Page from '../../components/Page';
import CallAction from './components/CallAction';
import MyCollections from './components/MyCollections';

export default function MyNFT() {
  const { signInWallet, active } = useWeb3();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated && active) {
      signInWallet();
    }
  }, [isAuthenticated, signInWallet, active]);
  return (
    <Page title="My NFTs">
      <Container maxWidth="lg">
        <Box sx={{ display: active && isAuthenticated ? 'block' : 'none' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CallAction />
            </Grid>
          </Grid>
          <Box>
            <MyCollections />
          </Box>
        </Box>
        <Card sx={{ p: 3, display: active && isAuthenticated ? 'none' : 'block' }}>
          <Typography
            variant="overline"
            sx={{
              mb: 3,

              color: 'text.secondary'
            }}
          >
            Select network & Connect wallet
          </Typography>

          <Paper
            sx={{
              p: 3,
              mt: 4,
              mb: 3,
              width: 1,
              border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
            }}
          >
            <Typography variant="subtitle2">
              You need to connect a wallet and sign a message view your collection
            </Typography>
          </Paper>
        </Card>
      </Container>
    </Page>
  );
}

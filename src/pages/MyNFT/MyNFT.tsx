import { Box, Container, Grid } from '@mui/material';
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CallAction />
          </Grid>
        </Grid>
        <Box>
          <MyCollections />
        </Box>
      </Container>
    </Page>
  );
}

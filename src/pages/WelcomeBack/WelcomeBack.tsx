import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Page from '../../components/Page';
import CallAction from './components/CallAction';
import MyCollections from './components/MyCollections';

export default function WelcomeBack() {
  const { signInWallet, active, pending } = useWeb3();
  const { isAuthenticated } = useAuth();
  const { activate } = useWeb3();
  const navigate = useNavigate();

  const handleConnectWallet = async () => {
    activate();
  };

  useEffect(() => {
    if (!isAuthenticated && !pending) {
      signInWallet();
    } else if (active) {
      navigate('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, signInWallet, pending, active]);

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

        <Stack sx={{ alignItems: 'center', display: active && isAuthenticated ? 'none' : 'flex' }}>
          <Typography
            variant="h3"
            color="text.header"
            sx={{
              marginTop: '60px',
              p: '11px 22px'
            }}
          >
            Hi, Welcome back!
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              marginTop: '10px'
            }}
          >
            No account creation needed to start creating your collection. Try now!
          </Typography>

          <Button
            variant="contained"
            sx={{
              fontWeight: '700',
              fontSize: '18px',
              lineHeight: '32px',
              height: '50px',
              mt: '30px',
              p: '11px 22px',
              textTransform: 'none'
            }}
            onClick={handleConnectWallet}
          >
            Login with a wallet
          </Button>
          <Box
            component="img"
            src="./static/mock-images/other/welcomeBackPageImage.png"
            alt=""
            sx={{ mt: '60px', height: '400px' }}
          />
        </Stack>
      </Container>
    </Page>
  );
}

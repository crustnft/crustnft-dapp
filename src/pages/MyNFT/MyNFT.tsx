import { Box, Button, Container, Grid } from '@mui/material';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import Page from '../../components/Page';
import AccountBalanceCard from './components/AccountBalanceCard';
import CallAction from './components/CallAction';
import MyCollections from './components/MyCollections';

export default function MyNFT() {
  const { active, account, library, onboard } = useWeb3();

  const { challengeLogin, login } = useAuth();
  return (
    <Page title="My NFTs">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <CallAction />
          </Grid>
          <Grid item xs={12} md={5}>
            <AccountBalanceCard />
          </Grid>
        </Grid>
        <Button
          onClick={() => {
            challengeLogin('0xe77E4cCa55e77bf2cbd4833c5982363217e1B695').then((res: string) => {
              console.log(res.split('\n').at(-1));
            });
          }}
        >
          Click to console
        </Button>
        <Button
          onClick={() => {
            const signer = library?.getSigner(account);
            signer?.signMessage('hello').then((res: string) => {
              console.log(res);
            });
          }}
        >
          Sign
        </Button>
        <Button
          onClick={() => {
            login('0xe77E4cCa55e77bf2cbd4833c5982363217e1B695', 'signe');
          }}
        >
          Login
        </Button>
        <Box>
          <MyCollections />
        </Box>
      </Container>
    </Page>
  );
}

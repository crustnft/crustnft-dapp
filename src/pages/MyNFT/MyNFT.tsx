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
          onClick={async () => {
            const nouce = await challengeLogin('0xe77E4cCa55e77bf2cbd4833c5982363217e1B695');
            console.log('nouce', nouce);
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
        <Button
          onClick={async () => {
            try {
              if (!account) return;

              const nounce = await challengeLogin(account);
              console.log('nounce', nounce);

              if (!nounce) return;
              const signer = library?.getSigner(account);
              console.log('signature');

              const signature = await signer?.signMessage(nounce);
              if (!signature) return;
              const accessToken = login(account, signature);
              console.log(accessToken);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          All in One Login
        </Button>
        <Box>
          <MyCollections />
        </Box>
      </Container>
    </Page>
  );
}

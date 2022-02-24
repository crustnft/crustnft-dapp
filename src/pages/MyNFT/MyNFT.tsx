import { Box, Container, Grid } from '@mui/material';
import Page from '../../components/Page';
import AccountBalanceCard from './components/AccountBalanceCard';
import CallAction from './components/CallAction';
import MyCollections from './components/MyCollections';

export default function MyNFT() {
  return (
    <Page title="My NFTs">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <CallAction />
          </Grid>
          <Grid item xs={5}>
            <AccountBalanceCard />
          </Grid>
        </Grid>
        <Box>
          <MyCollections />
        </Box>
      </Container>
    </Page>
  );
}

import { Box, Container, Grid } from '@mui/material';
import Page from '../../components/Page';
import CallAction from './components/CallAction';
import MyCollections from './components/MyCollections';

export default function MyNFT() {
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

import { Box, Button, Container, Grid } from '@mui/material';
import useAuth from 'hooks/useAuth';
import Page from '../../components/Page';
import CallAction from './components/CallAction';
import MyCollections from './components/MyCollections';

export default function MyNFT() {
  const { accessToken } = useAuth();
  return (
    <Page title="My NFTs">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CallAction />
          </Grid>
        </Grid>
        <Button
          onClick={() => {
            //generateMedia(accessToken);
          }}
        >
          Click to get media link
        </Button>
        <Box>
          <MyCollections />
        </Box>
      </Container>
    </Page>
  );
}

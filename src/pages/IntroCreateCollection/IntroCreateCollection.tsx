import { Card, Container, Grid, Link, Stack, Typography } from '@mui/material';
import MCard from 'components/@material-extend/MCard';
import image1 from '../../assets/images/create10K.png';
import image2 from '../../assets/images/createMultiple.png';
import Page from '../../components/Page';
import Introduction from './components/Introduction';

export default function LearnMore() {
  return (
    <Page title="Create your collection in minutes">
      <Container maxWidth={'lg'}>
        <Introduction />
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Link href="#/my-collections" underline="none">
              <MCard
                hoverEffect
                sx={{ backgroundColor: 'background.neutral', p: 2, height: '100%' }}
              >
                <Card
                  sx={{
                    backgroundColor: 'background.paper',
                    aspectRatio: 'auto'
                  }}
                >
                  <img
                    src={image1}
                    alt="create 10k collection"
                    style={{ width: '100%', objectFit: 'fill' }}
                  />
                </Card>
                <Stack alignItems="center" sx={{ pt: 2 }} spacing={2}>
                  <Typography variant="h6" color="text.primary">
                    Create 10K collection
                  </Typography>
                  <Typography variant="body1" color="text.tertiary" align="center">
                    Upload different pieces of your collection and let us generate a complete
                    collection
                  </Typography>
                </Stack>
              </MCard>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link href="#/mint-exp-nft" underline="none">
              <MCard
                hoverEffect
                sx={{ backgroundColor: 'background.neutral', p: 2, height: '100%' }}
              >
                <Card
                  sx={{
                    backgroundColor: 'background.paper',
                    aspectRatio: 'auto'
                  }}
                >
                  <img
                    src={image2}
                    alt="create multiple collection"
                    style={{ width: '100%', objectFit: 'fill' }}
                  />
                </Card>
                <Stack alignItems="center" sx={{ pt: 2 }} spacing={2}>
                  <Typography variant="h6" color="text.primary">
                    Create Multiple
                  </Typography>
                  <Typography variant="body1" color="text.tertiary" align="center">
                    Create a collection that can be expanded to include more arts at any time
                  </Typography>
                </Stack>
              </MCard>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

import { Icon } from '@iconify/react';
import { Button, Card, Container, Grid, Link, Stack, Typography } from '@mui/material';
import Page from '../../components/Page';
import Introduction from './components/Introduction';
export default function LearnMore() {
  return (
    <Page title="Create your collection in minutes">
      <Container maxWidth={'lg'}>
        <Introduction />
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: 'background.neutral', p: 2 }}>
              <Card
                sx={{
                  backgroundColor: 'background.paper',
                  p: { xs: 5, md: 8 },
                  aspectRatio: '1 / 1'
                }}
              >
                <Stack sx={{ color: 'text.secondary' }}>
                  {new Array(2).fill(0).map((_, i) => (
                    <Stack key={i} direction="row">
                      <Icon icon="akar-icons:image" width="100%" />
                      <Icon icon="akar-icons:image" width="100%" />
                    </Stack>
                  ))}
                </Stack>
              </Card>
              <Stack alignItems="center" sx={{ pt: 2 }} spacing={2}>
                <Link href="#/tenK-collection">
                  <Button variant="outlined" sx={{ borderRadius: '20px', color: 'text.primary' }}>
                    Create 10K collection
                  </Button>
                </Link>
                <Typography variant="body2" color="text.secondary" align="center">
                  Upload different pieces of your collection and let us generate a complete
                  collection
                </Typography>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: 'background.neutral', p: 2 }}>
              <Card
                sx={{
                  backgroundColor: 'background.paper',
                  p: 8,
                  aspectRatio: '1 / 1'
                }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ color: 'text.secondary', height: '100%' }}
                >
                  <Icon icon="bx:image-add" width="50%" />
                </Stack>
              </Card>
              <Stack alignItems="center" sx={{ pt: 2 }} spacing={2}>
                <Link href="#/create-expandable-collection">
                  <Button variant="outlined" sx={{ borderRadius: '20px', color: 'text.primary' }}>
                    Create expandable collection
                  </Button>
                </Link>
                <Typography variant="body2" color="text.secondary" align="center">
                  Create a collection that can be expanded to include more arts at any time.
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
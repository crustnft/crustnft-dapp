import { Avatar, Card, Container, Stack, Typography } from '@mui/material';
import Iconify from 'components/Iconify';
import Page from '../../components/Page';

export default function CPProjectDetails() {
  return (
    <Page title="Crypto Punks Projects">
      <Container maxWidth="lg">
        <Card sx={{ p: 3 }}>Hello</Card>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack>
            <Avatar>
              <Iconify icon="ep:menu" />
            </Avatar>
          </Stack>
          <Stack>
            <Typography variant="h5" sx={{ color: '#637381' }}>
              PROJECTS
            </Typography>

            <Typography sx={{ color: '#919EAB' }}>
              You have to connect to a wallet to see your projects.
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 5 }}>
          <Stack>
            <Avatar>
              <Iconify icon="ep:menu" />
            </Avatar>
          </Stack>
          <Stack>
            <Typography variant="h5" sx={{ color: '#637381' }}>
              COLLECTIONS
            </Typography>

            <Typography sx={{ color: '#919EAB' }}>You have no collections.</Typography>
          </Stack>
        </Stack>
      </Container>
    </Page>
  );
}

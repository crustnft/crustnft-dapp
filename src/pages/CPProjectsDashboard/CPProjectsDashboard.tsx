import { Avatar, Container, Grid, Stack, Typography } from '@mui/material';
import Iconify from 'components/Iconify';
import Page from '../../components/Page';
import Introduction from './components/Introduction';
import ProjectCard from './components/ProjectCard';
import ProjectCardEmpty from './components/ProjectCardEmpty';

export default function CPProjectsDashboard() {
  return (
    <Page title="Crypto Punks Projects">
      <Container maxWidth="lg">
        <Introduction />
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack>
            <Avatar>
              <Iconify icon="ep:menu" />
            </Avatar>
          </Stack>
          <Stack>
            <Typography variant="h5" sx={{ color: 'text.primary' }}>
              PROJECTS
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>
              You have to connect to a wallet to see your projects.
            </Typography>
          </Stack>
        </Stack>
        <Grid container sx={{ pt: 2 }} spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ProjectCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ProjectCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ProjectCardEmpty />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

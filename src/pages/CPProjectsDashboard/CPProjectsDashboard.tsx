import { Avatar, Container, Grid, Stack, Typography } from '@mui/material';
import Iconify from 'components/Iconify';
import useLocalStorage from 'hooks/useLocalStorage';
import { createContext } from 'react';
import Page from '../../components/Page';
import Introduction from './components/Introduction';
import ProjectCard from './components/ProjectCard';
import ProjectCardEmpty from './components/ProjectCardEmpty';

type ICPProject = {
  name: string;
  description?: string;
  createdAt: number;
};

const initialLocalStorage: ICPProject[] = [];

const initProjects = { CPProjects: [], setCPProjects: (newValue: ICPProject[]) => {} };
export const CPProjectsContext = createContext(initProjects);

export default function CPProjectsDashboard() {
  const { value: CPProjects, setValueInLocalStorage: setCPProjects } = useLocalStorage(
    'CPProjects',
    initialLocalStorage
  );

  return (
    <Page title="Crypto Punks Projects">
      <Container maxWidth="lg">
        <CPProjectsContext.Provider value={{ CPProjects, setCPProjects }}>
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
        </CPProjectsContext.Provider>
      </Container>
    </Page>
  );
}

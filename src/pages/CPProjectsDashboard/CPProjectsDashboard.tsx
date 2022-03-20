import { Avatar, Container, Grid, Stack, Typography } from '@mui/material';
import { getCollections } from 'clients/crustnft-explore-api/nft-collections';
import { NftCollectionDto } from 'clients/crustnft-explore-api/types';
import Iconify from 'components/Iconify';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { createContext, useCallback, useEffect, useState } from 'react';
import Page from '../../components/Page';
import Introduction from './components/Introduction';
import ProjectCard from './components/ProjectCard';
import ProjectCardEmpty from './components/ProjectCardEmpty';

const initProjects = { getProjects: () => {} };
export const CPProjectsContext = createContext(initProjects);

export default function CPProjectsDashboard() {
  const { isAuthenticated, accessToken } = useAuth();
  const { signInWallet } = useWeb3();

  const [projectsInfo, setProjectsInfo] = useState<NftCollectionDto[]>([]);

  const getProjects = useCallback(async () => {
    const collections = await getCollections(accessToken);
    if (!collections) return;
    setProjectsInfo(collections);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    getProjects();
  }, [isAuthenticated, accessToken, getProjects]);

  useEffect(() => {
    if (!isAuthenticated) {
      signInWallet();
    }
  }, [signInWallet]);

  return (
    <Page title="Crypto Punks Projects">
      <Container maxWidth="lg">
        <CPProjectsContext.Provider value={{ getProjects }}>
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

              <Typography
                sx={{ color: 'text.secondary', display: isAuthenticated ? 'none' : 'block' }}
              >
                You have to connect to a wallet and sign a message to see your projects.
              </Typography>
            </Stack>
          </Stack>
          <Grid container sx={{ pt: 2 }} spacing={2}>
            {projectsInfo.map((project) => (
              <Grid key={project.id} item xs={12} sm={6} md={4} lg={3}>
                <ProjectCard project={project} />
              </Grid>
            ))}

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ProjectCardEmpty />
            </Grid>
          </Grid>
        </CPProjectsContext.Provider>
      </Container>
    </Page>
  );
}

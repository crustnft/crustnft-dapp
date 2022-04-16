import { Container, Grid, Stack, Typography } from '@mui/material';
import { getCollections } from 'clients/crustnft-explore-api/nft-collections';
import { NftCollectionDto } from 'clients/crustnft-explore-api/types';
import useAuth from 'hooks/useAuth';
import useWeb3 from 'hooks/useWeb3';
import { createContext, useCallback, useEffect, useState } from 'react';
import Page from '../../components/Page';
import ProjectCard from './components/ProjectCard';
import ProjectCardEmpty from './components/ProjectCardEmpty';

const initProjects = { getProjects: () => {} };
export const CPProjectsContext = createContext(initProjects);

export default function CollectionDashboard() {
  const { isAuthenticated, accessToken } = useAuth();
  const { signInWallet, pending } = useWeb3();

  const [tenKCollectionsInfo, setTenKCollectionsInfo] = useState<NftCollectionDto[]>([]);
  const [expandableCollectionsInfo, setExpandableCollectionsInfo] = useState<any[]>([]);

  const getProjects = useCallback(async () => {
    const collections = await getCollections(accessToken);
    if (!collections) return;
    setTenKCollectionsInfo(collections);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    getProjects();
  }, [isAuthenticated, accessToken, getProjects]);

  useEffect(() => {
    if (!isAuthenticated && !pending) {
      signInWallet();
    }
  }, [isAuthenticated, signInWallet, pending]);

  return (
    <Page title="Crypto Punks Collection">
      <Container maxWidth="lg">
        <CPProjectsContext.Provider value={{ getProjects }}>
          <Stack>
            <Typography variant="h5" sx={{ color: 'text.primary' }}>
              CRYPTOPUNK COLLECTIONS
            </Typography>

            <Typography
              sx={{ color: 'text.secondary', display: isAuthenticated ? 'none' : 'block' }}
            >
              This version is reserved for wallet with beta access. You can connect and sign with
              the registered wallet to see your collections.
            </Typography>
          </Stack>

          <Grid container sx={{ pt: 2, display: isAuthenticated ? 'flex' : 'none' }} spacing={2}>
            {tenKCollectionsInfo.map((project) => (
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

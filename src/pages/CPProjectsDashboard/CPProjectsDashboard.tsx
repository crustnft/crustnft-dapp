import { Avatar, Button, Container, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import Iconify from 'components/Iconify';
import { getContract } from 'constants/contract';
import useAuth from 'hooks/useAuth';
import useLocalStorage from 'hooks/useLocalStorage';
import useWeb3 from 'hooks/useWeb3';
import { createContext, useEffect, useState } from 'react';
import { compileSmartContract } from 'services/createSmartContract/evmCompatible/';
import Page from '../../components/Page';
import Introduction from './components/Introduction';
import ProjectCard from './components/ProjectCard';
import ProjectCardEmpty from './components/ProjectCardEmpty';
import { TProject } from './CPProjectsDashboard.type';

const initProjects = { CPProjects: [], setCPProjects: (newValue: string[]) => {} };
export const CPProjectsContext = createContext(initProjects);

const initialLocalStorage: string[] = [];

export default function CPProjectsDashboard() {
  const { isAuthenticated, accessToken } = useAuth();
  const { signInWallet } = useWeb3();

  const { value: CPProjects, setValueInLocalStorage: setCPProjects } = useLocalStorage(
    'CPProjects',
    initialLocalStorage
  );

  const [projectsInfo, setProjectsInfo] = useState<TProject[]>([]);

  useEffect(() => {
    //FIXME: just a quick workaround
    setProjectsInfo((prevProjectsInfo) => []);
    for (let i = 0; i < CPProjects.length; i++) {
      const response = axios
        .get(
          `https://asia-east2-crustnft.cloudfunctions.net/stage-nft-generator-api/api/v1/ntf-collections/${CPProjects[i]}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        .then((res) => {
          console.log(res);
          setProjectsInfo((prevProjectsInfo) => [...prevProjectsInfo, res.data.data]);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [CPProjects]);

  useEffect(() => {
    if (!isAuthenticated) {
      signInWallet();
    }
  }, [isAuthenticated, signInWallet]);

  return (
    <Page title="Crypto Punks Projects">
      <Container maxWidth="lg">
        <CPProjectsContext.Provider value={{ CPProjects, setCPProjects }}>
          <Introduction />
          <Button
            onClick={async () => {
              const compileResult = await compileSmartContract(getContract());
              console.log(compileResult);
            }}
          >
            Compile to see
          </Button>
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

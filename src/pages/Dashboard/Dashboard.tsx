import { Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Section from 'components/Section';
import useWeb3 from 'hooks/useWeb3';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import CollectionsSection from './components/CollectionsSection';
import CreateNewCollection from './components/CreateNewCollection';
import StatSection from './components/StatSection';
import UserAccount from './components/UserAccount';

const Dashboard = () => {
  const { active } = useWeb3();
  const navigate = useNavigate();

  useEffect(() => {
    if (!active) {
      navigate('/wallet');
    }
  }, [active, navigate]);

  return (
    <Stack>
      <Typography variant="h3" color="text.header">
        Dashboard
      </Typography>

      <Grid container columnSpacing="50px">
        <Grid item xs={12} md={9}>
          <Section title="Stat">
            <StatSection />
          </Section>
          <Section title="Create new collection">
            <CreateNewCollection />
          </Section>
        </Grid>
        <Grid item xs={12} md={3}>
          <Section title="Account">
            <UserAccount />
          </Section>
        </Grid>
      </Grid>

      <Section title="Collections">
        <CollectionsSection />
      </Section>
    </Stack>
  );
};

export default Dashboard;

import { Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import CollectionsSection from './components/CollectionsSection';
import CreateNewCollection from './components/CreateNewCollection';
import StatSection from './components/StatSection';
import UserAccount from './components/UserAccount';

const Section = ({ title, children }: { title: string; children?: ReactNode }) => {
  return (
    <>
      <Typography variant="h5" color="text.primary" sx={{ mt: '40px', mb: '25px' }}>
        {title}
      </Typography>
      {children}
    </>
  );
};

const Dashboard = () => {
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

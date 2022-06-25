import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import StatSectionHeader from './components/StatSection';

const Dashboard = () => {
  return (
    <Stack>
      <Typography variant="h3" color="secondary">
        Dashboard
      </Typography>
      <Stack>
        <Typography variant="h5" color={(theme) => theme.palette.grey[900]} sx={{ mt: '40px' }}>
          Stat
        </Typography>

        <Stack>
          <StatSectionHeader />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard;

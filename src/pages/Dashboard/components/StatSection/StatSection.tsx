import { Stack } from '@mui/material';
import { COLLECTION_STAT } from 'pages/Dashboard/constants';
import StatSectionHeader from './StatSectionHeader';

const StatSection = () => {
  return (
    <Stack>
      <StatSectionHeader {...COLLECTION_STAT} />
    </Stack>
  );
};

export default StatSection;

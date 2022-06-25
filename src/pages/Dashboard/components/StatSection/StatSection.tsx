import { Stack } from '@mui/material';
import { COLLECTION_STAT } from 'pages/Dashboard/constants';
import { StatStatusBody } from './StatSectionBody';
import StatSectionHeader from './StatSectionHeader';

const StatSection = () => {
  return (
    <Stack>
      <StatSectionHeader {...COLLECTION_STAT} />
      <StatStatusBody />
    </Stack>
  );
};

export default StatSection;

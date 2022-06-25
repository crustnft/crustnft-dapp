import { Stack } from '@mui/material';
import { COLLECTION_REVENUE, COLLECTION_STAT } from 'pages/Dashboard/constants';
import { StatRevenueBody, StatStatusBody } from './StatSectionBody';
import StatSectionHeader from './StatSectionHeader';

const StatSection = () => {
  return (
    <Stack>
      <StatSectionHeader {...COLLECTION_STAT} />
      <StatStatusBody />
      <StatSectionHeader {...COLLECTION_REVENUE} />
      <StatRevenueBody />
    </Stack>
  );
};

export default StatSection;

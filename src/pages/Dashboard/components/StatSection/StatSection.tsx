import { Stack } from '@mui/material';
import { COLLECTION_REVENUE, COLLECTION_STAT } from 'pages/Dashboard/constants';
import SectionHeader from '../SectionHeader';
import { StatRevenueBody, StatStatusBody } from './StatSectionBody';

const StatSection = () => {
  return (
    <Stack>
      <SectionHeader {...COLLECTION_STAT} />
      <StatStatusBody />
      <SectionHeader {...COLLECTION_REVENUE} />
      <StatRevenueBody />
    </Stack>
  );
};

export default StatSection;

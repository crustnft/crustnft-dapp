import { Stack, Typography } from '@mui/material';
import StatSectionMenu from './StatSection/StatSectionMenu';

interface SectionHeaderProps {
  title: string;
  menuItems: string[];
}

const SectionHeader = ({ title, menuItems }: SectionHeaderProps) => {
  return (
    <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', mb: '20px' }}>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {title}
      </Typography>
      <StatSectionMenu menuItems={menuItems} />
    </Stack>
  );
};

export default SectionHeader;

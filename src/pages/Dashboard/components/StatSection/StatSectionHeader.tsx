import { Stack, Typography } from '@mui/material';
import StatSectionMenu from './StatSectionMenu';

interface StatSectionHeaderProps {
  title: string;
  menuItems: string[];
}

const StatSectionHeader = ({ title, menuItems }: StatSectionHeaderProps) => {
  return (
    <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Typography
        variant="subtitle1"
        color={(theme) => theme.palette.grey[700]}
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

export default StatSectionHeader;

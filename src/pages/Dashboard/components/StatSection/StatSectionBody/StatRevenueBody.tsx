import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';

interface CollectionBtnProps {
  title: string;
  total: number;
  isSelected: boolean;
  onClick: () => void;
}

const COLLECTIONS = ['Testnet collection', 'Mainnet collection'];
const REVENUE_INFO = [
  {
    title: 'Mint revenue',
    total: '5 ETH'
  },
  {
    title: 'Trade revenue',
    total: '3 ETH'
  },
  {
    title: 'Total revenue',
    total: '8 ETH'
  }
];

const CollectionBtn = ({ title, total, isSelected, onClick }: CollectionBtnProps) => {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '2px solid',
          borderRadius: '12px',
          cursor: 'pointer',
          gap: '6px',
          padding: '10px 25px'
        },
        isSelected
          ? {
              borderColor: 'accent.main',
              backgroundColor: 'accent.lighter',
              '& >.MuiTypography-root:first-of-type': {
                color: 'grey.900'
              }
            }
          : {
              borderColor: 'grey.300'
            }
      ]}
      onClick={onClick}
    >
      <Typography variant="subtitle2" color="text.primary">
        {title}
      </Typography>
      <Typography variant="h6" color="accent.dark" sx={{ display: 'flex', alignItems: 'baseline' }}>
        {total}
        <Typography
          variant="caption"
          color="accent.dark"
          sx={{ ml: '3px', fontSize: '14px', fontWeight: 600, lineHeight: '22px' }}
        >
          collections
        </Typography>
      </Typography>
    </Box>
  );
};

const RevenueElement = ({ title, total }: { title: string; total: string }) => {
  return (
    <Box sx={{ flex: 1, height: '100%', borderRadius: '12px', backgroundColor: 'grey.100' }}>
      <Stack sx={{ alignItems: 'center', p: '55px 35px', gap: '10px' }}>
        <Typography variant="subtitle1" color="grey.700">
          {title}
        </Typography>
        <Typography variant="h6" color="secondary">
          {total}
        </Typography>
      </Stack>
    </Box>
  );
};

const StatRevenueBody = () => {
  const [selected, setSelected] = useState(COLLECTIONS[0]);
  return (
    <Stack sx={{ flexDirection: 'row', gap: '5%' }}>
      <Stack sx={{ flex: 1 }}>
        <Stack sx={{ gap: '15px' }}>
          {COLLECTIONS.map((collection, index) => (
            <CollectionBtn
              key={index}
              title={collection}
              total={5}
              isSelected={selected === collection}
              onClick={() => setSelected(collection)}
            />
          ))}
        </Stack>
      </Stack>
      {REVENUE_INFO.map((info, index) => (
        <RevenueElement key={index} title={info.title} total={info.total} />
      ))}
    </Stack>
  );
};

export default StatRevenueBody;

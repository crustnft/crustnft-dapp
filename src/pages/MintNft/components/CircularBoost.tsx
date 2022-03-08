import { useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Box, Stack, Typography } from '../../../components/@c-components';
import type { BoostProps } from '../MintNft.types';

export default function StatNumber({ boostType, displayType, value }: BoostProps) {
  const [max, setMax] = useState(0);

  return (
    <Box sx={{ width: '100px' }}>
      <CircularProgressbar
        value={value}
        text={`${value}${displayType === 'boost_percentage' ? '%' : ''}`}
        styles={buildStyles({
          textSize: '16px',
          pathTransitionDuration: 0.5,
          pathColor: '#1A90FF',
          textColor: '#212B36'
        })}
      />
      <Stack alignItems="center">
        <Typography variant="h6">{boostType}</Typography>
      </Stack>
    </Box>
  );
}

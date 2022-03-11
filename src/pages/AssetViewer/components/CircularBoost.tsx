import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import type { BoostProps } from '../AssetViewer.types';

export default function StatNumber({ boostType, displayType, value }: BoostProps) {
  const [max, setMax] = useState(0);
  const theme = useTheme();
  const TEXT_COLOR = theme.palette.text.primary;
  console.log(TEXT_COLOR);

  return (
    <Box sx={{ width: '100px' }}>
      <CircularProgressbar
        value={value}
        text={`${value}${displayType === 'boost_percentage' ? '%' : ''}`}
        styles={buildStyles({
          textSize: '16px',
          pathTransitionDuration: 0.5,
          pathColor: '#1A90FF',
          textColor: TEXT_COLOR
        })}
      />
      <Stack alignItems="center">
        <Typography variant="h6">{boostType}</Typography>
      </Stack>
    </Box>
  );
}

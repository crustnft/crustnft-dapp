import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type ProgressItemProps = {
  progress: {
    label: string;
    max: number;
    value: number;
  };
};

export default function StatNumber({ progress }: ProgressItemProps) {
  const [value, setValue] = useState(0);
  const [max, setMax] = useState(0);
  const percentage = 66;

  useEffect(() => {
    setValue(progress.value < 0 ? 0 : progress.value);
    setMax(progress.max < progress.value ? progress.value : progress.max);
  }, [progress]);

  return (
    <Box sx={{ width: '100px' }}>
      <CircularProgressbar
        value={percentage}
        text={`+${percentage}%`}
        styles={buildStyles({
          textSize: '16px',
          pathTransitionDuration: 0.5,
          pathColor: '#1A90FF',
          textColor: '#212B36'
        })}
      />
    </Box>
  );
}

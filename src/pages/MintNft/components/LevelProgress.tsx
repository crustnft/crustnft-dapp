import { LinearProgress, Stack, Typography } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

type ProgressItemProps = {
  progress: {
    label: string;
    max: number;
    value: number;
  };
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'
  }
}));

export default function ProgressItem({ progress }: ProgressItemProps) {
  const [value, setValue] = useState(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    setValue(progress.value < 0 ? 0 : progress.value);
    setMax(progress.max < progress.value ? progress.value : progress.max);
  }, [progress]);

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>
        <Typography variant="subtitle2">{value} of&nbsp;</Typography>
        <Typography variant="subtitle2">{max}</Typography>
      </Stack>

      <BorderLinearProgress
        variant="determinate"
        value={Math.floor((value / max) * 100)}
        color={'info'}
      />
    </Stack>
  );
}

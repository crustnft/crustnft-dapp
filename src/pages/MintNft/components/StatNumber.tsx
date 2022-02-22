import { Card, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    setValue(progress.value < 0 ? 0 : progress.value);
    setMax(progress.max < progress.value ? progress.value : progress.max);
  }, [progress]);

  return (
    <Stack spacing={1}>
      <Card
        sx={{ p: 1, borderRadius: 1, backgroundColor: '#F4F6F8', borderColor: '#15B2E5' }}
        variant="outlined"
      >
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
            {progress.label}
          </Typography>
          <Typography variant="subtitle2">{value} of&nbsp;</Typography>
          <Typography variant="subtitle2">{max}</Typography>
        </Stack>
      </Card>
    </Stack>
  );
}

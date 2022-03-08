import { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { LinearProgress, Stack, Typography } from '../../../components/@c-components';
import type { LevelProps } from '../AssetViewer.types';

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

export default function ProgressItem({ levelType, max, value }: LevelProps) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {levelType}
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

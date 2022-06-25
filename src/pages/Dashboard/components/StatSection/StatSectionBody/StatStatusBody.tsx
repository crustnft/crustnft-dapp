import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FloatingBalloon } from 'assets/icons/customIcons';

const STAGES = [
  { title: 'Setup in progress', color: 'tertiary.light' },
  { title: 'Deployed', color: 'tertiary.neutral' },
  { title: 'Mint in progress', color: 'tertiary.main' },
  { title: 'Mint complete', color: 'tertiary.dark' }
];

// TODO API
const apiValues = [12, 121, 15, 63];

interface StageProps {
  backgroundColor: string;
  title: string;
  value: number;
}

const Stage = ({ title, backgroundColor, value }: StageProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
      <Box
        sx={{
          height: '6px',
          width: '100%',
          mt: '60px',
          borderRadius: '15px',

          // eslint-disable-next-line no-eval
          backgroundColor: eval(`(theme) => theme.palette.${backgroundColor}`),
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            mt: '10px',
            ml: '50%',
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          <FloatingBalloon />
        </Box>
        <Typography
          variant="button.medium"
          color="secondary"
          sx={{
            position: 'absolute',
            fontSize: '14px',
            fontWeight: 700,
            lineHeight: '24px',
            mt: '-8px',
            ml: '50%',
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          {value}
        </Typography>
      </Box>
      <Typography
        variant="button.medium"
        color="grey.600"
        sx={{
          mt: '10px',
          fontSize: '14px',
          fontWeight: 700,
          lineHeight: '24px'
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

const StatStatusBody = () => {
  return (
    <Stack sx={{ flexDirection: 'row', gap: '5%' }}>
      {STAGES.map((stage, index) => (
        <Stage
          key={index}
          title={stage.title}
          backgroundColor={stage.color}
          value={apiValues[index]}
        />
      ))}
    </Stack>
  );
};

export default StatStatusBody;

import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from './@c-components';

export default function Logo({ sx }: BoxProps) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{ height: 25, ...sx }}
      component="img"
      src={mdUp ? './static/logo/v1/long-logo-black.png' : './static/logo/v1/icon-black.png'}
    />
  );
}

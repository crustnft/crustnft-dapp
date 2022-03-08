// icons
import { Icon, IconifyIcon } from '@iconify/react';
import { SxProps } from '@mui/system';
// @mui
import { Box, BoxProps } from './@c-components';
// ----------------------------------------------------------------------

interface Props extends BoxProps {
  sx?: SxProps;
  icon: IconifyIcon | string;
  rotate?: number;
}

export default function Iconify({ icon, sx, rotate = 0, ...other }: Props) {
  return <Box component={Icon} icon={icon} rotate={rotate} sx={{ ...sx }} {...other} />;
}

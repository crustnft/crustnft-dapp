import {
  IconButton,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
  TypographyProps
} from '@mui/material';
import React from 'react';
import { pxToRem } from 'utils/getFontValue';
import IconHelpCircle from '../icons/IconHelpCircle';
export type CrustLabelProps = TypographyProps & {
  helpText?: TooltipProps['title'];
};
const HelpTextTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => {
  const bg =
    theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white;
  const fg =
    theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white;
  return {
    [`& .${tooltipClasses.arrow}`]: {
      color: bg
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: bg,
      color: fg
    }
  };
});

const CrustLabel = ({ children, helpText, sx, ...rest }: CrustLabelProps) => (
  <>
    <Typography variant="subtitle1" sx={{ marginBottom: pxToRem(15), ...sx }} {...rest}>
      {children}
      {helpText ? (
        <HelpTextTooltip title={helpText} placement="top">
          <IconButton>
            <IconHelpCircle />
          </IconButton>
        </HelpTextTooltip>
      ) : null}
    </Typography>
  </>
);
export default React.memo(CrustLabel);

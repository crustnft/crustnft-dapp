import { Button as MatButton, ButtonProps, styled, Theme, useTheme } from '@mui/material';
import React from 'react';
export type CrustButtonProps = Omit<Omit<Omit<ButtonProps, 'color'>, 'size'>, 'variant'> & {
  size?: ButtonProps['size'] | 'extraLarge';
  color?: ButtonProps['color'] | 'default';
  variant?: ButtonProps['variant'] | 'fab';
};
export const crustButtonStylePropsOverride = (
  props: CrustButtonProps,
  theme: Theme
): { bakedProps: ButtonProps; Button: typeof Button } => {
  let color: CrustButtonProps['color'] = props.color;
  let size: CrustButtonProps['size'] = props.size;
  let variant: CrustButtonProps['variant'] = props.variant;
  let sx = props.sx;
  let Button = MatButton;

  if (size === 'extraLarge') {
    size = undefined;
    Button = styled(MatButton)({
      ...theme.typography.buttonXl!
    }) as typeof MatButton;
  }
  if (variant === 'fab') {
    variant = 'contained';
    Button = styled(MatButton)({
      borderRadius: '50%',
      padding: 14,
      aspectRatio: '1 / 1'
    }) as typeof MatButton;
  }
  if (color === 'default' || !color) {
    color = undefined;
    if (variant === 'contained') {
      sx = {
        ...sx,
        backgroundColor: theme.palette.grey[200],
        borderColor: theme.palette.grey[200],
        color: theme.palette.grey[600]
      };
    } else {
      sx = {
        ...sx,
        color: theme.palette.grey[800],
        borderColor: theme.palette.grey[300]
      };
    }
  }

  const bakedProps: ButtonProps = { ...props, color, sx, size, variant };
  return { bakedProps, Button };
};
function CrustButton(props: CrustButtonProps) {
  const theme = useTheme();
  const { Button, bakedProps } = crustButtonStylePropsOverride(props, theme);
  return <Button {...bakedProps} />;
}
export default React.memo(CrustButton);

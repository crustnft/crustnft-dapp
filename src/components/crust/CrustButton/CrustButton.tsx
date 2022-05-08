import { Button as MatButton, ButtonProps, styled, useTheme } from '@mui/material';
import React from 'react';
type CrustButtonProps = Omit<Omit<Omit<ButtonProps, 'color'>, 'size'>, 'variant'> & {
  size?: ButtonProps['size'] | 'ExtraLarge';
  color?: ButtonProps['color'] | 'default';
  variant?: ButtonProps['variant'] | 'fab';
};
function CrustButton(props: CrustButtonProps) {
  const theme = useTheme();
  let color: CrustButtonProps['color'] = props.color;
  let size: CrustButtonProps['size'] = props.size;
  let variant: CrustButtonProps['variant'] = props.variant;
  let sx;
  let Button = MatButton;
  if (color === 'default' || !color) {
    color = undefined;
    sx = {
      color: theme.palette.grey[800],
      borderColor: theme.palette.grey[300]
    };
  }
  if (size === 'ExtraLarge') {
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
  const bakedProps: ButtonProps = { ...props, color, sx, size, variant };
  return <Button {...bakedProps} />;
}
export default React.memo(CrustButton);

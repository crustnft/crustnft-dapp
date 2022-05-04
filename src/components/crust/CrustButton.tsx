import { Button as MatButton, ButtonProps, styled, useTheme } from '@mui/material';
import React from 'react';
type CrustButtonProps = Omit<Omit<ButtonProps, 'color'>, 'size'> & {
  size?: ButtonProps['size'] | 'ExtraLarge';
  color?: ButtonProps['color'] | 'default';
};
function CrustButton(props: CrustButtonProps) {
  const theme = useTheme();
  let color: CrustButtonProps['color'] = props.color;
  let size: CrustButtonProps['size'] = props.size;
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
  const bakedProps: ButtonProps = { ...props, color, sx, size };
  return <Button {...bakedProps} />;
}
export default React.memo(CrustButton);

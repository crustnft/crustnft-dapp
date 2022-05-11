import { styled } from '@mui/material';
import { CSSSelectorObjectOrCssVariables } from '@mui/system';
import { get } from 'lodash';
import React, { RefObject } from 'react';
import CrustButton, { CrustButtonProps } from '../CrustButton';
import { crustButtonStylePropsOverride } from '../CrustButton/CrustButton';
export type CrustContainedTagProps<T = any> = Omit<
  Omit<Omit<CrustButtonProps, 'name'>, 'label'>,
  'ref'
> & {
  name?: string;
  label: string;
  value?: T;
  ref?: RefObject<ValueHolder>;
};
export type CrustContainedTagType<T = any> = React.FunctionComponent<CrustContainedTagProps<T>>;
export class ValueHolder<T = any> extends React.Component<{ value: T }> {
  state = {};

  render() {
    return null;
  }
}
const Tag = styled(CrustButton)(({ theme, value, color, variant }) => {
  const {
    bakedProps: { sx }
  } = crustButtonStylePropsOverride({ color, variant }, theme);
  const overriddenColor = (sx as CSSSelectorObjectOrCssVariables)?.backgroundColor?.toString();
  return {
    boxShadow: 'none',
    '&:hover': {
      backgroundColor:
        (color && get(theme.colors, overriddenColor || color)) || overriddenColor || 'inherit'
    }
  };
});
const CrustContainedTag = React.forwardRef<ValueHolder, CrustContainedTagProps>(
  ({ label, color = 'default', sx, value, ref: _, ...rest }, ref) => (
    <Tag variant="contained" size="small" color={color} {...rest}>
      {value ? <ValueHolder ref={ref} value={value} /> : null}
      {label}
    </Tag>
  )
);
export default React.memo(CrustContainedTag) as CrustContainedTagType;

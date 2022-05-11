import { Stack, StackProps, SxProps, Theme } from '@mui/material';
import React from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  ControllerRenderProps,
  useFormContext
} from 'react-hook-form';
import type { CrustContainedTagProps, ValueHolder } from '../CrustContainedTag';

type Props<T = any> = StackProps &
  Omit<ControllerProps<T>, 'render'> & {
    label?: string;
    defaultValue?: T;
    sx?: SxProps<Theme>;
    onChange?: (value: T) => void;
    children:
      | Array<React.ReactElement<CrustContainedTagProps<T>>>
      | React.ReactElement<CrustContainedTagProps<T>>;
  };
function processChild<T = any>(
  child: React.ReactElement<CrustContainedTagProps<T>>,
  field: ControllerRenderProps<T>,
  onChange: Props['onChange']
) {
  const ref = React.createRef<ValueHolder>();
  const processedChild: React.ReactElement<CrustContainedTagProps> = React.cloneElement(child, {
    onClick: () => {
      field.onChange(ref.current?.props.value);
      if (onChange) {
        onChange(ref.current?.props.value);
      }
    },
    ref
  });
  return processedChild;
}
export default function CrustContainedTagList<T = any>({
  name,
  label,
  defaultValue,
  sx,
  children,
  spacing = 2.5,
  onChange,
  ...rest
}: Props<T>) {
  const { control } = useFormContext();
  return (
    <Controller<T>
      name={name}
      control={control as Control<T, object>}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;
        let processedChildren;
        if (Array.isArray(children)) {
          processedChildren = children.map((child) => processChild<T>(child, field, onChange));
        } else {
          processedChildren = processChild<T>(children, field, onChange);
        }
        return (
          <Stack sx={sx} spacing={spacing} {...rest}>
            {processedChildren}
          </Stack>
        );
      }}
    />
  );
}

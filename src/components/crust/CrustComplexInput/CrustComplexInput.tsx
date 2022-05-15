import { Stack } from '@mui/material';
import { useCallback } from 'react';
import {
  Controller,
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  Path,
  UseFormStateReturn
} from 'react-hook-form';
import CrustButton, { CrustButtonProps } from '../CrustButton';
import type { CrustLabelProps } from '../CrustLabel';
import CrustLabel from '../CrustLabel';
import CrustModal from '../CrustModal';
import { CrustModalProps } from '../CrustModal/CrustModal';
import { IconEdit, IconPlus } from '../icons';
export type CrustComplexInputProps<T = any> = {
  addProps?: CrustButtonProps;
  addText?: string;
  editProps?: CrustButtonProps;
  editText?: string;
  helpText: CrustLabelProps['helpText'];
  label: CrustLabelProps['children'];
  labelProps?: CrustLabelProps;
  value?: T;
  render: (props: CrustComplexInputRenderProps<T>) => React.ReactElement;
  addModalProps: Omit<CrustModalProps, 'button'>;
  editModalProps: Omit<CrustModalProps, 'button'>;
} & Omit<ControllerProps<T>, 'render'>;
export type CrustComplexInputRenderProps<T> = {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState<T, Path<T>>;
  formState: UseFormStateReturn<T>;
  isEmpty: boolean;
  isEmptyArray: boolean;
  isArray: boolean;
};
export default function CrustComplexInput<T = any>({
  name,
  render,
  label,
  helpText,
  addText,
  editText,
  labelProps,
  value,
  addProps,
  editProps,
  addModalProps,
  editModalProps
}: CrustComplexInputProps<T>) {
  const isArray = Array.isArray(value);
  const isEmptyArray = isArray && !value.length;
  const isEmpty = typeof value === 'undefined' || value === null || isEmptyArray;
  const renderControl: ControllerProps<T>['render'] = useCallback(
    (props) => {
      return render({ ...props, isEmpty, isEmptyArray, isArray });
    },
    [render, isEmpty, isEmptyArray, isArray]
  );
  return (
    <Stack sx={{ width: '100%' }}>
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        <CrustLabel {...labelProps} sx={{ ...labelProps?.sx, marginBottom: 0 }} helpText={helpText}>
          {label}
        </CrustLabel>
        {isEmpty ? (
          <CrustModal
            button={
              <CrustButton
                variant="outlined"
                color="default"
                size="small"
                sx={{ textTransform: 'capitalize' }}
                {...addProps}
              >
                {addText ? (
                  <Stack direction="row" alignItems="center" spacing={1.8}>
                    <IconPlus />
                    <span>{addText}</span>
                  </Stack>
                ) : null}
              </CrustButton>
            }
            {...addModalProps}
          />
        ) : (
          <CrustModal
            {...editModalProps}
            button={
              <CrustButton
                variant="outlined"
                color="default"
                size="small"
                sx={{ textTransform: 'capitalize' }}
                {...editProps}
              >
                {editText ? (
                  <Stack direction="row" alignItems="center" spacing={1.8}>
                    <IconEdit />
                    <span>{editText}</span>
                  </Stack>
                ) : null}
              </CrustButton>
            }
          />
        )}
      </Stack>
      <Controller name={name} render={renderControl}></Controller>
    </Stack>
  );
}

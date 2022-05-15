import { FormHelperText, Input, InputProps, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';
import { pxToRem } from 'utils/getFontValue';
type Props = Omit<InputProps, 'name'> & {
  name: string;
  label?: string;
  rules?: ControllerProps['rules'];
};
export default function CrustInput({ name, label, defaultValue, rules, sx, ...rest }: Props) {
  const { control } = useFormContext();
  const processedSx = useMemo(() => ({ marginBottom: pxToRem(20), ...sx }), [sx]);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;
        return (
          <>
            {label ? (
              <Typography variant="subtitle1" sx={{ marginBottom: pxToRem(15) }}>
                {label}
              </Typography>
            ) : null}
            <Input {...rest} {...field} sx={processedSx} />
            {checkError && error.message ? (
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {error.message}
              </FormHelperText>
            ) : null}
          </>
        );
      }}
    />
  );
}

import { FormHelperText, Input, InputProps, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { pxToRem } from 'utils/getFontValue';
type Props = Omit<InputProps, 'name'> & {
  name: string;
  label?: string;
};
export default function CrustInput({ name, label, defaultValue, sx, ...rest }: Props) {
  const { control } = useFormContext();
  const processedSx = useMemo(() => ({ ...sx, marginBottom: pxToRem(20) }), [sx]);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;
        return (
          <>
            {label ? (
              <Typography variant="subtitle1" sx={{ marginBottom: pxToRem(15) }}>
                {label}
              </Typography>
            ) : null}
            <Input {...rest} value={field.value} sx={processedSx} />
            {checkError ? (
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

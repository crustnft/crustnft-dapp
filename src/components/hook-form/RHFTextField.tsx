// form
// @mui
import { TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '../@c-components';

// ----------------------------------------------------------------------

interface IProps {
  name: string;
}

export default function RHFTextField({ name, ...other }: IProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...other} />
      )}
    />
  );
}

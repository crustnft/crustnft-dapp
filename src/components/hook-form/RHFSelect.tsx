// form
// @mui
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, TextFieldProps } from '../@c-components';

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  children: any;
}

export default function RHFSelect({ name, children, ...other }: IProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}

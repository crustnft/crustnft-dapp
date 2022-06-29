import { Box, Stack, TextField, TextFieldProps, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface IProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
}

export default function NftTextField({
  name,
  label,
  description,
  required,
  ...other
}: IProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Stack>
      <Typography variant="subtitle1" sx={{ display: 'block', mb: '15px' }}>
        {label}
        <Typography
          variant="subtitle1"
          sx={{ color: '#FF4842', display: required ? 'inline' : 'none' }}
        >
          *
        </Typography>
      </Typography>
      <Typography variant="caption">{description} </Typography>
      <Box sx={{ height: 5 }} />
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...other} />
        )}
      />
    </Stack>
  );
}

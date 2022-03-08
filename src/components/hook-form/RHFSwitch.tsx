// form
// @mui
import { FormControlLabelProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControlLabel, Switch } from '../@c-components';

// ----------------------------------------------------------------------

type IProps = Omit<FormControlLabelProps, 'control'>;

interface Props extends IProps {
  name: string;
}

export default function RHFSwitch({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Switch {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  );
}

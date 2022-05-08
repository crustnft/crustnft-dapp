import { Input } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
type Props = {
  name: string;
};
export default function CrustInput({ name }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;
        return <Input value={field.value} />;
      }}
    />
  );
}

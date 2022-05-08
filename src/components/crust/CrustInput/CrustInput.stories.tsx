import { Stack } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import CrustInput from './CrustInput';
const CrustInputStories = {
  title: 'CrustInput',
  component: CrustInput
};
export default CrustInputStories;

export const Default = () => {
  const formContext = useForm();
  return (
    <FormProvider methods={formContext}>
      <Stack direction="row" spacing={2}>
        <CrustInput name="text" />
      </Stack>
    </FormProvider>
  );
};

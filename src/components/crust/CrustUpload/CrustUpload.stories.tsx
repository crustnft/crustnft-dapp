import { Stack } from '@mui/material';
import { FormProvider } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import CrustUpload from './CrustUpload';
const CrustUploadStories = {
  title: 'CrustUpload',
  component: CrustUpload
};
export default CrustUploadStories;

export const Default = () => {
  const formContext = useForm();
  return (
    <FormProvider methods={formContext}>
      <Stack direction="row" spacing={2}>
        <CrustUpload name="file" rule="PNG, JPEG or GIF. Max 3GB" />
      </Stack>
    </FormProvider>
  );
};

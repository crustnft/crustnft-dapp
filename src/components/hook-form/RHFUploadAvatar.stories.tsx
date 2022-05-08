import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider from './FormProvider';
import { RHFUploadAvatar } from './RHFUpload';
const RHFUploadStories = {
  title: 'RHFUploadAvatar',
  component: RHFUploadAvatar
};
export default RHFUploadStories;

export const Default = () => {
  const formContext = useForm();
  return (
    <FormProvider methods={formContext}>
      <Stack direction="row" spacing={2}>
        <RHFUploadAvatar name="avatar" />
      </Stack>
    </FormProvider>
  );
};
